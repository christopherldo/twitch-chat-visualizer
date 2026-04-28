import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthCheckService, MemoryHealthIndicator, HealthCheck, HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

class RedisHealthIndicator extends HealthIndicator {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.cacheManager.set('health-check-ping', 'pong', 1000);
      const res = await this.cacheManager.get('health-check-ping');
      const isHealthy = res === 'pong';
      
      const result = this.getStatus(key, isHealthy, { message: 'Redis/Cache is responding' });
      
      if (isHealthy) {
        return result;
      }
      throw new HealthCheckError('Redischeck failed', result);
    } catch (e: any) {
      throw new HealthCheckError('Redischeck failed', this.getStatus(key, false, { message: e.message }));
    }
  }
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Verificar saúde da API (Redis e Memória)' })
  @HealthCheck()
  check() {
    const redisIndicator = new RedisHealthIndicator(this.cacheManager);

    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),   // 300MB
      () => redisIndicator.isHealthy('redis'),
    ]);
  }
}