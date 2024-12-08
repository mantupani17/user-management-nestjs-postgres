import { PartialType } from '@nestjs/swagger'
import { CreateRoleModulePermissionDto } from './create-role_module_permission.dto'

export class UpdateRoleModulePermissionDto extends PartialType(
  CreateRoleModulePermissionDto,
) {}
