import { Test, TestingModule } from '@nestjs/testing'
import { PermissionsController } from './permissions.controller'
import { PermissionsService } from './permissions.service'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { ConfigService } from '@nestjs/config'

describe('PermissionsController', () => {
  let controller: PermissionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: AbilityService,
          useValue: {},
        },
        {
          provide: PermissionsService,
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

    controller = module.get<PermissionsController>(PermissionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
