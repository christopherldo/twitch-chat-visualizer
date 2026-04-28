import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsPage } from './pages/SettingsPage';
import { OverlayPage } from './pages/OverlayPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/transparent" replace />} />
        <Route path="/transparent" element={<SettingsPage />} />
        <Route path="/:channel/transparent" element={<OverlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;