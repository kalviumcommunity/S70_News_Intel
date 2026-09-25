import React from 'react';
import { DocumentItem } from '../../types';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  MessageSquare, 
  Send, 
  Tag, 
  Building, 
  Layers, 
  Check, 
  Copy, 
  Plus, 
  X,
  FileText,
  Cpu
} from 'lucide-react';

interface DocumentViewerProps {
  document: DocumentItem;
  onBack: () => void;
  onAskAboutDoc: (question: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document: initialDoc,
  onBack,
  onAskAboutDoc,
}) => {
  const [docData, setDocData] = React.useState<DocumentItem>(initialDoc);
  const [docQuestion, setDocQuestion] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<'reader' | 'chunks'>('reader');
  const [copied, setCopied] = React.useState(false);

  // New tag inputs
  const [newTopic, setNewTopic] = React.useState('');
  const [newEntity, setNewEntity] = React.useState('');
  const [showAddTopic, setShowAddTopic] = React.useState(false);
  const [showAddEntity, setShowAddEntity] = React.useState(false);

  const handleDocQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docQuestion.trim()) {
      onAskAboutDoc(`Regarding ${docData.name}: ${docQuestion.trim()}`);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(docData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportFile = () => {
    const blob = new Blob([docData.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const linkEl = window.document.createElement('a');
    linkEl.href = url;
    linkEl.download = docData.name;
    window.document.body.appendChild(linkEl);
    linkEl.click();
    window.document.body.removeChild(linkEl);
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim() && !docData.topics.includes(newTopic.trim())) {
      setDocData({
        ...docData,
        topics: [...docData.topics, newTopic.trim()],
      });
      setNewTopic('');
      setShowAddTopic(false);
    }
  };

  const handleAddEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntity.trim() && !docData.entities.includes(newEntity.trim())) {
      setDocData({
        ...docData,
        entities: [...docData.entities, newEntity.trim()],
      });
      setNewEntity('');
      setShowAddEntity(false);
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setDocData({
      ...docData,
      topics: docData.topics.filter((t) => t !== topic),
    });
  };

  const handleRemoveEntity = (entity: string) => {
    setDocData({
      ...docData,
      entities: docData.entities.filter((e) => e !== entity),
    });
  };

  // Mock chunk splitting
  const documentChunks = React.useMemo(() => {
    const paragraphs = docData.content.split('\n\n').filter(Boolean);
    return paragraphs.map((p, idx) => ({
      chunkId: `${docData.id}-chk-00${idx + 1}`,
      tokens: p.split(' ').length * 2,
      content: p,
      similarity: (0.98 - idx * 0.04).toFixed(3),
    }));
  }, [docData]);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-canvas">
      {/* Main Document Reading Column */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl">
        {/* Top Controls & Navigation */}
        <div className="space-y-4 border-b border-border pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-navy-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Documents</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink-900">
                {docData.name}
              </h1>
              <p className="text-xs text-ink-500 font-mono mt-1">
                {docData.type.toUpperCase()} · {docData.pages} pages · {docData.size} · Uploaded {docData.uploadedDate} by {docData.uploadedBy}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 border border-border hover:bg-panel text-ink-700 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-subtle-green" /> : <Copy className="w-3.5 h-3.5 text-ink-500" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleExportFile}
                className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-subtle"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export File</span>
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                activeTab === 'reader'
                  ? 'border-navy-800 bg-navy-800/10 text-ink-900'
                  : 'border-border bg-canvas text-ink-500 hover:border-ink-400'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Document Reader</span>
            </button>

            <button
              onClick={() => setActiveTab('chunks')}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                activeTab === 'chunks'
                  ? 'border-navy-800 bg-navy-800/10 text-ink-900'
                  : 'border-border bg-canvas text-ink-500 hover:border-ink-400'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-navy-800" />
              <span>Vector Chunk Inspector ({documentChunks.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'reader' ? (
          <article className="bg-panel p-8 border border-border rounded shadow-subtle space-y-4">
            <div className="prose prose-slate max-w-none text-sm text-ink-900 leading-relaxed font-sans whitespace-pre-wrap">
              {docData.content}
            </div>
          </article>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-panel border border-border rounded text-xs text-ink-500 flex items-center justify-between">
              <span>Vector Index Partitioning: BGE-M3 Dense Chunks (512 token windows)</span>
              <span className="font-mono text-navy-800 font-bold">{documentChunks.length} Chunks Active</span>
            </div>

            {documentChunks.map((chk, i) => (
              <div key={i} className="p-4 bg-panel border border-border rounded space-y-2">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-mono text-xs font-bold text-navy-800">{chk.chunkId}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-ink-400">{chk.tokens} tokens</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-subtle-greenBg text-subtle-green rounded border border-subtle-green/40">
                      Similarity: {chk.similarity}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-ink-700 leading-relaxed font-mono whitespace-pre-wrap">
                  {chk.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Document Info Panel */}
      <aside className="w-full md:w-80 shrink-0 bg-panel border-l border-border flex flex-col h-full sticky top-0 justify-between">
        <div className="p-6 space-y-6 overflow-y-auto">
          <h3 className="font-bold text-sm text-ink-900 border-b border-border pb-3 uppercase tracking-wider">
            Document Metadata
          </h3>

          {/* Topics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-ink-500 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-navy-800" />
                Topics
              </div>
              <button
                onClick={() => setShowAddTopic(!showAddTopic)}
                className="text-xs text-navy-800 hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            {showAddTopic && (
              <form onSubmit={handleAddTopic} className="flex gap-1">
                <input
                  type="text"
                  placeholder="New topic..."
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="flex-1 px-2 py-1 bg-canvas border border-border rounded text-xs text-ink-900 focus:outline-none focus:border-navy-800"
                />
                <button type="submit" className="px-2 py-1 bg-navy-800 text-white rounded text-xs font-semibold">
                  Add
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-1.5">
              {docData.topics.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs bg-canvas text-ink-700 border border-border flex items-center gap-1"
                >
                  <span>{t}</span>
                  <button onClick={() => handleRemoveTopic(t)} className="text-ink-400 hover:text-subtle-red">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Entities */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-ink-500 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-navy-800" />
                Extracted Entities
              </div>
              <button
                onClick={() => setShowAddEntity(!showAddEntity)}
                className="text-xs text-navy-800 hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            {showAddEntity && (
              <form onSubmit={handleAddEntity} className="flex gap-1">
                <input
                  type="text"
                  placeholder="New entity..."
                  value={newEntity}
                  onChange={(e) => setNewEntity(e.target.value)}
                  className="flex-1 px-2 py-1 bg-canvas border border-border rounded text-xs text-ink-900 focus:outline-none focus:border-navy-800"
                />
                <button type="submit" className="px-2 py-1 bg-navy-800 text-white rounded text-xs font-semibold">
                  Add
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-1.5">
              {docData.entities.map((e, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-navy-800/10 text-navy-800 border border-navy-800/20 flex items-center gap-1"
                >
                  <span>{e}</span>
                  <button onClick={() => handleRemoveEntity(e)} className="text-ink-400 hover:text-subtle-red">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Metadata Fields */}
          <div className="space-y-2 pt-2 border-t border-border text-xs text-ink-700">
            <div className="flex justify-between">
              <span className="text-ink-500">Pages:</span>
              <span className="font-mono font-semibold text-ink-900">{docData.pages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">File Size:</span>
              <span className="font-mono font-semibold text-ink-900">{docData.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">Uploaded By:</span>
              <span className="font-mono font-semibold text-ink-900">{docData.uploadedBy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-ink-500">Indexing Status:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-subtle-greenBg text-subtle-green border border-subtle-green/30">
                {docData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Document Question Input */}
        <div className="p-4 border-t border-border bg-canvas space-y-2">
          <div className="text-xs font-semibold text-ink-700 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-navy-800" />
            Ask about this document
          </div>
          <form onSubmit={handleDocQuestionSubmit} className="flex gap-1.5">
            <input
              type="text"
              value={docQuestion}
              onChange={(e) => setDocQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-1.5 bg-panel border border-border rounded text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-navy-800"
            />
            <button
              type="submit"
              disabled={!docQuestion.trim()}
              className="p-1.5 bg-navy-800 hover:bg-navy-700 text-white rounded disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
};
