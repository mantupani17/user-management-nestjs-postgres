import { Test, TestingModule } from '@nestjs/testing'
import { PermissionsService } from './permissions.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Permission } from '@app/entities'

describe('PermissionsService', () => {
  let service: PermissionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getRepositoryToken(Permission), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
      ],
    }).compile()

    service = module.get<PermissionsService>(PermissionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
