import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTodoStatusDto {
  @IsString()
  title: string

  @IsNumber()
  value: number

  @IsOptional()
  @IsString()
  description: string
}
