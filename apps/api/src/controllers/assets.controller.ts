import { Controller, Get, Param } from '@nestjs/common';
import { EmoteCacheService } from '../cache/emote-cache.service';

@Controller('api/assets')
export class AssetsController {
  constructor(private readonly emoteCache: EmoteCacheService) {}

  @Get(':channel')
  async getChannelAssets(@Param('channel') channel: string) {
    const assets = await this.emoteCache.getChannelAssets(channel);
    if (!assets) {
      return { error: 'Failed to fetch assets for channel' };
    }
    return assets;
  }
}
