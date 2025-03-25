import { Controller, Get, Post, Body } from '@nestjs/common'
import { EncryptionService } from './encryption.service'
import { CreateEncryptionDto } from './dto/create-encryption.dto'
import EncryptionResponse from './dto/response.dto'

@Controller('encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post()
  create(
    @Body() createEncryptionDto: CreateEncryptionDto,
  ): Promise<EncryptionResponse> {
    return this.encryptionService.create(createEncryptionDto, '1')
  }

  @Post('/encrypt')
  encryptPayload(@Body() payload: any) {
    return this.encryptionService.encrypt(payload, '1')
  }

  @Post('/decrypt')
  decryptPayload(@Body() payload: any) {
    return this.encryptionService.decrypt(payload?.data, '1')
  }

  @Get('/public-key')
  getPublicKey() {
    return this.encryptionService.getPublicOrPrivateKey('1')
  }
}
