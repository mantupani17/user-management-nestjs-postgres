import { Test, TestingModule } from '@nestjs/testing'
import { ModulesService } from './modules.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Module as ModuleEntity } from '@app/entities'
import { Repository } from 'typeorm'

describe('ModulesService', () => {
  let service: ModulesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModulesService,
        {
          provide: getRepositoryToken(ModuleEntity), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
      ],
    }).compile()

    service = module.get<ModulesService>(ModulesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
