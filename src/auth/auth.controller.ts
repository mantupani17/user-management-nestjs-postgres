import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import {
  CreateUserPayload,
  ForgotPasswordPayload,
  InitiateForgotPaswordPaylod,
  LoginPayload,
  VerifyAccountPaylod,
} from '@app/user/dtos/create-user.dto'
import { JwtService } from '@app/common/jwt/jwt.service'
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard'
import { CaslGuard } from '@app/common/ability/casl.guard'
import { AuthService } from './auth.service'
import { instanceToPlain } from 'class-transformer'
import { CryptoService } from '@app/common/crypto/crypto.service'
import { v4 as uuidv4 } from 'uuid'
import { EmailService } from '@app/common/email.service'
import { ConfigService } from '@nestjs/config'
import { Request as ExpressRequest } from 'express'

@Controller('auth')
export class AuthController {
  app_base_url = null
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    this.app_base_url = this.configService.get<string>('app_base_url')
  }

  @Post('signup')
  async signup(@Body() body: CreateUserPayload) {
    const hashedPassword: string = await this.cryptoService.hashPassword(
      body.password,
    )
    const verifyToken = uuidv4()
    const data = await this.authService.signup({
      ...body,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpirey: Date.now() + 3600000,
      created_at: new Date(),
    })

    const verifyUrl = `${this.app_base_url}/verify-email?token=${verifyToken}`
    // send email
    await this.mailService.sendEmail(
      body.email,
      'Signup Confirmation',
      `<p> Clcik <a href="${verifyUrl}">here</a> to verify your token.</p>`,
    )
    delete data.password

    const token = this.jwtService.generateToken(instanceToPlain(data))
    return { access_token: token }
  }

  @Post('login')
  async login(@Body() body: LoginPayload) {
    const userDetails = instanceToPlain(
      await this.authService.findByCondition({
        email: body.email,
      }),
    )

    if (!userDetails?.length)
      throw new UnauthorizedException('Unathorized Access')

    const permission = await this.authService.getRolePermissions(
      userDetails[0]?.roleId || 2,
    )
    userDetails[0]['role'] = userDetails[0]['role']['role']
    const payload = { ...userDetails[0], sub: userDetails[0].id, permission } // example payload
    const token = this.jwtService.generateToken(payload)

    const refreshToken = this.jwtService.generateToken(payload, {
      expiresIn: '7d', // Long-lived token
    })

    // Store refresh token in the database (for future invalidation)
    await this.authService.saveRefreshToken(userDetails[0].id, refreshToken)
    return { access_token: token, refreshToken }
  }

  @Post('logout')
  async logout(@Req() request: ExpressRequest) {
    const token = request.headers['authorization']?.split(' ')[1] // Extract JWT token
    if (!token) {
      throw new HttpException('No token provided', HttpStatus.FORBIDDEN)
    }

    // Decode the JWT to get user details (e.g., user ID)
    const decoded = this.jwtService.decodeToken(token)

    if (!decoded) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
    }

    // Invalidate refresh token in the database (remove it or mark it as invalid)
    await this.authService.invalidateRefreshToken(decoded['sub']) // Assuming userId is in the sub field

    return { message: 'Successfully logged out' }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, CaslGuard)
  async profile(@Request() req) {
    const userDetails = instanceToPlain(
      await this.authService.findByCondition({
        status: 1,
        id: Number(req.user.sub),
      }),
    )
    if (!userDetails?.length)
      throw new UnauthorizedException('Unathorized Access')
    userDetails[0]['role'] = userDetails[0]['role']['role']
    return { ...req.user, ...userDetails[0] }
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyAccountPaylod) {
    const user: any = instanceToPlain(
      await this.authService.findOneByCond({
        verifyToken: body.token,
        isVerified: 0,
      }),
    )

    if (!user) throw new NotFoundException('User Not Found, Invalid Token')

    if (Number(user.verifyTokenExpirey) < Date.now())
      throw new BadRequestException(
        'Token expired, please contact with the admin.',
      )

    await this.authService.update(user.id, {
      isVerified: 1,
      verifyToken: null,
      verifyTokenExpirey: null,
      status: 1,
      updated_at: new Date(),
    })

    return {
      message: 'Account Verified Successfuly.',
    }
  }

  @Post('initiate-forgot-password')
  async initiateForgotPassword(@Body() body: InitiateForgotPaswordPaylod) {
    const { email } = body
    const user: any = instanceToPlain(
      await this.authService.findOneByCond({
        email: email,
        isVerified: 1,
      }),
    )

    if (!user) throw new NotFoundException('User Not Found, Invalid Token')

    const forgotPasswordToken = uuidv4()
    const verifyUrl = `${this.app_base_url}/forgot-password?token=${forgotPasswordToken}`
    // send email
    await this.mailService.sendEmail(
      body.email,
      'Forgot Password Confirmation',
      `<p> Clcik <a href="${verifyUrl}">here</a> to verify your token.</p>`,
    )

    await this.authService.update(user.id, {
      forgotPasswordToken,
      forgotPasswordTokenExpirey: Date.now() + 3600000,
      updated_at: new Date(),
    })

    return {
      message: 'Forgot password link shared to your registered email',
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordPayload) {
    const { password, token } = body

    const user: any = instanceToPlain(
      await this.authService.findOneByCond({
        forgotPasswordToken: token,
        isVerified: 1,
      }),
    )

    if (!user) throw new NotFoundException('User Not Found, Invalid Token')

    if (Number(user.forgotPasswordTokenExpirey) < Date.now())
      throw new BadRequestException(
        'Token expired, please contact with the admin.',
      )

    const hashedPassword: string =
      await this.cryptoService.hashPassword(password)
    await this.authService.update(user.id, {
      forgotPasswordToken: null,
      forgotPasswordTokenExpirey: null,
      updated_at: new Date(),
      password: hashedPassword,
    })

    return {
      message: 'Password Updated Successfuly.',
    }
  }
}
