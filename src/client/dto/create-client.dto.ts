import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string
}
