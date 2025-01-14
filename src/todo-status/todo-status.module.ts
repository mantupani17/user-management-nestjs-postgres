import { Module } from '@nestjs/common'
import { TodoStatusService } from './todo-status.service'
import { TodoStatusController } from './todo-status.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TodoStatus, TodoStatusSchema } from '@app/schemas/todo-status.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TodoStatus.name,
        schema: TodoStatusSchema,
      },
    ]),
  ],
  controllers: [TodoStatusController],
  providers: [TodoStatusService],
})
export class TodoStatusModule {}
