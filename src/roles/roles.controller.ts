import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PartialQueryOptions } from '@app/common/dtos/query.dto';
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard';
import { CaslGuard } from '@app/common/ability/casl.guard';

@Controller('roles')
@UseGuards(JwtAuthGuard, CaslGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() q: PartialQueryOptions) {
    const { limit, skip, order, select } = q
    return this.rolesService.findAll({}, select, limit, skip, order );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
