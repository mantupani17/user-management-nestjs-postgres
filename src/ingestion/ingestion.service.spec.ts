import { Test, TestingModule } from '@nestjs/testing'
import { IngestionService } from './ingestion.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TrackIngestion } from '@app/entities'
import { PhotosApisService } from '@app/common/api/photos.api'

describe('IngestionService', () => {
  let service: IngestionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        {
          provide: getRepositoryToken(TrackIngestion), // Use this to mock the repository
          useClass: Repository, // Mock the repository class
        },
        {
          provide: PhotosApisService,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<IngestionService>(IngestionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
