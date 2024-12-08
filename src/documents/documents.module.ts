import { Module } from '@nestjs/common'
import { DocumentsController } from './documents.controller'
import { DocumentsService } from './documents.service'
import { JwtStrategy, JwtAuthGuard, JwtService } from '@app/common/jwt'
import { AbilityService } from '@app/common/ability/casl-ability.service'
import { CaslGuard } from '@app/common/ability/casl.guard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Document as DocumentEntity } from '@app/entities'

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    JwtService,
    JwtStrategy,
    JwtAuthGuard,
    AbilityService,
    CaslGuard,
  ],
})
export class DocumentsModule {}
