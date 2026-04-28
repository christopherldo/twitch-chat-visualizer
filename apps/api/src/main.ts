import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true }
  );

  app.useLogger(app.get(Logger));

  const port = process.env.PORT || 3000;
  
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
