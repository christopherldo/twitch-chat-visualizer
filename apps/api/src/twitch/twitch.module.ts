import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';

@Module({
  providers: [TwitchService],
  exports: [TwitchService],
})
export class TwitchModule {}
