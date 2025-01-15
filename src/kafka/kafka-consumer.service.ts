import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka } from 'kafkajs'

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = null
  private consumer = null
  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.configService.get<string>('kafka.consumer'),
      brokers: [this.configService.get<string>('kafka.host')], // Kafka broker address
    })
    this.consumer = this.kafka.consumer({
      groupId: this.configService.get<string>('kafka.consumer_group'),
    })
  }

  async onModuleInit() {
    await this.consumer.connect()
    await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          value: message.value.toString(),
        })
      },
    })

    console.log('Kafka Consumer Connected')
  }

  async onModuleDestroy() {
    await this.consumer.disconnect()
  }
}
