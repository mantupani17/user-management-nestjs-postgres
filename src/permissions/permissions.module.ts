import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '@app/entities';
import { JwtStrategy, JwtAuthGuard, JwtService } from '@app/common/jwt';
import { AbilityService } from '@app/common/ability/casl-ability.service';
import { CaslGuard } from '@app/common/ability/casl.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission])
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, JwtService, JwtStrategy, JwtAuthGuard, AbilityService, CaslGuard],
})
export class PermissionsModule {}
