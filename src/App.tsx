import React from 'react';
import { NavigationPage, DocumentItem, ResearchAnswer, CollectionItem, SavedSession, ActivityItem, AuditRecord } from './types';
import { 
  MOCK_DOCUMENTS, 
  DEFAULT_RESEARCH_ANSWER, 
  MOCK_COLLECTIONS, 
  MOCK_SAVED_SESSIONS, 
  MOCK_ACTIVITY, 
  MOCK_AUDIT_LOGS 
} from './mock/data';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

import { ResearchLanding } from './components/research/ResearchLanding';
import { ResearchResults } from './components/research/ResearchResults';
import { DocumentList } from './components/documents/DocumentList';
import { UploadModal } from './components/documents/UploadModal';
import { DocumentViewer } from './components/documents/DocumentViewer';
import { CollectionsView } from './components/collections/CollectionsView';
import { SavedResearchView } from './components/saved/SavedResearchView';
import { ActivityView } from './components/activity/ActivityView';
import { AdminView } from './components/admin/AdminView';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<NavigationPage>('research');
  const [documents, setDocuments] = React.useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = React.useState<string>('doc-1');
  const [currentAnswer, setCurrentAnswer] = React.useState<ResearchAnswer>(DEFAULT_RESEARCH_ANSWER);

  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = React.useState(false);

  const [savedSessions, setSavedSessions] = React.useState<SavedSession[]>(MOCK_SAVED_SESSIONS);
  const [activities, setActivities] = React.useState<ActivityItem[]>(MOCK_ACTIVITY);

  // Keyboard shortcut ⌘K for Global Search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAskQuestion = (question: string) => {
    const newAnswer: ResearchAnswer = {
      ...DEFAULT_RESEARCH_ANSWER,
      question: question,
    };
    setCurrentAnswer(newAnswer);
    setCurrentPage('results');

    // Add to activity stream
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Ashik',
      action: 'executed research query',
      target: `"${question}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities([newActivity, ...activities]);
  };

  const handleOpenDocument = (docId: string) => {
    setSelectedDocId(docId);
    setCurrentPage('doc-viewer');
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter((d) => d.id !== docId));
  };

  const handleUploadSuccess = (filename: string, fileType: any) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: filename,
      type: fileType,
      pages: 14,
      size: '2.4 MB',
      uploadedDate: 'Sep 11, 2026',
      status: 'Indexed',
      topics: ['Transport', 'Infrastructure'],
      entities: ['Ministry of Transport'],
      uploadedBy: 'Ashik',
      content: `DOCUMENT TEXT: ${filename}\n\nIngested content processed by NewsIntel Enterprise RAG vector index. All passages are indexed and available for semantic verification.`
    };
    setDocuments([newDoc, ...documents]);

    // Add to activity stream
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: 'Ashik',
      action: 'uploaded',
      target: filename,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities([newAct, ...activities]);
  };

  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  return (
    <div className="flex h-screen bg-canvas text-ink-900 overflow-hidden font-sans select-none">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        documentCount={documents.length}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header
          onOpenGlobalSearch={() => setIsGlobalSearchOpen(true)}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {currentPage === 'research' && (
            <ResearchLanding onAskQuestion={handleAskQuestion} />
          )}

          {currentPage === 'results' && (
            <ResearchResults
              answerData={currentAnswer}
              onAskNewQuestion={handleAskQuestion}
              onOpenDocument={handleOpenDocument}
              onBackToSearch={() => setCurrentPage('research')}
            />
          )}

          {currentPage === 'documents' && (
            <DocumentList
              documents={documents}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenDocument={handleOpenDocument}
              onDeleteDocument={handleDeleteDocument}
            />
          )}

          {currentPage === 'doc-viewer' && activeDoc && (
            <DocumentViewer
              document={activeDoc}
              onBack={() => setCurrentPage('documents')}
              onAskAboutDoc={handleAskQuestion}
            />
          )}

          {currentPage === 'collections' && (
            <CollectionsView
              collections={MOCK_COLLECTIONS}
              onSelectCollection={(title) => {
                setCurrentPage('documents');
              }}
            />
          )}

          {currentPage === 'saved' && (
            <SavedResearchView
              sessions={savedSessions}
              onOpenSession={(question) => handleAskQuestion(question)}
            />
          )}

          {currentPage === 'activity' && (
            <ActivityView activities={activities} />
          )}

          {currentPage === 'admin' && (
            <AdminView auditLogs={MOCK_AUDIT_LOGS} />
          )}
        </main>
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        documents={documents}
        onSelectDocument={handleOpenDocument}
        onExecuteSearch={handleAskQuestion}
      />
    </div>
  );
};
export default App;
