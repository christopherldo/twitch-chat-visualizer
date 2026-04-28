import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyHttpProxy from '@fastify/http-proxy';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true }
  );

  app.useLogger(app.get(Logger));

  const port = process.env.PORT || 3000;
  const legacyPort = process.env.LEGACY_PORT || 3001;
  
  // Como Fastify registra automaticamente OPTIONS no enableCors e o proxy
  // também tenta registrar, isso causa colisão no root (/*).
  // Em vez de usar enableCors() global aqui, ativamos o CORS como middleware
  // nativo do Fastify antes de registrar o proxy.
  const fastifyInstance = app.getHttpAdapter().getInstance();
  await fastifyInstance.register((await import('@fastify/cors')).default as any, {
    origin: '*',
  });

  // Redireciona tudo o que o NestJS NÃO conhece para o backend legado (Strangler Fig)
  await app.register(fastifyHttpProxy as any, {
    upstream: `http://localhost:${legacyPort}`,
    httpMethods: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'],
    replyOptions: {
      rewriteRequestHeaders: (_request: any, headers: any) => headers,
    }
  });

  await app.listen(port, '0.0.0.0');
  
  const logger = app.get(Logger);
  logger.log(`🚀 NestJS API Gateway is running on: http://localhost:${port}`);
  logger.log(`➡️  Proxying unknown routes to legacy app on port: ${legacyPort}`);
}

bootstrap();
