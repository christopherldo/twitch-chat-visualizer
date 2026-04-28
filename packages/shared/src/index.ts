import { z } from 'zod';

export const OverlaySettingsSchema = z.object({
  nameBackgroundColor: z.string().optional(),
  nameTextColor: z.string().optional(),
  messageBackgroundColor: z.string().optional(),
  messageTextColor: z.string().optional(),
  fontSize: z.number().optional(),
});

export type OverlaySettings = z.infer<typeof OverlaySettingsSchema>;

export interface Emote {
  id: string;
  code: string;
  url: string;
}

export interface BttvEmote {
  id: string;
  code: string;
  imageType: string;
  animated: boolean;
}

export interface FfzEmote {
  id: number;
  name: string;
  height: number;
  width: number;
}

export interface TwitchBadgeVersion {
  id: string;
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
}

export interface TwitchBadgeSet {
  set_id: string;
  versions: TwitchBadgeVersion[];
}

export interface TwitchBadgesResponse {
  data: TwitchBadgeSet[];
}

export interface ChannelAssets {
  globalBadges: TwitchBadgesResponse | null;
  channelBadges: TwitchBadgesResponse | null;
  bttvEmotes: BttvEmote[];
  ffzEmotes: FfzEmote[];
}

export interface ChannelMessage {
  username: string;
  message: string;
  badges: Record<string, string>;
}
