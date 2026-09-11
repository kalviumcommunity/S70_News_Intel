import React from 'react';
import { ChatMessage, Citation, ResearchSession } from '../../types';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Clock, 
  Share2, 
  Download, 
  Trash2, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface ChatViewProps {
  session: ResearchSession;
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  onSelectCitation: (citation: Citation) => void;
  selectedCitationId?: string;
  onClearSession: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  session,
  messages,
  onSendMessage,
  onSelectCitation,
  selectedCitationId,
  onClearSession,
}) => {
  const [inputText, setInputText] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    const text = inputText;
    setInputText('');
    setIsGenerating(true);
    onSendMessage(text);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  const samplePrompts = [
    "What compute thresholds trigger EU AI Act compliance audits?",
    "Summarize antitrust allegations under Clayton Act Section 7.",
    "Did web crawlers bypass subscriber paywalls across publishers?",
    "Compare FEC campaign ad spend data for 2026."
  ];

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.sender === 'user') {
      return <p className="text-slate-100 font-sans leading-relaxed">{msg.content}</p>;
    }

    // Replace [cit-101], [cit-102], [cit-103] with interactive citation buttons
    const parts = msg.content.split(/(\[cit-\d+\])/g);

    return (
      <div className="space-y-3 text-slate-200 font-sans leading-relaxed">
        <div>
          {parts.map((part, idx) => {
            const match = part.match(/\[cit-(\d+)\]/);
            if (match && msg.citations) {
              const citId = part.replace('[', '').replace(']', '');
              const cit = msg.citations.find((c) => c.id === citId);
              if (cit) {
                const isSelected = selectedCitationId === cit.id;
                return (
                  <button
                    key={idx}
                    onClick={() => onSelectCitation(cit)}
                    className={`citation-badge ${
                      isSelected ? 'ring-2 ring-brand-400 bg-brand-500/40 text-white font-bold scale-105' : ''
                    }`}
                    title={`Click to inspect evidence from ${cit.sourceOutlet}`}
                  >
                    <BookOpen className="w-3 h-3 text-brand-300" />
                    <span>Doc #{cit.id.split('-')[1]} • p.{cit.pageNumber}</span>
                  </button>
                );
              }
            }
            return <span key={idx}>{part}</span>;
          })}
        </div>

        {/* Entities Extracted Chip Bar */}
        {msg.entitiesExtracted && msg.entitiesExtracted.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-[11px]">
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-accent-emerald" />
              Verified Entities:
            </span>
            {msg.entitiesExtracted.map((ent, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-surface-100 border border-slate-700/60 text-slate-300 font-mono text-[10px]">
                {ent}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-[#0B0F17] relative">
      {/* Session Title Header */}
      <div className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between bg-surface-50/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
              {session.title}
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {session.category}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">Grounded RAG Answer Mode • Citations & Evidence Enabled</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearSession}
            title="Clear Chat History"
            className="p-1.5 rounded-lg bg-surface-100 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-surface-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('Exporting full research briefing report with citations to PDF...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/20 text-brand-300 hover:bg-brand-600/30 border border-brand-500/30 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Scrollable Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 max-w-4xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-tr from-brand-600 to-brand-400 text-white'
                  : 'bg-surface-100 border border-slate-700 text-accent-purple'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            {/* Message Bubble */}
            <div className={`space-y-1 max-w-2xl ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                <span className="font-semibold text-slate-300">
                  {msg.sender === 'user' ? 'Journalist Query' : 'NewsIntel RAG Engine'}
                </span>
                <span>•</span>
                <span className="font-mono">{msg.timestamp}</span>
                {msg.thinkingTimeMs && (
                  <span className="ml-auto font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    ⚡ {msg.thinkingTimeMs}ms • {(msg.confidenceScore! * 100).toFixed(0)}% Confidence
                  </span>
                )}
              </div>

              <div
                className={`p-4 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/15 rounded-tr-none'
                    : 'glass-panel text-slate-200 border-slate-700/70 rounded-tl-none shadow-xl'
                }`}
              >
                {renderMessageContent(msg)}
              </div>
            </div>
          </div>
        ))}

        {/* AI Generating Indicator */}
        {isGenerating && (
          <div className="flex gap-4 max-w-4xl">
            <div className="w-9 h-9 rounded-xl bg-surface-100 border border-slate-700 text-accent-purple flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-400" />
            </div>
            <div className="glass-panel p-4 rounded-2xl rounded-tl-none border-brand-500/30 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-xs font-mono text-slate-300">
                Retrieving dense vector embeddings & reranking evidence...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length < 4 && (
        <div className="px-6 py-2 flex items-center gap-2 overflow-x-auto border-t border-slate-800/40 bg-[#0E1420]/30">
          <Lightbulb className="w-3.5 h-3.5 text-accent-amber shrink-0" />
          <span className="text-[11px] font-medium text-slate-400 shrink-0">Suggested Prompts:</span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt);
              }}
              className="px-2.5 py-1 rounded-lg text-xs bg-surface-100 hover:bg-surface-200 text-slate-300 hover:text-white border border-slate-700/60 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <div className="p-4 border-t border-slate-800/80 bg-[#0E1420]/90 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask NewsIntel RAG engine about articles, legal transcripts, or FEC data..."
            className="flex-1 glass-input px-4 py-3 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 disabled:opacity-50 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all"
          >
            <span>Research</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
