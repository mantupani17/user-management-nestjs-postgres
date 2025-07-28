import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { JwtAuthGuard } from '@app/common/jwt'
import { CaslGuard } from '@app/common/ability'
import { PartialQueryOptions } from '@app/common/dtos/query.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CaslGuard)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, CaslGuard)
  findAll(@Query() q: PartialQueryOptions) {
    const { limit, skip, order, select } = q
    return this.clientService.findAll({}, select, limit, skip, order)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CaslGuard)
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id)
  }
}
