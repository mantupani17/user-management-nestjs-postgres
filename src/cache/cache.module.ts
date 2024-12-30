import KeyvRedis from '@keyv/redis'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cacheable } from 'cacheable'
import { CacheService } from './cache.service'

@Module({
  providers: [
    {
      provide: 'CACHE_INSTANCE',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('redis.host')
        const port = configService.get<number>('redis.port')
        const secondary = new KeyvRedis(`redis://${host}:${port}`)
        return new Cacheable({ secondary, ttl: '4h' })
      },
      inject: [ConfigService],
    },
    CacheService,
  ],
  exports: ['CACHE_INSTANCE'],
})
export class CacheModule {}
