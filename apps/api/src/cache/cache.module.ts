import { Module } from '@nestjs/common';
import { EmoteCacheService } from './emote-cache.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [EmoteCacheService],
  exports: [EmoteCacheService],
})
export class CacheExtModule {}
