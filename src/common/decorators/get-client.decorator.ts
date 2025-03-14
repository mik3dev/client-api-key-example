import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithClient } from '../interfaces/request-with-client.interface';

/**
 * Decorator to extract the client from the request object
 * Use this decorator in controller methods after applying the ApiKeyAuth decorator
 *
 * @example
 * @ApiKeyAuth()
 * @Get('protected-route')
 * getProtectedResource(@GetClient() client: Client) {
 *   return `Hello ${client.name}!`;
 * }
 */
export const GetClient = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithClient>();
    return request.client;
  },
);
