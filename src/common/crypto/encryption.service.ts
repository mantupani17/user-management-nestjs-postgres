// crypto.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'

@Injectable()
export class EncryptionService {
  private privateKey: string = ''
  private publicKey: string = ''
  constructor(private readonly cfgService: ConfigService) {
    this.publicKey = this.cfgService.get<string>('secrets.public')
    this.privateKey = this.cfgService.get<string>('secrets.private')
  }

  // Generate a hash from a plain password
  async encrypt(data: any, publicKey = this.publicKey) {
    const buffer = Buffer.from(JSON.stringify(data), 'utf8')
    const encrypted = await crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Ensure correct padding
      },
      buffer,
    )
    return encrypted.toString('base64')
  }

  // Verify if the plain password matches the hash
  async decrypt(
    encryptedData: string,
    privateKey = this.privateKey,
  ): Promise<boolean> {
    const buffer = Buffer.from(encryptedData, 'base64')
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // Ensure correct padding
      },
      buffer,
    )
    return JSON.parse(decrypted.toString('utf8'))
  }
}
