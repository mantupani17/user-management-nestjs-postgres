import { IsString } from 'class-validator'

export class CreateChatDto {
  @IsString()
  sender: string

  @IsString()
  message: string

  @IsString()
  room: string
}
