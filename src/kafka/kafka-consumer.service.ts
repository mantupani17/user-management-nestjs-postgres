import { Injectable, OnModuleInit } from '@nestjs/common'
import { Kafka } from 'kafkajs'

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    clientId: 'nestjs-consumer',
    brokers: ['localhost:9092'], // Kafka broker address
  })

  private readonly consumer = this.kafka.consumer({ groupId: 'nestjs-group' })

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
