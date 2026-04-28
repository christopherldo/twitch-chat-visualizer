import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { LandingPage } from './pages/Landing/LandingPage';
import { SettingsPage } from './pages/SettingsPage';
import { OverlayPage } from './pages/OverlayPage';

function ChannelRedirect() {
  const { channel } = useParams<{ channel: string }>();

  if (!channel) {
    return <Navigate to="/transparent" replace />;
  }

  return <Navigate to={`/${channel}/transparent`} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/transparent" element={<SettingsPage />} />
      <Route path="/:channel" element={<ChannelRedirect />} />
      <Route path="/:channel/transparent" element={<OverlayPage />} />
    </Routes>
  );
}
