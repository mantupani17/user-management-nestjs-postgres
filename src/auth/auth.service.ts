import { User } from '@app/entities';
import { RoleModulePermissionsService } from '@app/role_module_permissions/role_module_permissions.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { BaseService } from '@app/common/base.service';


@Injectable()
export class AuthService extends BaseService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly rolemodulePerService: RoleModulePermissionsService,
        private readonly dataSource: DataSource){
            super(userRepository)
    }

    signup(payload: any){
        return this.userRepository.save(payload)
    }

    async findByCondition(cond:any) {
        const userRepository = this.dataSource.getRepository(User)
        const queryBuilder = await userRepository.createQueryBuilder('users')
        .where({status: 1, ...cond})
        .leftJoin('users.role', 'roles')
        .select(['users.email', 'users.username', 'users.roleId', 'users.id', 'users.firstName', 'users.lastName', 'users.mobile', 'users.status', 'roles.role'])
        .getMany();
        return queryBuilder
    }

    async getRolePermissions(roleId: number) {
        const details = instanceToPlain(await this.rolemodulePerService.getPermissionDetailsByRoleId(+roleId))
        return details && details.map((i: any) => [i.permissions.permission, i.modules.module] )
    }

    async invalidateRefreshToken(userId: string) {
        // Find the user and invalidate the refresh token by removing or marking it as invalid
        const user = await this.userRepository.findOne({ where: { id: +userId } });
        if (user) {
          user.refreshToken = null; // or set an "isInvalid" flag
          await this.userRepository.save(user);
        }
    }

    async saveRefreshToken(id: string, token: string) {
        return this.update(+id, {
            refreshToken : token
        })
    }
}
