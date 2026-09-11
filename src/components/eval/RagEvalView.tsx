import React from 'react';
import { INITIAL_EVAL_METRICS, EVAL_BENCHMARK_CASES } from '../../mock/data';
import { 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Play, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export const RagEvalView: React.FC = () => {
  const [metrics, setMetrics] = React.useState(INITIAL_EVAL_METRICS);
  const [testCases, setTestCases] = React.useState(EVAL_BENCHMARK_CASES);
  const [isRunningEval, setIsRunningEval] = React.useState(false);

  const handleRunEvalSuite = () => {
    setIsRunningEval(true);
    setTimeout(() => {
      setIsRunningEval(false);
      // Simulate metric improvement
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          score: Math.min(0.99, Number((m.score + 0.01).toFixed(2))),
        }))
      );
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0F17] h-[calc(100vh-4rem)]">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-purple" />
            RAG System Quality & Groundedness Evaluation
          </h1>
          <p className="text-xs text-slate-400">
            Real-time Ragas metric scoring: Context Precision, Context Recall, Faithfulness & Answer Relevance
          </p>
        </div>

        <button
          onClick={handleRunEvalSuite}
          disabled={isRunningEval}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isRunningEval ? 'animate-spin' : ''}`} />
          <span>{isRunningEval ? 'Evaluating Benchmark Cases...' : 'Run RAG Benchmark Suite'}</span>
        </button>
      </div>

      {/* Top 4 Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const percentage = Math.round(m.score * 100);
          return (
            <div
              key={m.id}
              className="glass-panel p-4 rounded-2xl space-y-2 border-slate-800 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">{m.metricName}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {m.change}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-slate-100">{percentage}%</span>
                <span className="text-xs text-slate-400 font-mono">Target: {(m.benchmarkTarget * 100)}%</span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 to-accent-purple h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-tight pt-1">{m.description}</p>
            </div>
          );
        })}
      </div>

      {/* Benchmark Test Cases Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-brand-400" />
            Ground-Truth Newsroom Benchmark Suite (3 / 3 Passed)
          </h2>
          <span className="text-xs text-slate-400 font-mono">Evaluation Model: GPT-4o-evaluator</span>
        </div>

        <div className="space-y-4">
          {testCases.map((tc) => (
            <div key={tc.id} className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      PASSED
                    </span>
                    <span className="text-xs font-mono text-slate-400">Case ID: {tc.id}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Query: "{tc.query}"
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-center">
                    <span className="block text-slate-400 text-[10px]">Precision</span>
                    <span className="font-bold text-emerald-400">{(tc.precision * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-400 text-[10px]">Recall</span>
                    <span className="font-bold text-purple-400">{(tc.recall * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-400 text-[10px]">Faithfulness</span>
                    <span className="font-bold text-brand-400">{(tc.faithfulness * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-surface-50/60 border border-slate-800">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                    Ground Truth Reference Answer:
                  </span>
                  <p className="text-slate-300 font-sans">{tc.expectedAnswer}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#090D14] border border-slate-800">
                  <span className="text-[10px] font-mono font-bold uppercase text-brand-400 block mb-1">
                    Generated RAG System Output:
                  </span>
                  <p className="text-slate-200 font-sans">{tc.actualAnswer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
