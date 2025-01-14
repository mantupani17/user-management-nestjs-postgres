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

  getTodosByAggregate(
    where: any = {},
    select: any = { result: 0 },
    sort: any = { _id: -1 },
    limit: number = 10,
    skip: number = 0,
  ) {
    return this.todoModel.aggregate([
      {
        $match: where,
      },
      {
        $sort: sort,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'todostatuses',
          localField: 'status',
          foreignField: '_id',
          as: 'result',
        },
      },
      {
        $unwind: {
          path: '$result',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          status: '$result.title',
        },
      },
      {
        $project: select,
      },
    ])
  }
}
