import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dtos/createtodo.dto'
import { Roles } from '@app/common/decorators/role'
import { Role } from '@app/common/decorators/role/role.enum'
import { RolesGuard } from '@app/common/guard/role-guard'
import { JwtAuthGuard } from '@app/common/jwt'
import mongoose from 'mongoose'
import { TodoStatusService } from '@app/todo-status/todo-status.service'

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly todoStatusService: TodoStatusService,
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  todos(@Query() q: any) {
    console.log(q)
    return this.todoService.getTodosByAggregate(
      {},
      { result: 0 },
      { _id: -1 },
      10,
      0,
    )
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  todoById(@Param() { id }: any) {
    return this.todoService.getTodosByAggregate({
      _id: new mongoose.Types.ObjectId(id),
    })
  }

  @Post()
  async create(@Body() payload: CreateTodoDto) {
    const statusData = await this.todoStatusService.findOneByCond({
      title: 'Active',
    })
    const data = { ...payload, status: statusData._id }
    return this.todoService.create(data)
  }

  @Patch('/on-going/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async changeToStarted(@Param() { id }: any, @Body() body: any) {
    const { userId } = body
    const statusData = await this.todoStatusService.findOneByCond({
      title: 'OnGoing',
    })
    return this.todoService.update(id, {
      status: statusData._id,
      userId: Number(userId),
    })
  }

  @Patch('/on-backLog/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async changeToBacklog(@Param() { id }: any, @Body() body: any) {
    const { userId } = body
    const statusData = await this.todoStatusService.findOneByCond({
      title: 'BackLog',
    })
    return this.todoService.update(id, {
      status: statusData._id,
      userId: Number(userId),
    })
  }
}
