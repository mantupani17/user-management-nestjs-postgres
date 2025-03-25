import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access ConfigService
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('mongo_config.uri')}/${configService.get<string>('mongo_config.db')}`, // Load MongoDB URI dynamically
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class MongooseConfigModule {}
