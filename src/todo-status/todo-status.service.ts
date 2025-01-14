import { Injectable } from '@nestjs/common'
import { BaseService } from '@app/common/mongobase.service'
import { InjectModel } from '@nestjs/mongoose'
import { TodoStatus, TodoStatusDocument } from '@app/schemas/todo-status.schema'
import { Model } from 'mongoose'

@Injectable()
export class TodoStatusService extends BaseService {
  constructor(
    @InjectModel(TodoStatus.name)
    private readonly todoModel: Model<TodoStatusDocument>,
  ) {
    super(todoModel)
  }
}
