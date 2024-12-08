import { Test, TestingModule } from '@nestjs/testing'
import { RolesService } from './roles.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Role } from '@app/entities'
import { Repository } from 'typeorm'

describe('RolesService', () => {
  let service: RolesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
      ],
    }).compile()

    service = module.get<RolesService>(RolesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
