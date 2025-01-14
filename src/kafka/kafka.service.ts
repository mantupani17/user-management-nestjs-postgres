import { Injectable } from '@nestjs/common'
import { Kafka } from 'kafkajs'

@Injectable()
export class KafkaService {
  private readonly kafka = new Kafka({
    clientId: 'nestjs-producer',
    brokers: ['localhost:9092'], // Kafka broker address
  })

  private readonly producer = this.kafka.producer()

  async onModuleInit() {
    await this.producer.connect()
    console.log('Kafka Producer Connected')
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    })
    console.log(`Message sent to topic ${topic}:`, message)
  }

  async onModuleDestroy() {
    await this.producer.disconnect()
  }
}
