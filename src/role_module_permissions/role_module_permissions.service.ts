import { Injectable } from '@nestjs/common'
import { BaseService } from '@app/common/base.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { RoleModulePermission } from '@app/entities'

@Injectable()
export class RoleModulePermissionsService extends BaseService {
  constructor(
    @InjectRepository(RoleModulePermission)
    moduleRepository: Repository<RoleModulePermission>,
    private readonly dataSource: DataSource,
  ) {
    super(moduleRepository)
  }

  // get all the joined data
  async getPermissionDetailsByRoleId(roleId: number) {
    const userRepository = this.dataSource.getRepository(RoleModulePermission)
    const queryBuilder = await userRepository
      .createQueryBuilder('rmps')
      .where({ status: 1, roleId: Number(roleId) })
      .leftJoin('rmps.roles', 'roles')
      .leftJoin('rmps.permissions', 'permissions')
      .leftJoin('rmps.modules', 'modules')
      .select([
        'roles.role',
        'modules.module',
        'rmps.moduleId',
        'rmps.roleId',
        'rmps.permissionId',
        'permissions.permission',
      ])
      .getMany()
    return queryBuilder
  }
}
