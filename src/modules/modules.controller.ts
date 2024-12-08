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
import { ModulesService } from './modules.service'
import { CreateModuleDto } from './dto/create-module.dto'
import { UpdateModuleDto } from './dto/update-module.dto'
import { PartialQueryOptions } from '@app/common/dtos/query.dto'
import { JwtAuthGuard } from '@app/common/jwt/jwt.guard'
import { CaslGuard } from '@app/common/ability/casl.guard'

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  findAll(@Query() q: PartialQueryOptions) {
    const { limit, skip, order, select } = q
    return this.modulesService.findAll({}, select, limit, skip, order)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(+id, updateModuleDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  remove(@Param('id') id: string) {
    return this.modulesService.remove(+id)
  }
}
