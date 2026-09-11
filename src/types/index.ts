export type UserRole = 'Journalist' | 'Senior Editor' | 'System Admin';

export type ActiveTab = 'chat' | 'search' | 'documents' | 'eval' | 'admin';

export interface Citation {
  id: string;
  docId: string;
  documentTitle: string;
  sourceOutlet: string;
  author: string;
  publishDate: string;
  pageNumber: number;
  snippetText: string;
  fullExcerpt: string;
  relevanceScore: number; // 0 - 100
  groundednessScore: number; // 0 - 100
  entityTags: string[];
  fileType: 'pdf' | 'docx' | 'txt' | 'md' | 'csv';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  thinkingTimeMs?: number;
  confidenceScore?: number;
  entitiesExtracted?: string[];
}

export interface ResearchSession {
  id: string;
  title: string;
  updatedAt: string;
  messageCount: number;
  category: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'md' | 'csv';
  sizeFormatted: string;
  uploadDate: string;
  author: string;
  sourceOutlet: string;
  status: 'Indexed' | 'Ingesting' | 'Failed' | 'Cleaning';
  vectorChunksCount: number;
  entityTags: string[];
  topic: string;
}

export interface SearchResult {
  id: string;
  documentTitle: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'md' | 'csv';
  outlet: string;
  publishDate: string;
  snippet: string;
  fullContent: string;
  score: number; // 0 - 100
  denseScore: number;
  sparseScore: number;
  pageNumber: number;
  entities: string[];
}

export interface IngestionStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  progressPercentage: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: 'QUERY_EXECUTED' | 'DOCUMENT_UPLOADED' | 'EVIDENCE_EXPORTED' | 'SETTINGS_CHANGED' | 'ACCESS_DENIED';
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'DENIED';
}

export interface EvaluationMetric {
  id: string;
  metricName: string;
  score: number; // 0.00 to 1.00
  benchmarkTarget: number;
  change: string;
  status: 'Optimal' | 'Warning' | 'Critical';
  description: string;
}

export interface EvalBenchmarkCase {
  id: string;
  query: string;
  expectedAnswer: string;
  actualAnswer: string;
  retrievedContextCount: number;
  precision: number;
  recall: number;
  faithfulness: number;
  passed: boolean;
}
