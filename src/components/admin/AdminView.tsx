import React from 'react';
import { AuditRecord } from '../../types';
import { ShieldCheck, Files, Search, Users, Database, FileText } from 'lucide-react';

interface AdminViewProps {
  auditLogs: AuditRecord[];
}

export const AdminView: React.FC<AdminViewProps> = ({ auditLogs }) => {
  const [filterText, setFilterText] = React.useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(filterText.toLowerCase()) ||
      log.action.toLowerCase().includes(filterText.toLowerCase()) ||
      log.document.toLowerCase().includes(filterText.toLowerCase())
  );

  const metrics = [
    { label: 'Documents', value: '1,284', icon: Files },
    { label: 'Research Sessions', value: '348', icon: Search },
    { label: 'Active Users', value: '24', icon: Users },
    { label: 'Indexed Documents', value: '1,241', icon: Database },
  ];

  const recentActivity = [
    { user: 'Ashik', action: 'Uploaded', document: 'Railway Investigation Report 2025', time: '10:32 AM' },
    { user: 'Saideep', action: 'Searched', document: 'Transport Archive March 2025', time: '10:18 AM' },
    { user: 'Shreeya', action: 'Indexed', document: 'Transport Minister Interview', time: '09:54 AM' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-navy-800" />
          Admin Dashboard
        </h1>
        <p className="text-sm text-ink-500 mt-0.5">
          Enterprise repository metrics, recent team actions, and security audit logs.
        </p>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-panel p-4 border border-border rounded shadow-subtle space-y-1">
              <div className="flex items-center justify-between text-xs text-ink-500">
                <span>{m.label}</span>
                <Icon className="w-4 h-4 text-navy-800" />
              </div>
              <div className="text-2xl font-bold font-mono text-ink-900">{m.value}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider">
          Recent Activity
        </h2>

        <div className="bg-panel border border-border rounded shadow-subtle overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-border text-ink-500 font-semibold font-mono uppercase text-[10px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentActivity.map((act, i) => (
                <tr key={i} className="hover:bg-canvas transition-colors">
                  <td className="py-3 px-4 font-semibold text-ink-900">{act.user}</td>
                  <td className="py-3 px-4 text-ink-700">{act.action}</td>
                  <td className="py-3 px-4 font-mono text-ink-700">{act.document}</td>
                  <td className="py-3 px-4 text-right font-mono text-ink-500">{act.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Searchable Audit Log */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wider">
            Audit Log
          </h2>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter audit records..."
              className="w-full px-3 py-1.5 bg-canvas border border-border rounded text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-navy-800"
            />
          </div>
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
                          : 'bg-subtle-redBg text-subtle-red border border-subtle-red/30'
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
