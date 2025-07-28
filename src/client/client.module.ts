import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from '@app/entities/client.entity'
// import { JwtAuthGuard, JwtService, JwtStrategy } from '@app/common/jwt';
import { AbilityService } from '@app/common/ability'

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    ClientService,
    AbilityService,
    // CaslGuard,
  ],
})
export class ClientModule {}
