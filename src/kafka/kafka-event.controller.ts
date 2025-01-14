import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class KafkaEventController {
  @MessagePattern('test-topic') // Listen to the 'test-topic'
  handleKafkaMessage(@Payload() message: any) {
    console.log('Received message:', message)
  }
}
