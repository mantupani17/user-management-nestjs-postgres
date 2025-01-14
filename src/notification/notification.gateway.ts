import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets'
import { NotificationService } from './notification.service'
// import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto'
import { Server, Socket } from 'socket.io'
const notificationData = []

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // React frontend URL
    credentials: true,
  },
  namespace: '/notification',
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id)
  }
  constructor(private readonly notificationService: NotificationService) {}

  @SubscribeMessage('createNotification')
  create(@MessageBody() createNotificationDto: string) {
    console.log(createNotificationDto)
    notificationData.push(createNotificationDto)
    return this.notificationService.create(createNotificationDto)
  }

  @SubscribeMessage('findAllNotification')
  findAll() {
    console.log('Called', notificationData)
    this.server.emit('findAllNotification', notificationData)
    return notificationData
  }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationService.findOne(id)
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    )
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: number) {
    return this.notificationService.remove(id)
  }
}
