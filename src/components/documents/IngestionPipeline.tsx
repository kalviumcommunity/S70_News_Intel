import React from 'react';
import { 
  FileCheck, 
  Sparkles, 
  Scissors, 
  Cpu, 
  Database, 
  CheckCircle2, 
  Loader2,
  XCircle
} from 'lucide-react';

interface IngestionPipelineProps {
  fileName: string;
  isProcessing: boolean;
  onComplete: () => void;
}

export const IngestionPipeline: React.FC<IngestionPipelineProps> = ({
  fileName,
  isProcessing,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    { name: 'Cleaning & Metadata', icon: FileCheck, desc: 'Stripping layout artifacts, extracting author & date' },
    { name: 'Recursive Chunking', icon: Scissors, desc: '512 token chunks with 64 token overlap' },
    { name: 'Embedding Generation', icon: Cpu, desc: 'Generating 1536-dim text-embedding-3 vectors' },
    { name: 'Vector DB Indexing', icon: Database, desc: 'Writing to pgvector HNSW index & Redis cache' },
  ];

  React.useEffect(() => {
    if (isProcessing) {
      setCurrentStep(0);
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            setTimeout(onComplete, 800);
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  if (!isProcessing && currentStep === 0) return null;

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-4 border-brand-500/30 bg-brand-500/5 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">RAG Ingestion Pipeline Active</h4>
            <p className="text-xs text-slate-400 font-mono">Processing: {fileName}</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
          Step {currentStep + 1} of 4
        </span>
      </div>

      {/* Visual Pipeline Step Progress Bar */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : isCurrent
                  ? 'bg-brand-500/20 border-brand-500/50 text-brand-300 ring-2 ring-brand-500/30'
                  : 'bg-surface-50/50 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <StepIcon className="w-4 h-4" />
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <p className="text-xs font-semibold">{step.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
