import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Module as ModuleEntity } from '@app/entities'
import { BaseService } from '@app/common/base.service'

@Injectable()
export class ModulesService extends BaseService {
  constructor(
    @InjectRepository(ModuleEntity) moduleRepository: Repository<ModuleEntity>,
  ) {
    super(moduleRepository)
  }
}
