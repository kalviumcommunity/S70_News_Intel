import React, { useState } from 'react';
import { X, Mail, User as UserIcon, Shield, ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { User } from '../../types';
import { MOCK_USERS } from '../../mock/data';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoLogin = (demoUser: User) => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      onLogin(demoUser);
      onClose();
    }, 300);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter an email address.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Check if existing mock user matches
      const existing = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      const computedName = name.trim() || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

      const userToLogin: User = existing || {
        id: `usr-${Date.now()}`,
        name: computedName,
        email: email.trim(),
        role: 'Journalist Analyst',
        department: 'Newsroom Investigation'
      };

      onLogin(userToLogin);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">NewsIntel Sign In</h2>
              <p className="text-[11px] text-slate-400">Simple 1-Click Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 space-y-5">
          {/* Quick 1-Click Demo Profiles (Front & Center) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Instant Demo Sign-In
              </span>
              <span className="text-[10px] text-blue-400 font-medium px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> 1-Click Access
              </span>
            </div>

            <div className="space-y-2">
              {MOCK_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickDemoLogin(user)}
                  className="w-full p-3 bg-slate-800/60 hover:bg-slate-800 hover:border-blue-500/60 border border-slate-700/70 rounded-xl text-left transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        {user.name}
                        {user.id === 'usr-1' && (
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">Default</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{user.role} • <span className="text-slate-500">{user.email}</span></div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-400 group-hover:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <button 
              type="button"
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showCustomForm ? '▲ Hide Custom Email Sign-In' : '▼ Or enter email directly'}
            </button>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Custom Passwordless Email/Name Input Form */}
          {showCustomForm && (
            <form onSubmit={handleCustomSubmit} className="space-y-3.5 animate-in fade-in duration-150">
              {errorMessage && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. reporter@newsintel.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Your Name <span className="text-slate-500 font-normal">(optional)</span></label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-900/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px]">
            <CheckCircle2 className="w-3 h-3" />
            <span>Fast Passwordless Auth</span>
          </div>
          <span className="text-[10px] text-slate-500">NewsIntel Workspace</span>
        </div>
      </div>
    </div>
  );
};




