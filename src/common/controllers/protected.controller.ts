import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '../../clients/schemas/client.schema';
import { ApiKeyAuth } from '../decorators/api-key-auth.decorator';
import { GetClient } from '../decorators/get-client.decorator';

@ApiTags('protected')
@Controller('protected')
export class ProtectedController {
  @Get()
  @ApiKeyAuth()
  @ApiOperation({ summary: 'Get protected resource' })
  @ApiResponse({
    status: 200,
    description: 'Returns a welcome message with the client name',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
  })
  getProtectedResource(@GetClient() client: Client): {
    message: string;
    clientName: string;
  } {
    return {
      message: 'You have successfully accessed a protected resource!',
      clientName: client.name,
    };
  }
}
