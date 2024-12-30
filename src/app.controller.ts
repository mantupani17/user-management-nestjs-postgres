import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { CacheService } from './cache/cache.service'
import { Logger } from '@nestjs/common'
// import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  logger = new Logger()
  constructor(
    private readonly appService: AppService,
    private readonly cacheService: CacheService,
  ) {}

  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('cached-data')
  async getData() {
    const cacheKey = 'sample-data'
    try {
      let data = await this.cacheService.get(cacheKey)
      if (!data) {
        // Simulate fetching data from an external API
        data = 'Sample data from external API'
        await this.cacheService.set(cacheKey, data, '1m') // Cache for 1 minute
      }

      return {
        data,
        source: data === 'Sample data from external API' ? 'API' : 'Cache',
      }
    } catch (error) {
      console.log(error)
    }
  }
}
