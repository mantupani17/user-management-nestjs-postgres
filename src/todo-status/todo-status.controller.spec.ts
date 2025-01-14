import { Test, TestingModule } from '@nestjs/testing'
import { TodoStatusController } from './todo-status.controller'
import { TodoStatusService } from './todo-status.service'

describe('TodoStatusController', () => {
  let controller: TodoStatusController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoStatusController],
      providers: [TodoStatusService],
    }).compile()

    controller = module.get<TodoStatusController>(TodoStatusController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
