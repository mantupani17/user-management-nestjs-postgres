import { IsNotEmpty } from 'class-validator'

export default class EncryptionResponse {
  @IsNotEmpty()
  publicKey?: string

  @IsNotEmpty()
  privateKey?: string

  @IsNotEmpty()
  _id: any
}
