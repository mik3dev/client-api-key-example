import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery } from '@nestjs/swagger';

export const API_KEY_AUTH_KEY = 'apiKeyAuth';

export function ApiKeyAuth() {
  return applyDecorators(
    SetMetadata(API_KEY_AUTH_KEY, true),
    UseGuards(ApiKeyGuard),
    ApiBearerAuth(),
    ApiHeader({
      name: 'X-API-Key',
      description: 'API key for authentication',
      required: false,
    }),
    ApiQuery({
      name: 'apiKey',
      description: 'API key for authentication',
      required: false,
      type: String,
    }),
  );
}
