import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@app/entities';
import { AbilityService } from '@app/common/ability/casl-ability.service';
import { CaslGuard } from '@app/common/ability/casl.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role])
  ],
  controllers: [RolesController],
  providers: [RolesService, AbilityService, CaslGuard],
})
export class RolesModule {}
