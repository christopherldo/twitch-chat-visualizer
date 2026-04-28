import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import qs from 'qs';

@Injectable()
export class TokenManagerService implements OnModuleInit {
  private readonly logger = new Logger(TokenManagerService.name);
  private readonly TOKEN_KEY = 'TWITCH_APP_ACCESS_TOKEN';

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    await this.ensureTokenValid();
  }

  async getToken(): Promise<string> {
    let token = await this.cacheManager.get<string>(this.TOKEN_KEY);
    if (!token) {
      token = await this.refreshToken();
    }
    return token;
  }

  // Executa a cada 30 minutos para garantir que o token esteja sempre válido (eles duram ~60 dias, mas é bom previnir)
  @Cron(CronExpression.EVERY_30_MINUTES)
  async ensureTokenValid() {
    const token = await this.cacheManager.get<string>(this.TOKEN_KEY);
    if (!token) {
      await this.refreshToken();
    }
  }

  private async refreshToken(): Promise<string> {
    this.logger.log('Fetching new Twitch App Access Token...');
    
    const clientId = this.configService.get<string>('TWITCH_CLIENT_ID');
    const clientSecret = this.configService.get<string>('TWITCH_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      this.logger.error('Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in .env');
      return '';
    }

    try {
      const response = await axios.post(
        'https://id.twitch.tv/oauth2/token',
        qs.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const { access_token, expires_in } = response.data;
      
      // TTL = expiração menos 5 minutos de margem de segurança (em ms)
      const ttl = (expires_in - 300) * 1000;
      
      await this.cacheManager.set(this.TOKEN_KEY, access_token, ttl);
      
      this.logger.log(`New token fetched. Expires in ${expires_in} seconds.`);
      return access_token;
    } catch (error: any) {
      this.logger.error(`Failed to fetch Twitch token: ${error.message}`);
      throw error;
    }
  }
}
