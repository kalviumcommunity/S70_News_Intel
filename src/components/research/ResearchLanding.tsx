import React from 'react';
import { Search, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface ResearchLandingProps {
  onAskQuestion: (question: string) => void;
}

export const ResearchLanding: React.FC<ResearchLandingProps> = ({ onAskQuestion }) => {
  const [questionText, setQuestionText] = React.useState('');

  const suggestions = [
    "What caused the railway disruption?",
    "Find previous interviews with the transport minister",
    "What changed between the two reports?",
    "Show evidence about the investigation"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim()) {
      onAskQuestion(questionText.trim());
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setQuestionText(text);
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 max-w-4xl mx-auto w-full">
      <div className="w-full space-y-8">
        {/* Workspace Label & Main Heading */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
            Research Workspace
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            What are you investigating?
          </h1>
          <p className="text-base text-ink-500">
            Search your archive and get answers backed by evidence.
          </p>
        </div>

        {/* Main Large Research Input Box */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative rounded-md border border-border bg-panel shadow-card p-2 flex items-center gap-3 focus-within:border-navy-800 focus-within:ring-1 focus-within:ring-navy-800 transition-all">
            <Search className="w-5 h-5 text-ink-400 ml-2 shrink-0" />
            <input
              type="text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="flex-1 py-2 text-base text-ink-900 placeholder:text-ink-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              disabled={!questionText.trim()}
              className="px-4 py-2 bg-navy-800 hover:bg-navy-700 disabled:opacity-50 text-white rounded text-sm font-semibold flex items-center gap-2 transition-colors shrink-0"
            >
              <span>Ask</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Clickable Suggestions */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-navy-800" />
            Try asking
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                className="text-left px-3.5 py-2.5 rounded border border-border bg-panel hover:bg-canvas hover:border-gray-300 transition-colors text-sm text-ink-700 flex items-center justify-between group"
              >
                <span>"{item}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-navy-800 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
