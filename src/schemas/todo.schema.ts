import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TodoDocument = HydratedDocument<Todo>

@Schema({ strict: false })
export class Todo {
  @Prop({ default: Date.now })
  createdAt: Date
}

export const TodoSchema = SchemaFactory.createForClass(Todo)
