import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TwitchModule } from '../twitch/twitch.module';
import { CacheExtModule } from '../cache/cache.module';

@Module({
  imports: [TwitchModule, CacheExtModule],
  providers: [ChatGateway],
})
export class GatewaysModule {}
