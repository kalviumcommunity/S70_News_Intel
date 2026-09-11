import React from 'react';
import { UserRole, ActiveTab, Citation, ResearchSession, ChatMessage, SearchResult } from './types';
import { 
  INITIAL_CITATIONS, 
  INITIAL_SESSIONS, 
  INITIAL_CHAT_MESSAGES 
} from './mock/data';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ChatView } from './components/chat/ChatView';
import { EvidenceViewer } from './components/chat/EvidenceViewer';
import { SearchWorkbench } from './components/search/SearchWorkbench';
import { DocumentHub } from './components/documents/DocumentHub';
import { RagEvalView } from './components/eval/RagEvalView';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = React.useState<UserRole>('Journalist');
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('chat');
  const [sessions, setSessions] = React.useState<ResearchSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = React.useState<string>(INITIAL_SESSIONS[0].id);
  const [messages, setMessages] = React.useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [selectedCitation, setSelectedCitation] = React.useState<Citation | null>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Handle keyboard shortcut ⌘ K / Ctrl K for global search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActiveTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = (queryText: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulated RAG AI Answer Generation with embedded citation badges
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: `Regarding your query on "${queryText}":\n\nOur vector database retrieved 3 high-confidence source documents. Under Section 7 of the Clayton Act, strategic compute stakes paired with minority holdings trigger antitrust scrutiny [cit-101]. Furthermore, European regulations mandate copyright transparency logs by Q4 2026 [cit-102]. Internal investigative logs also indicate scraper paywall bypass incidents [cit-103].\n\n*Click any citation badge above to open the Evidence Viewer.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thinkingTimeMs: 1280,
        confidenceScore: 0.95,
        citations: INITIAL_CITATIONS,
        entitiesExtracted: ['FTC', 'Clayton Act', 'EU AI Act', 'Whistleblower']
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 1200);
  };

  const handleNewSession = () => {
    const newId = `sess-${Date.now()}`;
    const newSess: ResearchSession = {
      id: newId,
      title: 'New Investigative Topic',
      updatedAt: 'Just now',
      messageCount: 1,
      category: 'General Research'
    };
    setSessions([newSess, ...sessions]);
    setActiveSessionId(newId);
    setMessages([
      {
        id: `msg-init-${Date.now()}`,
        sender: 'assistant',
        content: 'Welcome to a new NewsIntel research session. Type your query or search keyphrases to begin retrieving grounded evidence.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleAskAIWithSearchResult = (result: SearchResult) => {
    setActiveTab('chat');
    handleSendMessage(`Analyze the following search passage from "${result.documentTitle}": "${result.snippet}"`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onGlobalSearchClick={() => setActiveTab('search')}
      />

      {/* Main Body with Sidebar + Tab Workspace + Sliding Evidence Drawer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          onNewSession={handleNewSession}
          currentRole={currentRole}
        />

        {/* Tab Workspace View */}
        <main className="flex-1 flex overflow-hidden relative">
          {activeTab === 'chat' && (
            <ChatView
              session={activeSession}
              messages={messages}
              onSendMessage={handleSendMessage}
              onSelectCitation={setSelectedCitation}
              selectedCitationId={selectedCitation?.id}
              onClearSession={() => setMessages([])}
            />
          )}

          {activeTab === 'search' && (
            <SearchWorkbench onAskAIWithResult={handleAskAIWithSearchResult} />
          )}

          {activeTab === 'documents' && <DocumentHub />}

          {activeTab === 'eval' && <RagEvalView />}

          {activeTab === 'admin' && (
            <AdminDashboard currentRole={currentRole} onRoleChange={setCurrentRole} />
          )}

          {/* Sliding Evidence Viewer Panel */}
          {selectedCitation && (
            <EvidenceViewer
              citation={selectedCitation}
              onClose={() => setSelectedCitation(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
};
export default App;
