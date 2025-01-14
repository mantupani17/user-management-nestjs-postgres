import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Todo, TodoSchema, TodoStatus, TodoStatusSchema } from '@app/schemas'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { JwtAuthGuard, JwtService, JwtStrategy } from '@app/common/jwt'
import { CaslGuard } from '@app/common/ability/casl.guard'
import { RolesGuard } from '@app/common/guard/role-guard'
import { TodoStatusService } from '@app/todo-status/todo-status.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: TodoStatus.name, schema: TodoStatusSchema },
    ]),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    JwtService,
    JwtStrategy,
    JwtAuthGuard,
    AbilityService,
    CaslGuard,
    RolesGuard,
    TodoStatusService,
  ],
})
export class TodoModule {}
