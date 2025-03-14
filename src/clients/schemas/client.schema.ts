import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @ApiProperty({
    description: 'The name of the client application',
    example: 'My Mobile App',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The unique API key for the client',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Prop({ required: true, unique: true })
  apiKey: string;

  @ApiProperty({
    description: 'Description of the client application',
    example: 'Mobile application for iOS and Android',
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'Name of the person responsible for the client application',
    example: 'John Doe',
  })
  @Prop({ required: true })
  responsibleName: string;

  @ApiProperty({
    description:
      'Contact information of the responsible person (email or phone)',
    example: 'john.doe@example.com',
  })
  @Prop({ required: true })
  responsibleContact: string;

  @ApiProperty({
    description: 'URL of the client application',
    example: 'https://myapp.example.com',
  })
  @Prop()
  url: string;

  @ApiProperty({
    description: 'Whether the client is active or not',
    example: true,
    default: true,
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
