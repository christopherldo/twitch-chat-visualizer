import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TokenManagerService } from '../auth/token-manager.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import qs from 'qs';

export interface ChannelAssets {
  globalBadges: any;
  channelBadges: any;
  bttvEmotes: any[];
  ffzEmotes: any[];
}

@Injectable()
export class EmoteCacheService {
  private readonly logger = new Logger(EmoteCacheService.name);
  private readonly ASSETS_TTL_MS = 3600 * 1000; // 1 Hora em milisegundos

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private tokenManager: TokenManagerService,
    private configService: ConfigService,
  ) {}

  private async axiosGet(url: string, params: any = {}) {
    const token = await this.tokenManager.getToken();
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');

    return axios({
      method: 'GET',
      url: Object.keys(params).length ? `${url}?${qs.stringify(params)}` : url,
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private async getChannelID(channelName: string): Promise<string | null> {
    try {
      const res = await this.axiosGet('https://api.twitch.tv/helix/users', { login: channelName });
      return res.data?.data?.[0]?.id || null;
    } catch (error: any) {
      this.logger.error(`Error fetching channel ID for ${channelName}: ${error.message}`);
      return null;
    }
  }

  async getChannelAssets(channelName: string): Promise<ChannelAssets | null> {
    const cacheKey = `assets:${channelName.toLowerCase()}`;
    
    // Tenta buscar no Redis primeiro
    const cached = await this.cacheManager.get<ChannelAssets>(cacheKey);
    if (cached) {
      this.logger.log(`CACHE HIT: Loaded assets for ${channelName} from Redis.`);
      return cached;
    }

    this.logger.log(`CACHE MISS: Fetching external API assets for ${channelName}...`);
    
    const channelId = await this.getChannelID(channelName);
    if (!channelId) {
      this.logger.warn(`Could not resolve channel ID for ${channelName}`);
      return null;
    }

    try {
      const [
        globalBadgesRes,
        channelBadgesRes,
        bttvChannelRes,
        bttvGlobalRes,
        ffzChannelRes,
        ffzGlobalRes
      ] = await Promise.allSettled([
        this.axiosGet('https://api.twitch.tv/helix/chat/badges/global'),
        this.axiosGet('https://api.twitch.tv/helix/chat/badges', { broadcaster_id: channelId }),
        axios.get(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`),
        axios.get(`https://api.betterttv.net/3/cached/emotes/global`),
        axios.get(`https://api.frankerfacez.com/v1/room/id/${channelId}`),
        axios.get(`https://api.frankerfacez.com/v1/set/global`),
      ]);

      const globalBadges = globalBadgesRes.status === 'fulfilled' ? globalBadgesRes.value.data : null;
      const channelBadges = channelBadgesRes.status === 'fulfilled' ? channelBadgesRes.value.data : null;
      
      const bttvEmotes: any[] = [];
      if (bttvChannelRes.status === 'fulfilled') {
        bttvEmotes.push(...(bttvChannelRes.value.data.channelEmotes || []));
        bttvEmotes.push(...(bttvChannelRes.value.data.sharedEmotes || []));
      }
      if (bttvGlobalRes.status === 'fulfilled') {
        bttvEmotes.push(...(bttvGlobalRes.value.data || []));
      }

      const ffzEmotes: any[] = [];
      if (ffzChannelRes.status === 'fulfilled') {
        const sets = ffzChannelRes.value.data.sets;
        const setKey = Object.keys(sets)[0];
        if (setKey) ffzEmotes.push(...sets[setKey].emoticons);
      }
      if (ffzGlobalRes.status === 'fulfilled') {
        ffzEmotes.push(...(ffzGlobalRes.value.data.sets['3']?.emoticons || []));
      }

      const payload: ChannelAssets = {
        globalBadges,
        channelBadges,
        bttvEmotes,
        ffzEmotes,
      };

      // Salva no Redis com TTL de 1 Hora
      await this.cacheManager.set(cacheKey, payload, this.ASSETS_TTL_MS);

      return payload;
    } catch (error: any) {
      this.logger.error(`Error resolving promises for assets: ${error.message}`);
      return null;
    }
  }
}
