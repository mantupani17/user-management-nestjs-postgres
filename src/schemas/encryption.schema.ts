import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type EncryptionDocument = HydratedDocument<Encryption>

@Schema({ strict: false })
export class Encryption {
  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ type: String })
  privateKey: string

  @Prop({ type: String })
  publicKey: string

  @Prop({ type: String })
  description: string

  @Prop({ type: Number, default: 1 })
  status: number

  @Prop({ type: Number, default: Date.now() + 600000 })
  expiresIn: number

  @Prop({ type: Boolean, default: true })
  inUse: boolean
}

export const EncryptionSchema = SchemaFactory.createForClass(Encryption)
