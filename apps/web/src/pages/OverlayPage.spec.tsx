import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { OverlayPage } from './OverlayPage';
import { io } from 'socket.io-client';

// Mock the socket.io-client
vi.mock('socket.io-client', () => {
  const mSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  return {
    io: vi.fn(() => mSocket),
  };
});

describe('OverlayPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing and connects to channel', () => {
    render(
      <MemoryRouter initialEntries={['/testchannel/transparent?fontsize=20&namecolor=ff0000']}>
        <Routes>
          <Route path="/:channel/transparent" element={<OverlayPage />} />
        </Routes>
      </MemoryRouter>
    );

    const mSocket = io('/');
    expect(io).toHaveBeenCalled();
    
    // Simulate connect event
    const connectHandler = (mSocket.on as any).mock.calls.find((call: any) => call[0] === 'connect')[1];
    connectHandler();

    expect(mSocket.emit).toHaveBeenCalledWith('username', 'testchannel');
  });

  it('applies query parameters to styles', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/testchannel/transparent?fontsize=24']}>
        <Routes>
          <Route path="/:channel/transparent" element={<OverlayPage />} />
        </Routes>
      </MemoryRouter>
    );

    const chatDiv = container.querySelector('.chat') as HTMLElement;
    expect(chatDiv.style.fontSize).toBe('24px');
  });
});