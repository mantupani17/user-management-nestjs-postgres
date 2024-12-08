import { Test, TestingModule } from '@nestjs/testing'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { ConfigService } from '@nestjs/config'

describe('RolesController', () => {
  let controller: RolesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: AbilityService,
          useValue: {},
        },
        {
          provide: RolesService,
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

    controller = module.get<RolesController>(RolesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
