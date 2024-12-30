import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dtos/createtodo.dto'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  todos(@Query() q: any) {
    console.log(q)
    return this.todoService.findAll({}, {})
  }

  @Post()
  create(@Body() payload: CreateTodoDto) {
    return this.todoService.create(payload)
  }
}
