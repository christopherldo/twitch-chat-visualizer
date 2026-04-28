import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const port = process.env.PORT || 3000;
  
  app.enableCors();
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 NestJS Backend is running on: http://localhost:${port}`);
}

bootstrap();
