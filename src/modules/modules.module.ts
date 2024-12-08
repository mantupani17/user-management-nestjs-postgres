import { Module } from '@nestjs/common'
import { ModulesService } from './modules.service'
import { ModulesController } from './modules.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module as ModuleEntity } from '@app/entities'
import { JwtStrategy, JwtAuthGuard, JwtService } from '@app/common/jwt'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { CaslGuard } from '@app/common/ability/casl.guard'

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  controllers: [ModulesController],
  providers: [
    ModulesService,
    JwtService,
    JwtStrategy,
    JwtAuthGuard,
    AbilityService,
    CaslGuard,
  ],
})
export class ModulesModule {}
