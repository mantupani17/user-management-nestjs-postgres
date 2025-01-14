import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { TodoStatusService } from './todo-status.service'
import { CreateTodoStatusDto } from './dto/create-todo-status.dto'
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto'
import { Roles } from '@app/common/decorators/role'
import { JwtAuthGuard } from '@app/common/jwt'
import { RolesGuard } from '@app/common/guard/role-guard'
import { Role } from '@app/common/decorators/role/role.enum'

@Controller('todo-status')
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TodoStatusController {
  constructor(private readonly todoStatusService: TodoStatusService) {}

  @Post()
  create(@Body() createTodoStatusDto: CreateTodoStatusDto) {
    return this.todoStatusService.create(createTodoStatusDto)
  }

  @Get()
  findAll() {
    return this.todoStatusService.findAll({}, {})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoStatusService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoStatusDto: UpdateTodoStatusDto,
  ) {
    return this.todoStatusService.update(id, updateTodoStatusDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoStatusService.remove(id)
  }
}
