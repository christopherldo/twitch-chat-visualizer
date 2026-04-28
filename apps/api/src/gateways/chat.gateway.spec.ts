import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatGateway } from './chat.gateway';
import { TwitchService } from '../twitch/twitch.service';
import { EmoteCacheService } from '../cache/emote-cache.service';
import { Subject } from 'rxjs';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let mockTwitchService: any;
  let mockEmoteCacheService: any;
  let mockClient: any;

  beforeEach(() => {
    mockTwitchService = {
      messageSubject: new Subject(),
      banSubject: new Subject(),
      timeoutSubject: new Subject(),
      deleteSubject: new Subject(),
      clearSubject: new Subject(),
      joinChannel: vi.fn(),
      leaveChannel: vi.fn(),
    };

    mockEmoteCacheService = {
      getChannelAssets: vi.fn(),
    };

    gateway = new ChatGateway(
      mockTwitchService as unknown as TwitchService,
      mockEmoteCacheService as unknown as EmoteCacheService
    );

    mockClient = {
      id: 'socket-123',
      data: {},
      join: vi.fn(),
      leave: vi.fn(),
      emit: vi.fn(),
    };
  });

  it('should join channel, register socket in room and call services', async () => {
    await gateway.handleJoinChannel(mockClient, 'testchannel');

    expect(mockClient.data.channel).toBe('testchannel');
    expect(mockClient.join).toHaveBeenCalledWith('testchannel');
    expect(mockTwitchService.joinChannel).toHaveBeenCalledWith('testchannel');
    expect(mockEmoteCacheService.getChannelAssets).toHaveBeenCalledWith('testchannel');
    expect(mockClient.emit).toHaveBeenCalledWith('configured');
  });

  it('should leave channel on disconnect', () => {
    mockClient.data.channel = 'testchannel';
    
    gateway.handleDisconnect(mockClient);

    expect(mockClient.leave).toHaveBeenCalledWith('testchannel');
    expect(mockTwitchService.leaveChannel).toHaveBeenCalledWith('testchannel');
  });
});
