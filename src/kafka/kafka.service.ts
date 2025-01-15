import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka } from 'kafkajs'

@Injectable()
export class KafkaService {
  private kafka = null

  private producer = null

  constructor(private readonly cfg: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.cfg.get<string>('kafka.consumer'),
      brokers: [this.cfg.get<string>('kafka.host')], // Kafka broker address
    })
    this.producer = this.kafka.producer()
  }

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
