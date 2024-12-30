import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type DocumentIngestionDocument = HydratedDocument<IngestionDocument>

@Schema({ strict: false })
export class IngestionDocument {
  @Prop({ default: Date.now })
  createdAt: Date
}

export const DocumentIngestionSchema =
  SchemaFactory.createForClass(IngestionDocument)
