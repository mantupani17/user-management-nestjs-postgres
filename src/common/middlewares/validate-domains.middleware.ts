import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response, NextFunction } from 'express'

function includesWithRegex(string, pattern) {
  const regex = new RegExp(pattern) // Convert pattern to a regex
  return regex.test(string)
}

@Injectable()
export class ValidateDomainMiddleware implements NestMiddleware {
  allowedSites: any = []
  constructor(private readonly configService: ConfigService) {
    this.allowedSites = this.configService
      .get<any>('allowed_cookie_hosts')
      .split(',')
  }

  use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers.host // Get the current request host
    const isExistDomain = this.allowedSites.some((domain: string) => {
      return includesWithRegex(host, domain)
    })

    if (!host || !isExistDomain) {
      throw new HttpException(
        `Domain mismatch: Expected domains "${this.allowedSites}" but got "${host}"`,
        HttpStatus.BAD_REQUEST,
      )
    }

    next()
  }
}
