import { Request } from 'express';
import { Client } from '../../clients/schemas/client.schema';

export interface RequestWithClient extends Request {
  client?: Client;
}
