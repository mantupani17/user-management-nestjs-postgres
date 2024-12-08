import { Module } from '@nestjs/common'
import { IngestionService } from './ingestion.service'
import { IngestionController } from './ingestion.controller'
import { PhotosApisService } from '@app/common/api/photos.api'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackIngestion } from '@app/entities'
import { AxiosService } from '@app/common/api'

@Module({
  imports: [TypeOrmModule.forFeature([TrackIngestion])],
  providers: [IngestionService, PhotosApisService, AxiosService],
  controllers: [IngestionController],
})
export class IngestionModule {}
