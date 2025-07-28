import { Encryption, EncryptionDocument } from '@app/schemas/encryption.schema'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Cron } from '@nestjs/schedule'
import { Model } from 'mongoose'

@Injectable()
export class SyncCleanKeypairSchedulerService {
  dataFilePath: any = null
  private run_ = false
  private logger = new Logger('Generate Key Pair')

  stringToBoolean(str: string): boolean {
    return str?.toLowerCase() === 'true'
  }

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Encryption.name)
    private readonly encSchema: Model<EncryptionDocument>,
  ) {
    this.run_ = this.stringToBoolean(
      this.configService.get<string>('run_sync_clean_keypair'),
    )
  }

  // Cron job that runs every minute
  @Cron('*/1 * * * *', {
    name: 'sync-clean-keypair-cron',
  }) // Every minute
  async handleCron() {
    if (!this.run_) {
      this.logger.verbose(`Running sync-clean-keypair-cron`)
      return
    }
    const currentTime = Date.now()
    try {
      await this.encSchema.deleteMany({
        expiresIn: {
          $lt: currentTime,
        },
      })
    } catch (error) {
      this.logger.error(error.message)
    }
    this.logger.verbose(`Cron job: This runs every minute!`)
  }
}
