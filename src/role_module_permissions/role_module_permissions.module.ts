import { Module } from '@nestjs/common'
import { RoleModulePermissionsService } from './role_module_permissions.service'
import { RoleModulePermissionsController } from './role_module_permissions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModulePermission } from '@app/entities'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { CaslGuard } from '@app/common/ability/casl.guard'

@Module({
  imports: [TypeOrmModule.forFeature([RoleModulePermission])],
  controllers: [RoleModulePermissionsController],
  providers: [RoleModulePermissionsService, AbilityService, CaslGuard],
})
export class RoleModulePermissionsModule {}
