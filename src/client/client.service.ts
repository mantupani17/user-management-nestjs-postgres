import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Client } from '@app/entities/client.entity'
import { BaseService } from '@app/common/base.service'

@Injectable()
export class ClientService extends BaseService {
  constructor(
    @InjectRepository(Client)
    clientRepository: Repository<Client>,
  ) {
    super(clientRepository)
  }
}
