import React from 'react';
import { ActivityItem } from '../../types';
import { Activity, Upload, Search, CheckCircle2, User, Filter, Trash2 } from 'lucide-react';

interface ActivityViewProps {
  activities: ActivityItem[];
}

export const ActivityView: React.FC<ActivityViewProps> = ({ activities: initialActivities }) => {
  const [activitiesList, setActivitiesList] = React.useState<ActivityItem[]>(initialActivities);
  const [userFilter, setUserFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const users = ['all', ...Array.from(new Set(activitiesList.map(a => a.user)))];

  const filteredActivities = activitiesList.filter((act) => {
    const matchesUser = userFilter === 'all' || act.user === userFilter;
    const matchesSearch = 
      act.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUser && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-navy-800" />
            Team Activity Stream
          </h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Real-time newsroom research events, document uploads, and vector index events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-panel border border-border rounded pl-8 pr-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800 w-36 sm:w-48"
            />
          </div>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="bg-panel border border-border rounded px-2.5 py-1.5 text-xs text-ink-700 focus:outline-none focus:border-navy-800"
          >
            {users.map(u => (
              <option key={u} value={u}>{u === 'all' ? 'All Team Members' : u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stream List */}
      {filteredActivities.length === 0 ? (
        <div className="p-8 text-center text-xs text-ink-500 bg-panel border border-border rounded">
          No activity records match your filter criteria.
        </div>
      ) : (
        <div className="bg-panel border border-border rounded divide-y divide-border shadow-subtle overflow-hidden">
          {filteredActivities.map((act) => (
            <div key={act.id} className="p-4 flex items-center justify-between hover:bg-canvas transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-canvas border border-border text-navy-800 flex items-center justify-center shrink-0">
                  {act.action.includes('uploaded') ? (
                    <Upload className="w-4 h-4 text-navy-800" />
                  ) : act.action.includes('query') ? (
                    <Search className="w-4 h-4 text-navy-800" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-subtle-green" />
                  )}
                </div>

                <div>
                  <div className="text-xs text-ink-900 font-medium">
                    <strong className="font-semibold text-ink-900">{act.user}</strong>{' '}
                    <span className="text-ink-500">{act.action}</span>{' '}
                    <span className="font-semibold text-navy-800">{act.target}</span>
                  </div>
                  <div className="text-[11px] font-mono text-ink-400 mt-0.5">
                    Event Log ID: {act.id}
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono text-ink-500 bg-canvas px-2.5 py-1 rounded border border-border">
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
