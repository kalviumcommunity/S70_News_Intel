import React from 'react';
import { CollectionItem } from '../../types';
import { Folder, Files, ArrowRight, Plus, Search, X, Check, Sparkles, Trash2, Edit2 } from 'lucide-react';

interface CollectionsViewProps {
  collections: CollectionItem[];
  onSelectCollection: (title: string) => void;
  onAskCollectionQuery?: (collectionTitle: string, query: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections: initialCollections,
  onSelectCollection,
  onAskCollectionQuery,
}) => {
  const [collectionsList, setCollectionsList] = React.useState<CollectionItem[]>(initialCollections);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedCol, setSelectedCol] = React.useState<CollectionItem | null>(null);
  const [collectionQuery, setCollectionQuery] = React.useState('');

  // Form states
  const [newTitle, setNewTitle] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');

  const filteredCollections = collectionsList.filter((col) =>
    col.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: CollectionItem = {
      id: `col-${Date.now()}`,
      title: newTitle.trim(),
      documentCount: Math.floor(Math.random() * 10) + 2,
      updatedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: newDesc.trim() || 'Custom intelligence document collection.',
    };

    setCollectionsList([newItem, ...collectionsList]);
    setNewTitle('');
    setNewDesc('');
    setIsCreateModalOpen(false);
  };

  const handleDeleteCollection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollectionsList(collectionsList.filter((c) => c.id !== id));
    if (selectedCol?.id === id) setSelectedCol(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Research Collections</h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Organize archive documents by investigation topic or case file.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-ink-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-panel border border-border rounded pl-8 pr-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-navy-800 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded shadow-subtle transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Collection</span>
          </button>
        </div>
      </div>

      {/* Grid of Collection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCollections.map((col) => (
          <div
            key={col.id}
            onClick={() => setSelectedCol(col)}
            className={`p-5 bg-panel border rounded cursor-pointer transition-all space-y-3 group shadow-subtle ${
              selectedCol?.id === col.id ? 'border-navy-800 ring-1 ring-navy-800/40' : 'border-border hover:border-ink-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-navy-800/20 text-navy-800 flex items-center justify-center font-bold border border-navy-800/30">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-ink-900 group-hover:text-navy-800 flex items-center gap-2">
                    {col.title}
                  </h3>
                  <div className="text-xs text-ink-500 flex items-center gap-1.5 mt-0.5 font-mono">
                    <Files className="w-3 h-3 text-ink-400" />
                    <span>{col.documentCount} documents</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-ink-400 font-mono">{col.updatedDate}</span>
                <button
                  onClick={(e) => handleDeleteCollection(col.id, e)}
                  className="p-1 rounded text-ink-400 hover:text-subtle-red hover:bg-canvas transition-colors"
                  title="Delete collection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-ink-500 leading-relaxed line-clamp-2">
              {col.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs font-semibold">
              <span className="text-[11px] font-mono text-navy-800 bg-navy-800/10 px-2 py-0.5 rounded border border-navy-800/20">
                Vector Index Ready
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCollection(col.title);
                }}
                className="text-navy-800 group-hover:underline flex items-center gap-1"
              >
                <span>Browse documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Collection Quick RAG Drawer / Details Modal */}
      {selectedCol && (
        <div className="p-5 bg-panel border border-navy-800/50 rounded-lg shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-navy-800" />
              <h3 className="font-bold text-sm text-ink-900">
                Scoped Collection RAG Query — "{selectedCol.title}"
              </h3>
            </div>
            <button
              onClick={() => setSelectedCol(null)}
              className="text-ink-400 hover:text-ink-900 text-xs"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-ink-500">
            Limit RAG vector retrieval exclusively to the <strong className="text-ink-900">{selectedCol.documentCount} documents</strong> indexed inside this collection.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Ask a question limited to "${selectedCol.title}" collection...`}
              value={collectionQuery}
              onChange={(e) => setCollectionQuery(e.target.value)}
              className="flex-1 bg-canvas border border-border rounded px-3 py-2 text-xs text-ink-900 focus:outline-none focus:border-navy-800"
            />
            <button
              onClick={() => {
                if (collectionQuery.trim() && onAskCollectionQuery) {
                  onAskCollectionQuery(selectedCol.title, collectionQuery.trim());
                } else {
                  onSelectCollection(selectedCol.title);
                }
              }}
              className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded shrink-0 shadow-subtle"
            >
              Run Collection RAG Query
            </button>
          </div>
        </div>
      )}

      {/* Create New Collection Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateCollection}
            className="bg-panel border border-border rounded-lg shadow-card w-full max-w-md overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center justify-between bg-canvas">
              <h3 className="font-bold text-sm text-ink-900">Create New Collection</h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-ink-400 hover:text-ink-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">
                  Collection Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Northern Railway Safety Audit 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-canvas border border-border rounded px-3 py-2 text-xs text-ink-900 focus:outline-none focus:border-navy-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider">
                  Description / Investigation Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the research objective or document types in this folder..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-canvas border border-border rounded px-3 py-2 text-xs text-ink-900 focus:outline-none focus:border-navy-800"
                />
              </div>
            </div>

            <div className="p-4 border-t border-border bg-canvas flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-3.5 py-1.5 border border-border text-ink-500 hover:text-ink-900 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold rounded shadow-subtle"
              >
                Create Collection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
