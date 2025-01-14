import { Module } from '@nestjs/common'
import { KafkaService } from './kafka.service'
import { KafkaController } from './kafka.controller'
import { KafkaConsumerService } from '@app/kafka/kafka-consumer.service'
import { KafkaEventController } from './kafka-event.controller'

@Module({
  providers: [KafkaService, KafkaConsumerService],
  controllers: [KafkaController, KafkaEventController],
})
export class KafkaModule {}
