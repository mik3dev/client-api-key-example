import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');
  const apiPrefix = configService.get<string>('API_PREFIX');
  const swaggerEnabled = configService.get<boolean>('SWAGGER_ENABLED');
  const swaggerPrefix = configService.get<string>('SWAGGER_PREFIX');

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

  // Setup Swagger only if enabled
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Client API Key Management')
      .setDescription('API for managing client applications and their API keys')
      .setVersion('1.0')
      .addTag('clients')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPrefix, app, document);
  } else {
    logger.log('Swagger documentation is disabled');
  }

  // Global prefix for API endpoints
  app.setGlobalPrefix(apiPrefix);

  await app.listen(port, async () => {
    logger.log(`Application is running on: ${await app.getUrl()}`);
    if (swaggerEnabled)
      logger.log(
        `Swagger documentation will be available at: ${await app.getUrl()}/${swaggerPrefix}`,
      );
  });
}

bootstrap();
