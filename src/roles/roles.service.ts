import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from '@app/entities'
import { Repository } from 'typeorm'
import { BaseService } from '@app/common/base.service'

@Injectable()
export class RolesService extends BaseService {
  constructor(@InjectRepository(Role) moduleRepository: Repository<Role>) {
    super(moduleRepository)
  }
}
