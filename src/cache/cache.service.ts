import { Inject, Injectable } from '@nestjs/common'
import { Cacheable } from 'cacheable'

@Injectable()
export class CacheService {
  constructor(@Inject('CACHE_INSTANCE') private readonly cache: Cacheable) {}

  async get(key: string): Promise<any> {
    return this.cache.get(key)
  }

  async set(key: string, value: any, ttl?: number | string): Promise<void> {
    await this.cache.set(key, value, ttl)
  }

  async delete(key: string): Promise<void> {
    try {
      await this.cache.delete(key)
    } catch (error) {
      console.log(error)
    }
  }
}
