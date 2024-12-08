import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '@app/entities'
import { DataSource, Repository } from 'typeorm'
import { RoleModulePermissionsService } from '@app/role_module_permissions/role_module_permissions.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
        {
          provide: RoleModulePermissionsService,
          useValue: {},
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
