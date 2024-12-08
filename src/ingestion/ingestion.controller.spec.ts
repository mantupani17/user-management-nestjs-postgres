import { Test, TestingModule } from '@nestjs/testing'
import { IngestionController } from './ingestion.controller'
import { IngestionService } from './ingestion.service'
import { ConfigService } from '@nestjs/config'
import { AbilityService } from '@app/common/ability/casl-ability.service'

describe('IngestionController', () => {
  let controller: IngestionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: AbilityService,
          useValue: {},
        },
        {
          provide: IngestionService,
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

    controller = module.get<IngestionController>(IngestionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
