import { Module } from '@nestjs/common'
import { EncryptionService } from './encryption.service'
import { EncryptionController } from './encryption.controller'
import { GenerateKeyPairService } from '@app/common/crypto/generate-keypair.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Encryption, EncryptionSchema } from '@app/schemas/encryption.schema'
import { EncryptionService as EncService } from '@app/common/crypto/encryption.service'
import { CacheService } from '@app/cache/cache.service'
import { CacheModule } from '@app/cache/cache.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Encryption.name, schema: EncryptionSchema },
    ]),
    CacheModule,
  ],
  controllers: [EncryptionController],
  providers: [
    EncryptionService,
    GenerateKeyPairService,
    EncService,
    CacheService,
  ],
})
export class EncryptionModule {}
