import { Injectable, NestMiddleware } from '@nestjs/common'
import { EncryptionService } from './crypto/encryption.service'

@Injectable()
export class EncryptionMiddleware implements NestMiddleware {
  constructor(private readonly EncryptionService: EncryptionService) {}
  async use(req: any, res: any, next: () => void) {
    if (req.body) {
      const encryptedData = await this.EncryptionService.encrypt(
        JSON.stringify(req.body),
      )
      req.body = { data: encryptedData } // Encrypt the body
    }
    next()
  }
}
