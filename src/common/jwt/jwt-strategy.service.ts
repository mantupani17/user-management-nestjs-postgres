import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtService } from './jwt.service'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    console.log(ExtractJwt)
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest:
        ExtractJwt.fromExtractors([
          (req: Request) => {
            return req?.cookies?.accessToken // Extract token from cookie
          },
        ]) ?? ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'), // Same secret used to sign the JWT
    })
  }

  async validate(payload: any) {
    // You can fetch user data here if needed using the payload (e.g., from the database)
    return payload
  }
}
