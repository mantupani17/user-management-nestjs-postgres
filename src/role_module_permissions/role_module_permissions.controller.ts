import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { RoleModulePermissionsService } from './role_module_permissions.service'
import { CreateRoleModulePermissionDto } from './dto/create-role_module_permission.dto'
import { UpdateRoleModulePermissionDto } from './dto/update-role_module_permission.dto'
import { PartialQueryOptions } from '@app/common/dtos/query.dto'
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard'
import { CaslGuard } from '@app/common/ability/casl.guard'

@Controller('role-module-permissions')
@UseGuards(JwtAuthGuard, CaslGuard)
export class RoleModulePermissionsController {
  constructor(
    private readonly roleModulePermissionsService: RoleModulePermissionsService,
  ) {}

  @Post()
  create(@Body() createRoleModulePermissionDto: CreateRoleModulePermissionDto) {
    return this.roleModulePermissionsService.create(
      createRoleModulePermissionDto,
    )
  }

  @Get()
  findAll(@Query() q: PartialQueryOptions) {
    const { limit, skip, order, select } = q
    return this.roleModulePermissionsService.findAll(
      {},
      select,
      limit,
      skip,
      order,
    )
  }

  @Get('by-role-id/:id')
  fetchAllTheDetailsBYRoleId(@Param('id') id: string) {
    return this.roleModulePermissionsService.getPermissionDetailsByRoleId(+id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleModulePermissionsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleModulePermissionDto: UpdateRoleModulePermissionDto,
  ) {
    return this.roleModulePermissionsService.update(
      +id,
      updateRoleModulePermissionDto,
    )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleModulePermissionsService.remove(+id)
  }
}
