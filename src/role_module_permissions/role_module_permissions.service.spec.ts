import { Test, TestingModule } from '@nestjs/testing'
import { RoleModulePermissionsService } from './role_module_permissions.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RoleModulePermission } from '@app/entities'
import { DataSource, Repository } from 'typeorm'

describe('RoleModulePermissionsService', () => {
  let service: RoleModulePermissionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleModulePermissionsService,
        {
          provide: getRepositoryToken(RoleModulePermission), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
        {
          provide: DataSource,
          useValue: {}, // Mocking DataSource
        },
      ],
    }).compile()

    service = module.get<RoleModulePermissionsService>(
      RoleModulePermissionsService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
