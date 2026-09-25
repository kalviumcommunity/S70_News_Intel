import React, { useState } from 'react';
import { AuditRecord } from '../../types';
import { 
  ShieldCheck, 
  Files, 
  Search, 
  Users, 
  Database, 
  Sliders, 
  Cpu, 
  Activity, 
  Download, 
  Check, 
  Zap, 
  RefreshCw 
} from 'lucide-react';

interface AdminViewProps {
  auditLogs: AuditRecord[];
}

export const AdminView: React.FC<AdminViewProps> = ({ auditLogs: initialLogs }) => {
  const [filterText, setFilterText] = useState('');
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>(initialLogs);

  // RAG Engine settings
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.04);
  const [chunkSize, setChunkSize] = useState<number>(512);
  const [denseWeight, setDenseWeight] = useState<number>(75);
  const [savedSettings, setSavedSettings] = useState(false);

  const filteredLogs = auditLogs.filter((log) =>
    [log.user, log.action, log.document].some((val) =>
      val.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const metrics = [
    { label: 'Total Index Size', value: '4,820 Chunks', icon: Database, detail: 'BGE-M3 Dense Index' },
    { label: 'Active Documents', value: '1,284 Files', icon: Files, detail: '100% Status Indexed' },
    { label: 'Daily Query Volume', value: '348 Queries', icon: Search, detail: 'Avg latency 370ms' },
    { label: 'Active Analysts', value: '24 Users', icon: Users, detail: 'Role-Based Access On' },
  ];

  const handleSaveRAGSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  const handleExportAuditLogs = () => {
    const csvContent = 'LogID,User,Action,Document,Timestamp,Status\n' + 
      auditLogs.map(l => `${l.id},${l.user},${l.action},${l.document},${l.timestamp},${l.status}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NewsIntel_Audit_Logs_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-navy-800" />
            Admin & RAG Index Control Center
          </h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Vector store performance parameters, embedding models, and audit logs.
          </p>
        </div>

        <button
          onClick={handleExportAuditLogs}
          className="px-3.5 py-2 border border-border hover:bg-panel text-ink-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-subtle self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-panel p-4 border border-border rounded shadow-subtle space-y-2">
              <div className="flex items-center justify-between text-xs text-ink-500">
                <span>{m.label}</span>
                <Icon className="w-4 h-4 text-navy-800" />
              </div>
              <div className="text-xl font-bold font-mono text-ink-900">{m.value}</div>
              <div className="text-[11px] font-mono text-subtle-green">{m.detail}</div>
            </div>
          );
        })}
      </div>

      {/* RAG Engine Hyperparameter Configurator & Performance Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column (2/3 width) */}
        <form onSubmit={handleSaveRAGSettings} className="lg:col-span-2 bg-panel border border-border rounded p-5 space-y-5 shadow-subtle">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-navy-800" />
              <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider">
                Vector Retrieval Hyperparameters
              </h2>
            </div>
            {savedSettings && (
              <span className="px-2 py-0.5 text-xs font-semibold text-subtle-green bg-subtle-greenBg border border-subtle-green/40 rounded flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Index Parameters Applied!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Similarity Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-ink-700">Cosine Distance Cutoff</span>
                <span className="font-mono text-navy-800 font-bold">{similarityThreshold.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.10"
                step="0.005"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                className="w-full accent-navy-800 bg-canvas"
              />
              <p className="text-[11px] text-ink-500">Filters passages below vector similarity match threshold.</p>
            </div>

            {/* Hybrid Dense vs Sparse Weight */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-ink-700">Hybrid Search Ratio</span>
                <span className="font-mono text-navy-800 font-bold">{denseWeight}% Dense / {100 - denseWeight}% Sparse</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={denseWeight}
                onChange={(e) => setDenseWeight(parseInt(e.target.value, 10))}
                className="w-full accent-navy-800 bg-canvas"
              />
              <p className="text-[11px] text-ink-500">Balance vector semantic match vs BM25 keyword matching.</p>
            </div>

            {/* Chunk Window Size */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-700 block">
                Chunk Window Size
              </label>
              <select
                value={chunkSize}
                onChange={(e) => setChunkSize(parseInt(e.target.value, 10))}
                className="w-full bg-canvas border border-border rounded px-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800 font-mono"
              >
                <option value={256}>256 Tokens (Fine precision)</option>
                <option value={512}>512 Tokens (Recommended standard)</option>
                <option value={1024}>1024 Tokens (Broad context)</option>
              </select>
            </div>

            {/* Embedding Model */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-ink-700 block">
                Embedding Model Architecture
              </label>
              <select
                className="w-full bg-canvas border border-border rounded px-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800 font-mono"
              >
                <option value="bge-m3">BAAI / BGE-M3 (Multilingual 1024d)</option>
                <option value="openai-v3">OpenAI text-embedding-3-large</option>
                <option value="e5-large">intfloat / e5-large-v2</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-subtle"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Apply & Re-index Partition</span>
            </button>
          </div>
        </form>

        {/* Real-time System Benchmarks */}
        <div className="bg-panel border border-border rounded p-5 space-y-4 shadow-subtle">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Activity className="w-4 h-4 text-navy-800" />
            <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider">
              Latency Benchmarks
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-ink-700 mb-1">
                <span>Vector Search (Annoy/Faiss)</span>
                <span className="font-mono font-bold text-subtle-green">18 ms</span>
              </div>
              <div className="w-full h-1.5 bg-canvas rounded-full overflow-hidden">
                <div className="w-1/6 h-full bg-subtle-green"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-ink-700 mb-1">
                <span>Dense Embedding Gen</span>
                <span className="font-mono font-bold text-subtle-green">42 ms</span>
              </div>
              <div className="w-full h-1.5 bg-canvas rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-subtle-green"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-ink-700 mb-1">
                <span>LLM Briefing Synthesis</span>
                <span className="font-mono font-bold text-navy-800">310 ms</span>
              </div>
              <div className="w-full h-1.5 bg-canvas rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-navy-800"></div>
              </div>
            </div>

            <div className="pt-2 border-t border-border text-[11px] font-mono text-ink-500">
              Total End-to-End Latency: <strong className="text-ink-900">370 ms / query</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider">
            Enterprise Security Audit Records ({filteredLogs.length})
          </h2>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter audit logs by user or document..."
            className="w-full sm:w-64 px-3 py-1.5 bg-canvas border border-border rounded text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-navy-800"
          />
        </div>

        <div className="bg-panel border border-border rounded shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border text-ink-500 font-semibold font-mono uppercase text-[10px]">
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Document Reference</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-canvas transition-colors">
                  <td className="py-3 px-4 text-ink-400">{log.id}</td>
                  <td className="py-3 px-4 font-semibold text-ink-900 font-sans">{log.user}</td>
                  <td className="py-3 px-4 text-navy-800 font-semibold">{log.action}</td>
                  <td className="py-3 px-4 text-ink-700">{log.document}</td>
                  <td className="py-3 px-4 text-ink-500">{log.timestamp}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        log.status === 'Success'
                          ? 'bg-subtle-greenBg text-subtle-green border border-subtle-green/30'
                          : log.status === 'Denied'
                          ? 'bg-subtle-redBg text-subtle-red border border-subtle-red/30'
                          : 'bg-subtle-amberBg text-subtle-amber border border-subtle-amber/30'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
