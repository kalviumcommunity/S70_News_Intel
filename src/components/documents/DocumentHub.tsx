import React from 'react';
import { DocumentItem } from '../../types';
import { INITIAL_DOCUMENTS } from '../../mock/data';
import { IngestionPipeline } from './IngestionPipeline';
import { 
  FolderKanban, 
  UploadCloud, 
  FileText, 
  FileCheck2, 
  Trash2, 
  Search, 
  Filter, 
  Database, 
  Layers, 
  Tag, 
  Plus,
  Clock,
  Sparkles
} from 'lucide-react';

export const DocumentHub: React.FC = () => {
  const [documents, setDocuments] = React.useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTopic, setSelectedTopic] = React.useState('all');
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadingFileName, setUploadingFileName] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);

  const topics = ['all', 'Regulatory Policy', 'International Law', 'Investigative Journalism', 'Political Finance'];

  const handleSimulatedUpload = (fileName?: string) => {
    const name = fileName || 'Investigative_Financial_Audit_Q3_2026.pdf';
    setUploadingFileName(name);
    setIsUploading(true);
  };

  const handlePipelineComplete = () => {
    const newDoc: DocumentItem = {
      id: `doc-00${documents.length + 1}`,
      title: uploadingFileName,
      fileType: uploadingFileName.endsWith('.pdf') ? 'pdf' : uploadingFileName.endsWith('.docx') ? 'docx' : 'txt',
      sizeFormatted: '3.4 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      author: 'NewsIntel Staff',
      sourceOutlet: 'Uploaded Repository',
      status: 'Indexed',
      vectorChunksCount: 96,
      entityTags: ['Newly Ingested', 'RAG Vectorized', 'Q3-2026'],
      topic: 'Investigative Journalism'
    };
    setDocuments([newDoc, ...documents]);
    setIsUploading(false);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const filteredDocs = documents.filter((doc) => {
    if (selectedTopic !== 'all' && doc.topic !== selectedTopic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.author.toLowerCase().includes(q) ||
        doc.sourceOutlet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0B0F17] h-[calc(100vh-4rem)]">
      {/* Header Title Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-brand-400" />
            Document Ingestion & Knowledge Base Center
          </h1>
          <p className="text-xs text-slate-400">
            Upload PDF, DOCX, TXT, Markdown, and CSV files for automated chunking and vector embedding
          </p>
        </div>

        <button
          onClick={() => handleSimulatedUpload()}
          className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Sample Document</span>
        </button>
      </div>

      {/* Live Processing Pipeline Bar (if active) */}
      <IngestionPipeline
        fileName={uploadingFileName}
        isProcessing={isUploading}
        onComplete={handlePipelineComplete}
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleSimulatedUpload(e.dataTransfer.files[0].name);
          }
        }}
        className={`glass-panel p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
          dragOver
            ? 'border-brand-400 bg-brand-500/10 scale-[1.01]'
            : 'border-slate-700/80 hover:border-brand-500/50 hover:bg-surface-50/50'
        }`}
        onClick={() => handleSimulatedUpload()}
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto mb-3 text-brand-400">
          <UploadCloud className="w-6 h-6 animate-bounce" />
        </div>
        <h3 className="text-sm font-semibold text-slate-100">
          Drag & Drop articles, legal filings, or interview transcripts
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Supports <span className="text-slate-300 font-mono">PDF, DOCX, TXT, Markdown, CSV</span> (Max 100MB per document)
        </p>
      </div>

      {/* Document Library Controls */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 border-slate-800">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter ingested documents by title, author, or outlet..."
            className="w-full glass-input pl-9 pr-3 py-2 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Topic Filter:</span>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="glass-input px-3 py-1.5 rounded-lg text-xs text-slate-200"
          >
            {topics.map((t) => (
              <option key={t} value={t} className="bg-surface-100 text-slate-200">
                {t === 'all' ? 'All Topics' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-surface-50/60 text-slate-400 font-semibold font-mono uppercase text-[10px]">
              <th className="py-3 px-4">Document Title</th>
              <th className="py-3 px-4">Outlet & Author</th>
              <th className="py-3 px-4">Ingestion Status</th>
              <th className="py-3 px-4">Vector Chunks</th>
              <th className="py-3 px-4">Entity Tags</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-surface-50/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-100 border border-slate-700 flex items-center justify-center text-brand-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100 text-xs">{doc.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {doc.sizeFormatted} • {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-slate-300">
                  <div className="font-medium">{doc.sourceOutlet}</div>
                  <div className="text-[10px] text-slate-400">{doc.author}</div>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                    doc.status === 'Indexed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : doc.status === 'Cleaning'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-brand-500/10 text-brand-300 border border-brand-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Indexed' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                    {doc.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 font-mono text-slate-300">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-brand-400" />
                    {doc.vectorChunksCount} Chunks
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {doc.entityTags.map((tag, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-surface-100 text-slate-400 border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    title="Delete document from vector index"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
