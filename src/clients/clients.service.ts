import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const apiKey = this.generateApiKey();
    const createdClient = new this.clientModel({
      ...createClientDto,
      apiKey,
    });
    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async findByApiKey(apiKey: string): Promise<Client> {
    const client = await this.clientModel.findOne({ apiKey }).exec();
    if (!client) {
      throw new NotFoundException(`Client with API Key ${apiKey} not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();

    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return updatedClient;
  }

  async remove(id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();

    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return deletedClient;
  }

  async regenerateApiKey(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    client.apiKey = this.generateApiKey();
    return client.save();
  }

  private generateApiKey(): string {
    return uuidv4();
  }
}
