import { Controller, Post, Body } from '@nestjs/common'
import { KafkaService } from './kafka.service'

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('produce')
  async produceMessage(@Body() body: { topic: string; message: any }) {
    await this.kafkaService.sendMessage(body.topic, body.message)
    return { status: 'Message sent' }
  }
}
