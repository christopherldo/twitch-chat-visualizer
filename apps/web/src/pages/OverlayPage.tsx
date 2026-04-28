import { useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { sanitizeHTML } from '../lib/sanitize';
import './overlay.css';

interface Message {
  id: string;
  username: string;
  message: string;
  badges: Record<string, string> | null;
  timestamp: number;
}

interface OverlayStore {
  messages: Message[];
  addMessage: (msg: Message) => void;
  removeMessagesByUser: (username: string) => void;
  clearMessages: () => void;
}

const useOverlayStore = create<OverlayStore>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => {
      const newMessages = [...state.messages, msg];
      // Keep only the last 25 messages, like legacy maxDivs = 25
      if (newMessages.length > 25) {
        newMessages.shift();
      }
      return { messages: newMessages };
    }),
  removeMessagesByUser: (username) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.username !== username),
    })),
  clearMessages: () => set({ messages: [] }),
}));

export function OverlayPage() {
  const { channel } = useParams<{ channel: string }>();
  const [searchParams] = useSearchParams();
  const { messages, addMessage, removeMessagesByUser, clearMessages } = useOverlayStore();
  const socketRef = useRef<Socket | null>(null);

  // Extract styles exactly as legacy
  const nameBackground = searchParams.get('namebackground') || '333333';
  const nameColor = searchParams.get('namecolor') || 'ffffff';
  const messageBackground = searchParams.get('messagebackground') || 'ffffff';
  const messageColor = searchParams.get('messagecolor') || '000000';
  const fontSize = searchParams.get('fontsize') || '14';

  useEffect(() => {
    if (!channel) return;

    // Connect to WebSocket (relative if same domain, or specify backend URL in dev)
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const socket = io(socketUrl);
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('username', channel);
    });

    socket.on('message', (messageObject: any) => {
      const msg: Message = {
        id: Math.random().toString(36).substr(2, 9), // unique ID for React keys
        username: messageObject.username,
        message: messageObject.message,
        badges: messageObject.badges,
        timestamp: Date.now(),
      };
      addMessage(msg);
    });

    socket.on('ban', (username: string) => {
      removeMessagesByUser(username);
    });

    socket.on('timeout', (username: string) => {
      removeMessagesByUser(username);
    });

    socket.on('messagedeleted', (username: string) => {
      removeMessagesByUser(username);
    });

    socket.on('clearchat', () => {
      clearMessages();
    });

    return () => {
      socket.disconnect();
    };
  }, [channel, addMessage, removeMessagesByUser, clearMessages]);

  return (
    <div 
      className="chat" 
      style={{ fontSize: `${fontSize}px` }}
    >
      {messages.map((msg) => (
        <div key={msg.id} className={`message user-${msg.username}`}>
          <div
            className="badge-and-name"
            style={{
              backgroundColor: `#${nameBackground}`,
              color: `#${nameColor}`,
            }}
          >
            {/* Render Badges */}
            {msg.badges &&
              Object.values(msg.badges).map((badgeUrl, index) => (
                <div
                  key={index}
                  className="img"
                  style={{
                    backgroundImage: `url(${badgeUrl})`,
                    backgroundSize: '100%',
                  }}
                />
              ))}
            {/* Render Username */}
            <span dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.username) }} />
          </div>

          <div
            className="message-content"
            style={{
              backgroundColor: `#${messageBackground}`,
              color: `#${messageColor}`,
            }}
          >
            <p dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.message) }} />
          </div>
        </div>
      ))}
    </div>
  );
}
