import { Test, TestingModule } from '@nestjs/testing'
import { RoleModulePermissionsController } from './role_module_permissions.controller'
import { RoleModulePermissionsService } from './role_module_permissions.service'

describe('RoleModulePermissionsController', () => {
  let controller: RoleModulePermissionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleModulePermissionsController],
      providers: [RoleModulePermissionsService],
    }).compile()

    controller = module.get<RoleModulePermissionsController>(
      RoleModulePermissionsController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
