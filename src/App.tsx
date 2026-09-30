import React from 'react';
import { NavigationPage, DocumentItem, ResearchAnswer, CollectionItem, SavedSession, ActivityItem, AuditRecord, User } from './types';
import { 
  MOCK_DOCUMENTS, 
  DEFAULT_RESEARCH_ANSWER, 
  MOCK_COLLECTIONS, 
  MOCK_SAVED_SESSIONS, 
  MOCK_ACTIVITY, 
  MOCK_AUDIT_LOGS,
  DEFAULT_USER 
} from './mock/data';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { SettingsModal } from './components/layout/SettingsModal';
import { ToastContainer, ToastMessage } from './components/layout/Toast';
import { AuthModal } from './components/auth/AuthModal';

import { LandingPage } from './components/landing/LandingPage';
import { ResearchLanding } from './components/research/ResearchLanding';
import { ResearchResults } from './components/research/ResearchResults';
import { RagStreamModal } from './components/research/RagStreamModal';
import { DocumentList } from './components/documents/DocumentList';
import { UploadModal } from './components/documents/UploadModal';
import { DocumentViewer } from './components/documents/DocumentViewer';
import { CollectionsView } from './components/collections/CollectionsView';
import { SavedResearchView } from './components/saved/SavedResearchView';
import { ActivityView } from './components/activity/ActivityView';
import { AdminView } from './components/admin/AdminView';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<NavigationPage>('landing');
  const [documents, setDocuments] = React.useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = React.useState<string>('doc-1');
  const [currentAnswer, setCurrentAnswer] = React.useState<ResearchAnswer>(DEFAULT_RESEARCH_ANSWER);

  // Auth User State with localStorage persistence
  const [currentUser, setCurrentUser] = React.useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('newsintel_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored user:', e);
    }
    return DEFAULT_USER;
  });

  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');

  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  // Toast Notifications
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Action Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('newsintel_user', JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user session:', e);
    }
    addToast('success', `Welcome back, ${user.name}!`, `Authenticated as ${user.role} (${user.email}).`);

    // Log Activity
    const loginAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: user.name,
      action: 'authenticated session',
      target: 'Enterprise RAG Workspace',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities((prev) => [loginAct, ...prev]);
  };

  const handleSignOut = () => {
    const userName = currentUser?.name || 'User';
    setCurrentUser(null);
    try {
      localStorage.removeItem('newsintel_user');
    } catch (e) {
      console.error('Error removing user session:', e);
    }
    addToast('info', 'Signed Out Successfully', `${userName} has been logged out of NewsIntel.`);

    // Log Activity
    const logoutAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: userName,
      action: 'signed out',
      target: 'Enterprise Workspace',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities((prev) => [logoutAct, ...prev]);
  };

  const handleOpenAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Live RAG Stream Simulation state
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [pendingQuestion, setPendingQuestion] = React.useState<string>('');

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
    setPendingQuestion(question);
    setIsStreaming(true);
  };

  const handleStreamComplete = (answer: ResearchAnswer) => {
    const newAnswer: ResearchAnswer = {
      ...answer,
      question: pendingQuestion || answer.question,
    };
    setCurrentAnswer(newAnswer);
    setIsStreaming(false);
    setCurrentPage('results');
    addToast('success', 'RAG Synthesis Complete', `Verified 3 source citations for "${pendingQuestion || answer.question}"`);

    // Add to activity stream
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      user: currentUser?.name || 'Guest User',
      action: 'executed research query',
      target: `"${pendingQuestion || answer.question}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleOpenDocument = (docId: string) => {
    setSelectedDocId(docId);
    setCurrentPage('doc-viewer');
  };

  const handleDeleteDocument = (docId: string) => {
    const docToDelete = documents.find(d => d.id === docId);
    setDocuments(documents.filter((d) => d.id !== docId));
    if (docToDelete) {
      addToast('info', 'Document Removed', `${docToDelete.name} was removed from the vector index.`);
    }
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
      uploadedBy: currentUser?.name || 'Guest User',
      content: `DOCUMENT TEXT: ${filename}\n\nIngested content processed by NewsIntel Enterprise RAG vector index. All passages are indexed and available for semantic verification.`
    };
    setDocuments([newDoc, ...documents]);
    addToast('success', 'Document Ingested & Indexed', `${filename} added to vector partition.`);

    // Add to activity stream
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      user: currentUser?.name || 'Guest User',
      action: 'uploaded',
      target: filename,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleSaveSession = (question: string, sourceCount: number) => {
    const newSession: SavedSession = {
      id: `sav-${Date.now()}`,
      question,
      sourceCount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setSavedSessions((prev) => [newSession, ...prev]);
    addToast('success', 'Session Bookmarked', `Saved "${question}" to your saved research archive.`);
  };

  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0];


  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage
          onLaunchApp={() => setCurrentPage('research')}
          onAskQuestion={handleAskQuestion}
          currentUser={currentUser}
          onOpenLogin={() => handleOpenAuthModal('login')}
          onSignOut={handleSignOut}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
          initialMode={authMode}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-canvas text-ink-900 overflow-hidden font-sans select-none">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        documentCount={documents.length}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenLogin={() => handleOpenAuthModal('login')}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <Header
          onOpenGlobalSearch={() => setIsGlobalSearchOpen(true)}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onNavigateToLanding={() => setCurrentPage('landing')}
          currentUser={currentUser}
          onOpenAuthModal={() => handleOpenAuthModal('login')}
          onSignOut={handleSignOut}
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
              onSaveSession={handleSaveSession}
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
              onAskCollectionQuery={(colTitle, q) => handleAskQuestion(`[Collection: ${colTitle}] ${q}`)}
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

      {/* Modals & Notifications */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        initialMode={authMode}
      />

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

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(msg) => addToast('success', 'Preferences Saved', msg)}
      />

      <RagStreamModal
        isOpen={isStreaming}
        question={pendingQuestion}
        onComplete={handleStreamComplete}
        mockAnswer={{
          ...DEFAULT_RESEARCH_ANSWER,
          question: pendingQuestion || DEFAULT_RESEARCH_ANSWER.question
        }}
      />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;
