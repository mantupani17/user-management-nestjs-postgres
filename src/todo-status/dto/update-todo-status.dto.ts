import { PartialType } from '@nestjs/swagger'
import { CreateTodoStatusDto } from './create-todo-status.dto'

export class UpdateTodoStatusDto extends PartialType(CreateTodoStatusDto) {}
