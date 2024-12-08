import { Test, TestingModule } from '@nestjs/testing'
import { DocumentsController } from './documents.controller'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { JwtService } from '@app/common/jwt'
import { CryptoService } from '@app/common/crypto/crypto.service'
import { EmailService } from '@app/common/email.service'
import { ConfigService } from '@nestjs/config'
import { DocumentsService } from './documents.service'

describe('DocumentsController', () => {
  let controller: DocumentsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: AbilityService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: DocumentsService,
          useValue: {},
        },
        {
          provide: CryptoService,
          useValue: {},
        },
        {
          provide: EmailService,
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

    controller = module.get<DocumentsController>(DocumentsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
