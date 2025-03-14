import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  apiKey: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  responsibleName: string;

  @Prop({ required: true })
  responsibleContact: string;

  @Prop()
  url: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
