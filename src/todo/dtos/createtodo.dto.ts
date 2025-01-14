import { HtmlPurify } from '@app/common/decorators/dom-purify'
import { IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  @HtmlPurify()
  title: string
}

export enum Status {
  Deleted = 0,
  Active = 1,
  OnGoing = 2,
  OnQA = 3,
  OnProd = 4,
  Fixed = 5,
  BackLog = 6,
  ReoOpen = 7,
}
