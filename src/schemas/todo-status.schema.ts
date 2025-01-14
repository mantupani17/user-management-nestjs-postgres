import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TodoStatusDocument = HydratedDocument<TodoStatus>

@Schema({ strict: false })
export class TodoStatus {
  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ type: Number })
  value: number

  @Prop({ type: String })
  title: string

  @Prop({ type: String })
  description: string

  @Prop({ type: Number, default: 1 })
  status: number
}

export const TodoStatusSchema = SchemaFactory.createForClass(TodoStatus)
