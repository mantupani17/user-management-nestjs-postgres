import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PartialQueryOptions } from '@app/common/dtos/query.dto';
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard';
import { CaslGuard } from '@app/common/ability/casl.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  findAll(@Query() q: PartialQueryOptions) {
    const { limit, skip, order, select } = q
    return this.permissionsService.findAll({}, select, limit, skip, order );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
