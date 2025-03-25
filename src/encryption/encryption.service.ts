import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateEncryptionDto } from './dto/create-encryption.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Encryption, EncryptionDocument } from '@app/schemas/encryption.schema'
import { Model } from 'mongoose'
import { GenerateKeyPairService } from '@app/common/crypto/generate-keypair.service'
import { EncryptionService as EncService } from '@app/common/crypto/encryption.service'
import { CacheService } from '@app/cache/cache.service'
import EncryptionResponse from './dto/response.dto'

@Injectable()
export class EncryptionService {
  constructor(
    @InjectModel(Encryption.name)
    private readonly encSchema: Model<EncryptionDocument>,
    private readonly generateKeyPairService: GenerateKeyPairService,
    private readonly encService: EncService,
    private readonly cache: CacheService,
  ) {}

  async create(createEncryptionDto: CreateEncryptionDto, redisPbkid: string) {
    const keys = await this.generateKeyPairService.generate()
    const keyDetails = await this.encSchema.create({
      ...keys,
      ...createEncryptionDto,
    })
    await this.cache.set(redisPbkid, keyDetails._id.toString())
    return {
      _id: keyDetails._id,
      publicKey: keyDetails.publicKey,
    }
  }

  async getPublicOrPrivateKey(
    redisPbkid: string,
    select: any = { _id: 1, publicKey: 1 },
  ): Promise<EncryptionResponse> {
    const _id = await this.cache.get(redisPbkid)
    const keys = await this.encSchema.findById(_id, select)
    if (!keys) {
      throw new BadRequestException({
        message: 'Key not exists in the db.',
      })
    }
    if ('privateKey' in select) {
      console.log('Removing the key and redis data')
      await this.cache.delete(redisPbkid)
      await this.encSchema.findByIdAndDelete(_id)
    }
    return keys
  }

  async encrypt(payload: any, redisPbkid: string) {
    const keys = await this.getPublicOrPrivateKey(redisPbkid)
    const encData = await this.encService.encrypt(payload, keys.publicKey)
    return {
      data: encData,
    }
  }

  async decrypt(encData: string, redisPbkid: string) {
    const keys = await this.getPublicOrPrivateKey(redisPbkid, {
      privateKey: 1,
      _id: 1,
    })
    return this.encService.decrypt(encData, keys.privateKey)
  }
}
