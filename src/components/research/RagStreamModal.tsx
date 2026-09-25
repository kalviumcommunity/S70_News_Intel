import React from 'react';
import { ResearchAnswer } from '../../types';
import { Cpu, Database, CheckCircle2, Sparkles, Zap, FastForward, ShieldCheck } from 'lucide-react';

interface RagStreamModalProps {
  isOpen: boolean;
  question: string;
  onComplete: (answer: ResearchAnswer) => void;
  mockAnswer: ResearchAnswer;
}

export const RagStreamModal: React.FC<RagStreamModalProps> = ({
  isOpen,
  question,
  onComplete,
  mockAnswer,
}) => {
  const [step, setStep] = React.useState<number>(1);
  const [streamedText, setStreamedText] = React.useState<string>('');
  const [isFastMode, setIsFastMode] = React.useState(false);

  const fullText = React.useMemo(() => {
    return mockAnswer.paragraphs.join('\n\n');
  }, [mockAnswer]);

  React.useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setStreamedText('');
      return;
    }

    // Step 1: Query Embedding
    const timer1 = setTimeout(() => {
      setStep(2);
    }, isFastMode ? 300 : 700);

    // Step 2: Vector Search
    const timer2 = setTimeout(() => {
      setStep(3);
    }, isFastMode ? 600 : 1400);

    // Step 3: Citation Verification
    const timer3 = setTimeout(() => {
      setStep(4);
    }, isFastMode ? 900 : 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, isFastMode]);

  // Step 4: Stream text typewriter effect
  React.useEffect(() => {
    if (step !== 4 || !isOpen) return;

    let index = 0;
    const speed = isFastMode ? 10 : 25;
    const interval = setInterval(() => {
      index += isFastMode ? 5 : 2;
      if (index >= fullText.length) {
        setStreamedText(fullText);
        clearInterval(interval);
        setTimeout(() => {
          onComplete(mockAnswer);
        }, 400);
      } else {
        setStreamedText(fullText.slice(0, index));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [step, fullText, isOpen, isFastMode, mockAnswer, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-panel border border-border rounded-lg shadow-card w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-canvas">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-navy-800/20 border border-navy-800/50 flex items-center justify-center text-navy-800">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-ink-900">RAG Intelligence Engine</h3>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-subtle-greenBg text-subtle-green rounded border border-subtle-green/40">
                  LIVE SYNTHESIS
                </span>
              </div>
              <p className="text-xs text-ink-500 truncate max-w-md">"{question}"</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFastMode(!isFastMode)}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isFastMode
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'bg-canvas border-border text-ink-500 hover:text-ink-900'
            }`}
            title="Toggle high-speed execution"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{isFastMode}</span>
          </button>
        </div>

        {/* Dynamic Pipeline Steps */}
        <div className="p-5 border-b border-border bg-canvas/60 grid grid-cols-3 gap-3">
          <div className={`p-3 rounded border transition-all ${
            step >= 1 ? 'border-navy-800/60 bg-navy-800/10 text-ink-900' : 'border-border bg-canvas text-ink-500'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">Step 1</span>
              {step > 1 ? <CheckCircle2 className="w-4 h-4 text-subtle-green" /> : <Zap className="w-4 h-4 text-navy-800 animate-bounce" />}
            </div>
            <div className="font-semibold text-xs">Vector Embedding</div>
            <div className="text-[11px] text-ink-500 mt-0.5">Dense BGE-M3 model</div>
          </div>

          <div className={`p-3 rounded border transition-all ${
            step >= 2 ? 'border-navy-800/60 bg-navy-800/10 text-ink-900' : 'border-border bg-canvas text-ink-500'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">Step 2</span>
              {step > 2 ? <CheckCircle2 className="w-4 h-4 text-subtle-green" /> : step === 2 ? <Database className="w-4 h-4 text-navy-800 animate-pulse" /> : null}
            </div>
            <div className="font-semibold text-xs">Hybrid Scan</div>
            <div className="text-[11px] text-ink-500 mt-0.5">Top-K document chunks</div>
          </div>

          <div className={`p-3 rounded border transition-all ${
            step >= 3 ? 'border-navy-800/60 bg-navy-800/10 text-ink-900' : 'border-border bg-canvas text-ink-500'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-400">Step 3</span>
              {step > 3 ? <CheckCircle2 className="w-4 h-4 text-subtle-green" /> : step === 3 ? <ShieldCheck className="w-4 h-4 text-navy-800 animate-spin" /> : null}
            </div>
            <div className="font-semibold text-xs">Fact Alignment</div>
            <div className="text-[11px] text-ink-500 mt-0.5">Citation cross-reference</div>
          </div>
        </div>

        {/* Live Stream Terminal Box */}
        <div className="p-6 bg-canvas flex-1 min-h-[220px] max-h-[320px] overflow-y-auto space-y-4 font-mono">
          {step < 4 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-8">
              <Sparkles className="w-8 h-8 text-navy-800 animate-spin" />
              <div className="text-xs font-semibold text-ink-700">
                {step === 1 && "Formulating semantic search vector..."}
                {step === 2 && "Scanning 4,820 indexed document chunks..."}
                {step === 3 && "Verifying source evidence & page references..."}
              </div>
              <div className="w-48 h-1.5 bg-panel border border-border rounded-full overflow-hidden">
                <div className={`h-full bg-navy-800 transition-all duration-500 ${
                  step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
                }`}></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 font-sans">
              <div className="text-xs font-mono font-bold text-ink-500 uppercase tracking-wider flex items-center justify-between border-b border-border pb-2">
                <span>SYNTHESIZED ANSWER STREAM</span>
                <span className="text-subtle-green text-[11px] font-mono">96.8% Match Confidence</span>
              </div>
              <div className="text-sm text-ink-900 leading-relaxed space-y-3 whitespace-pre-wrap">
                {streamedText}
                <span className="inline-block w-2 h-4 bg-navy-800 ml-1 animate-pulse"></span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-canvas flex items-center justify-between text-xs text-ink-500">
          <span>Engine: NewsIntel Hybrid Vector Index (Cosine distance threshold: 0.042)</span>
          <button
            onClick={() => onComplete(mockAnswer)}
            className="px-3 py-1 bg-panel hover:bg-canvas border border-border rounded text-ink-700 hover:text-ink-900 transition-colors font-medium"
          >
            Skip Streaming →
          </button>
        </div>
      </div>
    </div>
  );
};
