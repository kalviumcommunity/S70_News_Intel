export type NavigationPage = 
  | 'research' 
  | 'results' 
  | 'documents' 
  | 'doc-viewer' 
  | 'collections' 
  | 'saved' 
  | 'activity' 
  | 'admin';

export type FileType = 'pdf' | 'docx' | 'txt' | 'csv' | 'md';

export interface DocumentItem {
  id: string;
  name: string;
  type: FileType;
  pages: number;
  size: string;
  uploadedDate: string;
  status: 'Indexed' | 'Processing' | 'Failed';
  topics: string[];
  entities: string[];
  content: string;
  uploadedBy: string;
}

export interface Citation {
  id: number;
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  excerptText: string;
  highlightSentence: string;
  type: FileType;
}

export interface ResearchAnswer {
  question: string;
  paragraphs: string[];
  citations: Record<number, Citation>;
  sources: {
    id: string;
    name: string;
    type: FileType;
    details: string;
    citationId: number;
  }[];
  relatedQuestions: string[];
}

export interface CollectionItem {
  id: string;
  title: string;
  documentCount: number;
  updatedDate: string;
  description: string;
}

export interface SavedSession {
  id: string;
  question: string;
  sourceCount: number;
  date: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AuditRecord {
  id: string;
  user: string;
  action: string;
  document: string;
  timestamp: string;
  status: 'Success' | 'Denied' | 'Warning';
}
