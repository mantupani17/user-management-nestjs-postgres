import { Test, TestingModule } from '@nestjs/testing'
import { RoleModulePermissionsService } from './role_module_permissions.service'

describe('RoleModulePermissionsService', () => {
  let service: RoleModulePermissionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleModulePermissionsService],
    }).compile()

    service = module.get<RoleModulePermissionsService>(
      RoleModulePermissionsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
