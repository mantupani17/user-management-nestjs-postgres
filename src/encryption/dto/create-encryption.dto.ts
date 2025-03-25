import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateEncryptionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(255)
  description: string
}
