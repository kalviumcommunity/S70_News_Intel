import React from 'react';
import { ActivityItem } from '../../types';
import { Activity, Upload, Search, CheckCircle2, User } from 'lucide-react';

interface ActivityViewProps {
  activities: ActivityItem[];
}

export const ActivityView: React.FC<ActivityViewProps> = ({ activities }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">Activity</h1>
        <p className="text-sm text-ink-500 mt-0.5">
          Recent newsroom research events, document uploads, and indexing updates.
        </p>
      </div>

      {/* Stream List */}
      <div className="bg-panel border border-border rounded divide-y divide-border shadow-subtle overflow-hidden">
        {activities.map((act) => (
          <div key={act.id} className="p-4 flex items-center justify-between hover:bg-canvas transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gray-100 border border-gray-200 text-ink-700 flex items-center justify-center shrink-0">
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
                  <strong className="font-semibold">{act.user}</strong> {act.action}{' '}
                  <span className="font-semibold text-navy-800">{act.target}</span>
                </div>
                <div className="text-[11px] font-mono text-ink-400 mt-0.5">
                  Event ID: {act.id}
                </div>
              </div>
            </div>

            <span className="text-xs font-mono text-ink-500 bg-canvas px-2.5 py-1 rounded border border-border">
              {act.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
