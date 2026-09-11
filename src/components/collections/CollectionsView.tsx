import React from 'react';
import { CollectionItem } from '../../types';
import { Folder, Files, ArrowRight, Plus } from 'lucide-react';

interface CollectionsViewProps {
  collections: CollectionItem[];
  onSelectCollection: (title: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections,
  onSelectCollection,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Collections</h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Organize documents by investigation or topic.
          </p>
        </div>

        <button
          onClick={() => alert('Create new research collection folder.')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded shadow-subtle transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Grid of Compact Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col.title)}
            className="p-4 bg-panel border border-border rounded hover:border-navy-800/40 cursor-pointer transition-colors space-y-3 group shadow-subtle"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-navy-50 text-navy-800 flex items-center justify-center font-bold">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-ink-900 group-hover:text-navy-800">
                    {col.title}
                  </h3>
                  <div className="text-xs text-ink-500 flex items-center gap-1 mt-0.5 font-mono">
                    <Files className="w-3 h-3 text-ink-400" />
                    <span>{col.documentCount} documents</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-ink-400 font-mono">Updated {col.updatedDate}</span>
            </div>

            <p className="text-xs text-ink-500 leading-relaxed">
              {col.description}
            </p>

            <div className="flex items-center justify-end text-xs font-semibold text-navy-800 group-hover:underline pt-1">
              <span>View documents</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
