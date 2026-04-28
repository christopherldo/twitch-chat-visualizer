import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EmoteCacheService } from '../cache/emote-cache.service';

@ApiTags('Assets')
@Controller('api/assets')
export class AssetsController {
  constructor(private readonly emoteCache: EmoteCacheService) {}

  @Get(':channel')
  @ApiOperation({ summary: 'Obter assets de um canal da Twitch (Badges e Emotes)' })
  @ApiParam({ name: 'channel', description: 'O nome de usuário do canal da Twitch', type: 'string' })
  @ApiResponse({ status: 200, description: 'Os assets do canal foram carregados do cache ou API.' })
  @ApiResponse({ status: 404, description: 'Erro ao carregar assets do canal.' })
  async getChannelAssets(@Param('channel') channel: string) {
    const assets = await this.emoteCache.getChannelAssets(channel);
    if (!assets) {
      return { error: 'Failed to fetch assets for channel' };
    }
    return assets;
  }
}
