import { Test, TestingModule } from '@nestjs/testing'
import { RoleModulePermissionsController } from './role_module_permissions.controller'
import { RoleModulePermissionsService } from './role_module_permissions.service'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { ConfigService } from '@nestjs/config'

describe('RoleModulePermissionsController', () => {
  let controller: RoleModulePermissionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleModulePermissionsController],
      providers: [
        {
          provide: AbilityService,
          useValue: {},
        },
        {
          provide: RoleModulePermissionsService,
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

    controller = module.get<RoleModulePermissionsController>(
      RoleModulePermissionsController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
