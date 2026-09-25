import React from 'react';
import { Settings, X, Key, Shield, User, Bell, Check, Cpu } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (msg: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [userName, setUserName] = React.useState('Ashik');
  const [role, setRole] = React.useState('Senior Intelligence Analyst');
  const [provider, setProvider] = React.useState('local-bge');
  const [apiKey, setApiKey] = React.useState('sk-newsintel-prod-99201948');
  const [showKey, setShowKey] = React.useState(false);
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    onSave('Platform preferences and LLM provider settings saved successfully.');
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-panel border border-border rounded-lg shadow-card w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 border-b border-border flex items-center justify-between bg-canvas">
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-navy-800" />
            <h3 className="font-bold text-sm text-ink-900">Platform Preferences & AI Providers</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-400 hover:text-ink-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* User Profile */}
          <div className="space-y-3">
            <label className="font-semibold text-ink-400 uppercase tracking-wider block flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-navy-800" />
              Analyst Profile
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-ink-500 mb-1 block">Full Name</span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-canvas border border-border rounded px-2.5 py-1.5 text-ink-900 focus:outline-none focus:border-navy-800"
                />
              </div>
              <div>
                <span className="text-ink-500 mb-1 block">Editorial Role</span>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-canvas border border-border rounded px-2.5 py-1.5 text-ink-900 focus:outline-none focus:border-navy-800"
                />
              </div>
            </div>
          </div>

          {/* AI Synthesis Provider */}
          <div className="space-y-3 pt-2 border-t border-border">
            <label className="font-semibold text-ink-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-navy-800" />
              Vector Engine & Synthesis Provider
            </label>

            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-canvas border border-border rounded px-2.5 py-1.5 text-ink-900 focus:outline-none focus:border-navy-800 font-mono"
            >
              <option value="local-bge">NewsIntel Enterprise On-Premise BGE-M3 (Fastest)</option>
              <option value="openai">OpenAI GPT-4o RAG Pipeline</option>
              <option value="claude">Anthropic Claude 3.5 Sonnet RAG Pipeline</option>
            </select>

            {provider !== 'local-bge' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-ink-500">
                  <span>API Key</span>
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="text-[11px] text-navy-800 hover:underline"
                  >
                    {showKey ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-canvas border border-border rounded px-2.5 py-1.5 text-ink-900 font-mono focus:outline-none focus:border-navy-800"
                />
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="space-y-3 pt-2 border-t border-border">
            <label className="font-semibold text-ink-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-navy-800" />
              Notifications & Activity Stream
            </label>

            <label className="flex items-center gap-2.5 text-ink-700 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded border-border text-navy-800 focus:ring-0 bg-canvas"
              />
              <span>Send daily summary briefing of bookmarked research</span>
            </label>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-canvas flex items-center justify-between">
          <span className="text-[11px] font-mono text-subtle-green">
            {saved && '✓ Settings saved!'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border border-border text-ink-500 hover:text-ink-900 font-semibold rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-navy-800 hover:bg-navy-700 text-white font-semibold rounded shadow-subtle flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
