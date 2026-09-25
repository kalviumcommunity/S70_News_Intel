import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-3.5 rounded-lg border shadow-card flex items-start justify-between gap-3 transition-all animate-in slide-in-from-bottom-2 ${
            t.type === 'success'
              ? 'bg-panel border-subtle-green/50 text-ink-900'
              : t.type === 'error'
              ? 'bg-panel border-subtle-red/50 text-ink-900'
              : 'bg-panel border-navy-800/50 text-ink-900'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {t.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-subtle-green shrink-0 mt-0.5" />
            ) : t.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-subtle-red shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-navy-800 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-semibold text-xs text-ink-900">{t.title}</h4>
              {t.description && (
                <p className="text-[11px] text-ink-500 mt-0.5">{t.description}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="text-ink-400 hover:text-ink-900 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
