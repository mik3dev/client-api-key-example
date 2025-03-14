import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = await app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const apiPrefix = configService.get<string>('API_PREFIX');

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global prefix for API endpoints
  app.setGlobalPrefix(apiPrefix);

  await app.listen(port, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
