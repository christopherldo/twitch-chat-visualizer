import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { LoggerModule } from 'nestjs-pino';
import { AssetsController } from './controllers/assets.controller';
import { AuthModule } from './auth/auth.module';
import { CacheExtModule } from './cache/cache.module';
import { TwitchModule } from './twitch/twitch.module';
import { GatewaysModule } from './gateways/gateways.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env', // Pode ler da raiz do monorepo se desejar
    }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        try {
          const store = await redisStore({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
              reconnectStrategy: () => new Error('Redis not available'),
            }
          });
          return { store };
        } catch (error) {
          console.warn('⚠️  Redis connection failed, falling back to in-memory cache.');
          return {}; // Retornar um objeto vazio instrui o cache-manager a usar o cache em memória padrão do Node
        }
      },
    }),
    AuthModule,
    CacheExtModule,
    TwitchModule,
    GatewaysModule,
    HealthModule,
  ],
  controllers: [AssetsController],
  providers: [],
})
export class AppModule {}
