import React from 'react';
import { DocumentItem, FileType } from '../../types';
import { FileText, Upload, Search, Filter, Trash2, Eye, ExternalLink } from 'lucide-react';

interface DocumentListProps {
  documents: DocumentItem[];
  onOpenUpload: () => void;
  onOpenDocument: (docId: string) => void;
  onDeleteDocument: (docId: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onOpenUpload,
  onOpenDocument,
  onDeleteDocument,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedFormat, setSelectedFormat] = React.useState<string>('all');

  const formats = ['all', 'pdf', 'docx', 'txt', 'csv', 'md'];

  const filteredDocs = documents.filter((doc) => {
    if (selectedFormat !== 'all' && doc.type !== selectedFormat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.topics.some((t) => t.toLowerCase().includes(q)) ||
        doc.uploadedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Documents</h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Manage and search your research archive.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded text-xs font-semibold shadow-subtle transition-colors self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload documents</span>
        </button>
      </div>

      {/* Search & Format Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-panel p-3 border border-border rounded shadow-subtle">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-3 py-1.5 bg-canvas border border-border rounded text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-navy-800"
          />
        </div>

        {/* Format Filter Pills */}
        <div className="flex items-center gap-1 text-xs self-start sm:self-auto">
          <span className="text-ink-500 mr-1 font-medium">Format:</span>
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-2.5 py-1 rounded text-xs font-mono uppercase font-medium transition-colors ${
                selectedFormat === fmt
                  ? 'bg-navy-800 text-white'
                  : 'bg-canvas text-ink-600 hover:bg-gray-200 border border-border'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-panel border border-border rounded overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-canvas border-b border-border text-ink-500 font-semibold font-mono uppercase text-[10px]">
              <th className="py-3 px-4">Document</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Topics</th>
              <th className="py-3 px-4">Uploaded</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredDocs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-ink-500 text-xs">
                  No documents found matching filters.
                </td>
              </tr>
            ) : (
              filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-canvas transition-colors group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-navy-800 shrink-0" />
                      <div>
                        <button
                          onClick={() => onOpenDocument(doc.id)}
                          className="font-semibold text-ink-900 hover:text-navy-800 text-left block hover:underline"
                        >
                          {doc.name}
                        </button>
                        <span className="text-[11px] font-mono text-ink-400">
                          {doc.pages} pages • {doc.size}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono uppercase text-ink-600">
                    {doc.type}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {doc.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-ink-600 border border-gray-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-ink-500 font-mono text-[11px]">
                    <div>{doc.uploadedDate}</div>
                    <div className="text-[10px] text-ink-400">by {doc.uploadedBy}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        doc.status === 'Indexed'
                          ? 'bg-subtle-greenBg text-subtle-green border border-subtle-green/30'
                          : doc.status === 'Processing'
                          ? 'bg-subtle-amberBg text-subtle-amber border border-subtle-amber/30'
                          : 'bg-subtle-redBg text-subtle-red border border-subtle-red/30'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => onOpenDocument(doc.id)}
                      className="p-1 text-ink-500 hover:text-navy-800 transition-colors"
                      title="Open Document Reader"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="p-1 text-ink-400 hover:text-subtle-red transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
