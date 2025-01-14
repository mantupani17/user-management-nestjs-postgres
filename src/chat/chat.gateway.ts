import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Server, Socket } from 'socket.io'
import { NotificationGateway } from '@app/notification/notification.gateway'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // React frontend URL
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id)
  }

  constructor(
    private readonly chatService: ChatService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @SubscribeMessage('message')
  create(@MessageBody() createChatDto: CreateChatDto) {
    console.log('Message received:', createChatDto)
    this.chatService.create(createChatDto)
    return this.server.emit('message', createChatDto)
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll()
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id)
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto)
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id)
  }

  // Handle joining a room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.room)
    console.log('Joining the room', data)
    this.notificationGateway.create(`User ${client.id} joined ${data.room}`)
    this.server.to(data.room).emit('message', {
      sender: 'User',
      message: `User ${client.id} joined ${data.room}`,
    })
  }

  // Handle leaving a room
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Leaving the room', data)
    this.notificationGateway.create(`User ${client.id} left ${data.room}`)
    this.server.to(data.room).emit('message', {
      sender: 'User',
      message: `User ${client.id} left ${data.room}`,
    })
    client.leave(data.room)
  }
}
