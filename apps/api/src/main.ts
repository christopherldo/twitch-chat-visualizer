import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true }
  );

  app.useLogger(app.get(Logger));

  const port = process.env.PORT || 3000;
  
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Twitch Chat Visualizer API')
    .setDescription('The API documentation for the Twitch Chat Visualizer v2')
    .setVersion('2.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // CORS habilitado nativamente via plugin do fastify para WebSockets e endpoints
  const fastifyInstance = app.getHttpAdapter().getInstance();
  await fastifyInstance.register((await import('@fastify/cors')).default as any, {
    origin: '*',
  });

  await app.listen(port, '0.0.0.0');
  
  const logger = app.get(Logger);
  logger.log(`🚀 NestJS API Gateway is running on: http://localhost:${port}`);
}

bootstrap();
