import { Test, TestingModule } from '@nestjs/testing'
import { ModulesController } from './modules.controller'
import { ModulesService } from './modules.service'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { ConfigService } from '@nestjs/config'

describe('ModulesController', () => {
  let controller: ModulesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesController],
      providers: [
        {
          provide: AbilityService,
          useValue: {},
        },
        {
          provide: ModulesService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:3000'),
          },
        },
      ],
    }).compile()

    controller = module.get<ModulesController>(ModulesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
