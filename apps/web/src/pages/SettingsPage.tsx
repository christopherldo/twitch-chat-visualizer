import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const navigate = useNavigate();
  const [channel, setChannel] = useState('');
  const [nameBackground, setNameBackground] = useState('333333');
  const [nameColor, setNameColor] = useState('ffffff');
  const [messageBackground, setMessageBackground] = useState('ffffff');
  const [messageColor, setMessageColor] = useState('000000');
  const [fontSize, setFontSize] = useState('14');

  const generateLink = () => {
    if (!channel.trim()) return '';
    const params = new URLSearchParams({
      namebackground: nameBackground.replace('#', ''),
      namecolor: nameColor.replace('#', ''),
      messagebackground: messageBackground.replace('#', ''),
      messagecolor: messageColor.replace('#', ''),
      fontsize: fontSize,
    });
    return `/${channel.toLowerCase()}/transparent?${params.toString()}`;
  };

  const finalLink = generateLink();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalLink) {
      navigate(finalLink);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-8">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-400 uppercase tracking-wider">
          Twitch Chat Overlay
        </h1>
        <p className="text-slate-400 text-sm mb-6 text-center">
          Configure a aparência do seu chat e gere o link para adicionar no OBS Studio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Canal da Twitch</label>
            <input
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="Ex: alanzoka"
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fundo do Nome</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${nameBackground.replace('#', '')}`}
                  onChange={(e) => setNameBackground(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none p-0"
                />
                <span className="text-sm uppercase text-slate-400">#{nameBackground.replace('#', '')}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cor do Nome</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${nameColor.replace('#', '')}`}
                  onChange={(e) => setNameColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none p-0"
                />
                <span className="text-sm uppercase text-slate-400">#{nameColor.replace('#', '')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fundo da Mensagem</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${messageBackground.replace('#', '')}`}
                  onChange={(e) => setMessageBackground(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none p-0"
                />
                <span className="text-sm uppercase text-slate-400">#{messageBackground.replace('#', '')}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cor da Mensagem</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={`#${messageColor.replace('#', '')}`}
                  onChange={(e) => setMessageColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border-none p-0"
                />
                <span className="text-sm uppercase text-slate-400">#{messageColor.replace('#', '')}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tamanho da Fonte (px)</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-purple-500 transition-colors"
              min="10"
              max="48"
            />
          </div>

          <button
            type="submit"
            disabled={!channel.trim()}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Gerar Link e Visualizar
          </button>
        </form>

        {finalLink && channel.trim() && (
          <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">URL para o OBS (Browser Source):</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}${finalLink}`}
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 outline-none"
              />
              <button
                onClick={() => navigator.clipboard.writeText(`${window.location.origin}${finalLink}`)}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}