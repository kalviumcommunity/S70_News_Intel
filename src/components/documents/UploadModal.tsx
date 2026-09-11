import React from 'react';
import { FileType } from '../../types';
import { Upload, X, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (filename: string, fileType: FileType) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [uploadingFiles, setUploadingFiles] = React.useState<
    { name: string; type: FileType; size: string; progress: number; status: 'uploading' | 'indexing' | 'success' }[]
  >([]);

  if (!isOpen) return null;

  const handleSimulateDrop = (fileName?: string, type?: FileType) => {
    const name = fileName || 'Infrastructure_Audit_Report_2026.pdf';
    const fType = type || 'pdf';

    const newFile = {
      name,
      type: fType,
      size: '2.4 MB',
      progress: 20,
      status: 'uploading' as const,
    };

    setUploadingFiles((prev) => [...prev, newFile]);

    // Progress timer simulation
    setTimeout(() => {
      setUploadingFiles((prev) =>
        prev.map((f) => (f.name === name ? { ...f, progress: 70, status: 'indexing' } : f))
      );
    }, 1000);

    setTimeout(() => {
      setUploadingFiles((prev) =>
        prev.map((f) => (f.name === name ? { ...f, progress: 100, status: 'success' } : f))
      );
      onUploadSuccess(name, fType);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-panel w-full max-w-lg rounded-md border border-border shadow-lg overflow-hidden space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-navy-800" />
            <h3 className="font-bold text-base text-ink-900">Upload documents</h3>
          </div>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onClick={() => handleSimulateDrop()}
          className="border-2 border-dashed border-border hover:border-navy-800 rounded-md p-8 text-center bg-canvas cursor-pointer transition-colors space-y-2"
        >
          <Upload className="w-8 h-8 text-ink-400 mx-auto" />
          <div className="text-sm font-semibold text-ink-900">
            Drop files here or browse
          </div>
          <p className="text-xs text-ink-500">
            Supported formats: PDF, DOCX, TXT, Markdown, CSV
          </p>
        </div>

        {/* Uploading Files List */}
        {uploadingFiles.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
              Upload Progress
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uploadingFiles.map((f, i) => (
                <div key={i} className="p-3 border border-border rounded bg-panel space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-navy-800" />
                      <span className="font-semibold text-ink-900">{f.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-ink-500">{f.size}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        f.status === 'success' ? 'bg-subtle-green' : 'bg-navy-800'
                      }`}
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-ink-500">
                    <span className="capitalize">{f.status}...</span>
                    {f.status === 'success' ? (
                      <span className="text-subtle-green font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Document indexed successfully
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-navy-800">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {f.progress}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-ink-700 text-xs font-medium rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
