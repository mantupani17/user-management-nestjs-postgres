import { Injectable, NestMiddleware } from '@nestjs/common'
import { EncryptionService } from '../crypto/encryption.service'

@Injectable()
export class DecryptionMiddleware implements NestMiddleware {
  constructor(private readonly EncryptionService: EncryptionService) {}

  async use(req: any, res: any, next: () => void) {
    console.log(req?.body?.data)
    try {
      if (req?.body?.data) {
        const bytes = await this.EncryptionService.decrypt(req.body.data)
        req.body = JSON.parse(bytes.toString()) // Decrypt body
      }
    } catch (error) {
      console.log(error)
    }
    next()
  }
}
