import { IngestionData, TrackIngestion } from '@app/entities'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain } from 'class-transformer'
import * as csv from 'csv-parser'
import * as fs from 'fs'
import * as path from 'path'
import { Repository } from 'typeorm'
import { v4 as uuid4 } from 'uuid'

@Injectable()
export class IngTrackSchedulerService {
  dataFilePath: any = null
  private run_ = false

  stringToBoolean(str: string): boolean {
    return str.toLowerCase() === 'true'
  }

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TrackIngestion)
    private readonly ingRepository: Repository<TrackIngestion>,
    @InjectRepository(IngestionData)
    private readonly ingDataRepository: Repository<IngestionData>,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.dataFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      this.configService.get<string>('upload.dataDir'),
    )
    this.run_ = this.stringToBoolean(
      this.configService.get<string>('run_ingestion_cron'),
    )
    console.log(`Process Enabled: ${this.run_}`)
  }

  // Cron job that runs every minute
  @Cron('*/1 * * * *', {
    name: 'ingestion-cron',
  }) // Every minute
  async handleCron() {
    if (!this.run_) {
      console.log(`Running cron without task...`)
      return
    }

    console.log('Cron job: This runs every minute!')
    // Perform your scheduled task here
    if (!fs.existsSync(`${this.dataFilePath}/data.csv`)) {
      throw new Error('File not found')
    }

    const records = []
    const trackDetails = instanceToPlain(
      await this.ingRepository.save({
        startTime: new Date(),
        status: 2,
        taskId: uuid4(),
        taskName: 'READ CSV',
      }),
    )
    fs.createReadStream(`${this.dataFilePath}/data.csv`)
      .pipe(csv())
      .on('data', (data) => {
        records.push(data) // You can perform additional transformations here
      })
      .on('end', async () => {
        // Once data is read, insert it into the database
        try {
          await this.processData(trackDetails, records)
          console.log(records.length, records[0])
          console.log('Data Ingestion completed successfully!')
        } catch (err) {
          console.error('Error while saving data:', err)
        }
      })
  }

  async processData(trackDetails: any, data: any[]) {
    try {
      this.stopCronJob()
      const size = data.length
      const batches = Math.ceil(size / 1000)
      console.log(
        `Total Records : ${size} \nTotal Batches: ${batches} \nNo of Records to Process: 1000`,
      )
      for (let index = 0; index < batches; index++) {
        const upd = data.splice(0, 1000)
        console.log(`No of records going to add ${upd.length}`)
        await this.ingDataRepository.save(upd)
      }
      await this.ingRepository.update(
        { id: +trackDetails.id },
        {
          endTime: new Date(),
          status: 1,
        },
      )
      this.startCronJob()
    } catch (error) {
      await this.ingRepository.update(
        { id: +trackDetails.id },
        {
          endTime: new Date(),
          status: 0,
        },
      )
      this.startCronJob()
    }
  }

  // Method to start the cron job manually (optional)
  startCronJob() {
    // Retrieve the cron job by its name
    const job = this.schedulerRegistry.getCronJob('ingestion-cron')
    if (job) {
      job.start() // Start the stopped cron job
      console.log(`Started stopped cron job with name: ingestion-cron`)
    } else {
      console.log(`Cron job with name "ingestion-cron" not found.`)
    }
  }

  // Method to stop the cron job manually
  stopCronJob() {
    const job = this.schedulerRegistry.getCronJob('ingestion-cron')
    if (job) {
      job.stop()
      console.log('Manually stopped cron job')
    }
  }
}
