import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { JwtService } from '@app/common/jwt'
import { AuthService } from './auth.service'
import { CryptoService } from '@app/common/crypto/crypto.service'
import { EmailService } from '@app/common/email.service'
import { ConfigService } from '@nestjs/config'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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
          provide: AuthService,
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

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
