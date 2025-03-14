import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientsService } from '../../clients/clients.service';
import { RequestWithClient } from '../interfaces/request-with-client.interface';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly clientsService: ClientsService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithClient>();
    const apiKey = this.extractApiKeyFromRequest(request);

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    try {
      const client = await this.clientsService.findByApiKey(apiKey);
      // Attach the client to the request object for later use
      request.client = client;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid API key');
    }
  }

  private extractApiKeyFromRequest(
    request: RequestWithClient,
  ): string | undefined {
    // Try to extract API key from different locations
    const apiKeyHeader = request.headers['x-api-key'];
    if (apiKeyHeader) {
      return Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;
    }
    // Check query parameter
    if (request.query && request.query.apiKey) {
      return request.query.apiKey as string;
    }
    return undefined;
  }
}
