import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { NotificationGateway } from '@app/notification/notification.gateway'
import { NotificationService } from '@app/notification/notification.service'

@Module({
  providers: [
    ChatGateway,
    ChatService,
    NotificationGateway,
    NotificationService,
  ],
})
export class ChatModule {}
