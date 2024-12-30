import { HtmlPurify } from '@app/common/decorators/dom-purify'
import { IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  @HtmlPurify()
  title: string
}
