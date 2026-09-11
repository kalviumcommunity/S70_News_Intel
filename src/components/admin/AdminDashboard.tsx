import React from 'react';
import { UserRole, AuditLog } from '../../types';
import { INITIAL_AUDIT_LOGS } from '../../mock/data';
import { 
  ShieldCheck, 
  Database, 
  Activity, 
  HardDrive, 
  Zap, 
  Search, 
  Lock, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  FileText
} from 'lucide-react';

interface AdminDashboardProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentRole, onRoleChange }) => {
  const [auditLogs, setAuditLogs] = React.useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [logFilter, setLogFilter] = React.useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(logFilter.toLowerCase()) ||
      log.action.toLowerCase().includes(logFilter.toLowerCase()) ||
      log.details.toLowerCase().includes(logFilter.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0F17] h-[calc(100vh-4rem)]">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            Admin Control Center & Audit Logging
          </h1>
          <p className="text-xs text-slate-400">
            RBAC permission policies, vector store health, and security audit log monitoring
          </p>
        </div>

        {/* Current Perspective Role Switcher Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100 border border-slate-700">
          <span className="text-xs text-slate-400">Active Role:</span>
          <span className="text-xs font-bold text-brand-300">{currentRole}</span>
        </div>
      </div>

      {/* Infrastructure System Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Vector Store Embeddings</span>
            <Database className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">1,482 Chunks</div>
          <span className="text-[10px] text-emerald-400 font-mono">pgvector HNSW Index • 1536d</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Redis Semantic Cache</span>
            <Zap className="w-4 h-4 text-accent-purple" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">89.4% Hit Rate</div>
          <span className="text-[10px] text-purple-400 font-mono">Sub-10ms response on cached queries</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Hybrid Query Latency (P95)</span>
            <Activity className="w-4 h-4 text-accent-emerald" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">142 ms</div>
          <span className="text-[10px] text-emerald-400 font-mono">Dense + BM25 Reranked</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Storage Capacity</span>
            <HardDrive className="w-4 h-4 text-accent-amber" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-100">21.3 / 500 GB</div>
          <span className="text-[10px] text-amber-400 font-mono">PostgreSQL 16 + Blob Storage</span>
        </div>
      </div>

      {/* RBAC Privilege Matrix Card */}
      <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-400" />
          Role-Based Access Control (RBAC) Permissions Matrix
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className={`p-3.5 rounded-xl border transition-all ${
            currentRole === 'Journalist' ? 'bg-brand-500/10 border-brand-500/40 ring-1 ring-brand-500/30' : 'bg-surface-50/50 border-slate-800'
          }`}>
            <div className="font-semibold text-slate-200 mb-1">Journalist Role</div>
            <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
              <li>Execute Hybrid RAG Search</li>
              <li>Multi-turn AI Research Chat</li>
              <li>View Evidence Citations</li>
              <li className="text-slate-400 line-through">Direct Vector DB Admin Access</li>
            </ul>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all ${
            currentRole === 'Senior Editor' ? 'bg-purple-500/10 border-purple-500/40 ring-1 ring-purple-500/30' : 'bg-surface-50/50 border-slate-800'
          }`}>
            <div className="font-semibold text-slate-200 mb-1">Senior Editor Role</div>
            <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
              <li>All Journalist Privileges</li>
              <li>Upload & Ingest Confidential Documents</li>
              <li>Export Briefing PDF Reports</li>
              <li>Approve Unredacted Transcripts</li>
            </ul>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all ${
            currentRole === 'System Admin' ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/30' : 'bg-surface-50/50 border-slate-800'
          }`}>
            <div className="font-semibold text-slate-200 mb-1">System Admin Role</div>
            <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
              <li>Full System Superuser Access</li>
              <li>Manage Vector Store & Index Rebuilding</li>
              <li>Inspect Complete Security Audit Logs</li>
              <li>Manage User Accounts & API Keys</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Audit Logs Table Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-400" />
            Security & Audit Activity Logs
          </h2>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              placeholder="Search audit trail..."
              className="w-full glass-input pl-8 pr-3 py-1 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-surface-50/60 text-slate-400 font-semibold font-mono uppercase text-[10px]">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">{log.user}</div>
                    <span className="text-[9px] font-mono text-slate-400">{log.role}</span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-[10px] text-brand-300">
                    {log.action}
                  </td>

                  <td className="py-3 px-4 text-slate-300 max-w-sm truncate">
                    {log.details}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {log.ipAddress}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      log.status === 'SUCCESS'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {log.status === 'SUCCESS' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-400" />
                      )}
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
