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

export interface ChannelMessage {
  username: string;
  message: string;
  badges: Record<string, string>;
}
