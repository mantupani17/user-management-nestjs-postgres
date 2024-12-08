import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
  private jwtSecret = null // Use a secure secret key in production
  private jwtExpiration = null // Token expiration time (e.g., '1h', '30m', '1d')

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = configService.get<string>('jwt.secret')
    this.jwtExpiration = configService.get<string>('jwt.expiresIn')
  }

  // Method to generate a JWT token from a payload
  generateToken(
    payload: any,
    opts: any = {
      expiresIn: this.jwtExpiration, // Set the token expiration
    },
  ): string {
    return jwt.sign(payload, this.jwtSecret, opts)
  }

  // Method to verify a JWT token and extract the payload
  verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, this.jwtSecret)
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }

  // Method to decode a JWT token (without verifying it)
  decodeToken(token: string): any {
    return jwt.decode(token)
  }
}
