import { PhotosApisService } from '@app/common/api/photos.api';
import { BaseService } from '@app/common/base.service';
import { TrackIngestion } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { v4 as uuid4 } from 'uuid'

@Injectable()
export class IngestionService extends BaseService{
    constructor(
        private readonly photosApis: PhotosApisService, 
        @InjectRepository(TrackIngestion) ingRepository: Repository<TrackIngestion>,
    ) {
        super(ingRepository)
    }
    
    async startProcess(taskName = 'Calling API Task'){
        let data = null
        try {
            data = instanceToPlain(await this.create({
                startTime: new Date(),
                status: 2,
                taskId: uuid4(),
                taskName: taskName
            }))
            const res = await this.photosApis.getPhotos('photos')
            if (res){
                return this.update(data.id,{
                    endTime: new Date(),
                    status: 1,
                })
            }
        } catch (error) {
            this.update(data.id,{
                endTime: new Date(),
                status: 0,
                taskId: uuid4(),
                taskName: 'Calling API'
            })
        }
    }
}
