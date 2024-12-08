import { Injectable } from '@nestjs/common'
import { BaseService } from '@app/common/base.service'
import { Repository } from 'typeorm'
import { Permission } from '@app/entities'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PermissionsService extends BaseService {
  constructor(
    @InjectRepository(Permission) moduleRepository: Repository<Permission>,
  ) {
    super(moduleRepository)
  }
}
