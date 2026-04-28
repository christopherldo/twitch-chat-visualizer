import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TokenManagerService } from './token-manager.service';
import { ConfigService } from '@nestjs/config';

describe('TokenManagerService', () => {
  let tokenManagerService: TokenManagerService;
  let mockCacheManager: any;
  let mockConfigService: any;

  beforeEach(() => {
    mockCacheManager = {
      get: vi.fn(),
      set: vi.fn(),
    };

    mockConfigService = {
      get: vi.fn().mockImplementation((key: string) => {
        if (key === 'TWITCH_CLIENT_ID') return 'mock-client-id';
        if (key === 'TWITCH_CLIENT_SECRET') return 'mock-client-secret';
        return null;
      }),
    };

    tokenManagerService = new TokenManagerService(
      mockConfigService as unknown as ConfigService,
      mockCacheManager
    );
  });

  it('should return token from cache if available', async () => {
    mockCacheManager.get.mockResolvedValue('cached-token');

    const token = await tokenManagerService.getToken();

    expect(mockCacheManager.get).toHaveBeenCalledWith('TWITCH_APP_ACCESS_TOKEN');
    expect(token).toBe('cached-token');
  });
});
