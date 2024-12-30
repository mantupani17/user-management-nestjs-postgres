import { BaseService } from '@app/common/mongobase.service'
import { Todo, TodoDocument } from '@app/schemas'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TodoService extends BaseService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {
    super(todoModel)
  }
}
