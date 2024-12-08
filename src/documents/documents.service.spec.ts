import { Test, TestingModule } from '@nestjs/testing'
import { DocumentsService } from './documents.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Document } from '@app/entities'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'

describe('DocumentsService', () => {
  let service: DocumentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('uploads'),
          },
        },
      ],
    }).compile()

    service = module.get<DocumentsService>(DocumentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
