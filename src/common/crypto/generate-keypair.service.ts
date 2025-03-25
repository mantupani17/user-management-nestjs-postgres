// crypto.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as forge from 'node-forge'

@Injectable()
export class GenerateKeyPairService {
  constructor(private readonly cfgService: ConfigService) {}

  async generate(): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
      forge.pki.rsa.generateKeyPair(2048, (err, keypair) => {
        if (err) return reject(err)
        const publicKey = forge.pki.publicKeyToPem(keypair.publicKey)
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey)
        return resolve({ publicKey, privateKey })
      })
    })
  }
}
