import { DocumentItem, Citation, SearchResult, AuditLog, EvaluationMetric, EvalBenchmarkCase, ResearchSession, ChatMessage } from '../types';

export const INITIAL_CITATIONS: Citation[] = [
  {
    id: 'cit-101',
    docId: 'doc-001',
    documentTitle: 'US Antitrust FTC Report on BigTech AI Mergers Q3-2026.pdf',
    sourceOutlet: 'Federal Trade Commission Archive',
    author: 'Lina M. Khan & Oversight Committee',
    publishDate: '2026-08-14',
    pageNumber: 14,
    snippetText: 'Under Section 7 of the Clayton Act, minority equity stakes coupled with cloud compute provisioning agreements are subject to mandatory antitrust review to prevent stealth market consolidation.',
    fullExcerpt: 'Section 4.2 - Compute Provisioning & Strategic Partnerships\n"The Commission finds that exclusive compute access contracts between sovereign LLM providers and hyperscale cloud infrastructure platforms create significant barriers to entry for independent developers. Under Section 7 of the Clayton Act, minority equity stakes coupled with cloud compute provisioning agreements are subject to mandatory antitrust review to prevent stealth market consolidation."',
    relevanceScore: 96,
    groundednessScore: 98,
    entityTags: ['FTC', 'BigTech', 'Clayton Act', 'Antitrust', 'Cloud Compute'],
    fileType: 'pdf',
  },
  {
    id: 'cit-102',
    docId: 'doc-002',
    documentTitle: 'EU AI Act Enforcement & Compliance Guidelines Transcript.docx',
    sourceOutlet: 'European Commission Directorate',
    author: 'Margrethe Vestager',
    publishDate: '2026-07-22',
    pageNumber: 8,
    snippetText: 'General Purpose AI models with systemic risk must provide detailed summaries of copyrighted material utilized during pre-training datasets by Q4 2026.',
    fullExcerpt: 'Article 53 Compliance Directives:\n"Providers of General Purpose AI (GPAI) models presenting systemic risk are mandated to publish comprehensive audit logs of technical documentation. Specifically, GPAI models with cumulative training compute exceeding 10^25 FLOPs must provide detailed summaries of copyrighted material utilized during pre-training datasets by Q4 2026 to ensure transparency for rights-holders."',
    relevanceScore: 92,
    groundednessScore: 95,
    entityTags: ['EU AI Act', 'GPAI', 'Systemic Risk', 'Copyright', 'European Union'],
    fileType: 'docx',
  },
  {
    id: 'cit-103',
    docId: 'doc-003',
    documentTitle: 'Investigative Interview Transcript — Whistleblower on Data Scrape.txt',
    sourceOutlet: 'NewsIntel Investigative Desk (Confidential)',
    author: 'Sarah Jenkins (Senior Reporter)',
    publishDate: '2026-09-02',
    pageNumber: 3,
    snippetText: 'Web crawlers bypassed robot.txt headers across 40 major regional news publishers, storing unredacted subscriber paywalled articles.',
    fullExcerpt: 'Transcript Segment [14:32 - 18:05]:\n"Q: How did the automated scraping infrastructure handle domain paywalls?\nA: Internal logs show automated web crawlers bypassed robot.txt headers across 40 major regional news publishers, storing unredacted subscriber paywalled articles into the vector embedding pipeline without licensing agreements or API tokens."',
    relevanceScore: 89,
    groundednessScore: 91,
    entityTags: ['Whistleblower', 'Data Scraping', 'Paywalls', 'News Publishers', 'Robots.txt'],
    fileType: 'txt',
  }
];

export const INITIAL_SESSIONS: ResearchSession[] = [
  {
    id: 'sess-1',
    title: 'AI Regulatory Compliance & Antitrust Probe',
    updatedAt: '10 mins ago',
    messageCount: 4,
    category: 'Regulatory Policy'
  },
  {
    id: 'sess-2',
    title: 'Election 2026 Campaign Ad Spend Audit',
    updatedAt: '2 hours ago',
    messageCount: 8,
    category: 'Political Finance'
  },
  {
    id: 'sess-3',
    title: 'Clean Energy Grid Infrastructure Subsidies',
    updatedAt: '1 day ago',
    messageCount: 12,
    category: 'Energy & Climate'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    content: 'What regulatory and antitrust challenges are major AI providers facing regarding compute partnerships and data scraping?',
    timestamp: '10:14 AM'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    content: `Based on verified investigative transcripts and federal oversight reports in our repository, major AI providers are facing intense dual pressure on compute infrastructure and data acquisition:

1. **Antitrust Review of Cloud & Compute Stakeholdings**:
The Federal Trade Commission has established that minority equity investments paired with cloud compute agreements fall directly under Section 7 antitrust scrutiny [cit-101]. Regulators warn that exclusive cloud access deals risk stealth consolidation and create prohibitive barriers for independent developers [cit-101].

2. **Copyright & Training Data Transparency**:
Under the EU AI Act enforcement guidelines, providers operating GPAI models exceeding $10^{25}$ FLOPs must publish granular audit summaries of copyrighted training data by Q4 2026 [cit-102]. 

3. **Paywall & License Bypass Violations**:
Internal whistleblower transcripts reveal automated crawling pipelines actively bypassing paywalls and \`robots.txt\` directives across over 40 regional news publishers without content licensing agreements [cit-103].

*You can inspect any citation badge above to review the source document, page number, and verifiability score.*`,
    timestamp: '10:15 AM',
    thinkingTimeMs: 1420,
    confidenceScore: 0.96,
    citations: INITIAL_CITATIONS,
    entitiesExtracted: ['FTC', 'Clayton Act', 'EU AI Act', 'Whistleblower', 'Cloud Compute', 'Robots.txt']
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    title: 'US Antitrust FTC Report on BigTech AI Mergers Q3-2026.pdf',
    fileType: 'pdf',
    sizeFormatted: '4.8 MB',
    uploadDate: '2026-08-14',
    author: 'Lina M. Khan & Oversight Committee',
    sourceOutlet: 'Federal Trade Commission',
    status: 'Indexed',
    vectorChunksCount: 142,
    entityTags: ['FTC', 'BigTech', 'Clayton Act', 'Antitrust'],
    topic: 'Regulatory Policy'
  },
  {
    id: 'doc-002',
    title: 'EU AI Act Enforcement & Compliance Guidelines Transcript.docx',
    fileType: 'docx',
    sizeFormatted: '2.1 MB',
    uploadDate: '2026-07-22',
    author: 'Margrethe Vestager',
    sourceOutlet: 'European Commission',
    status: 'Indexed',
    vectorChunksCount: 88,
    entityTags: ['EU AI Act', 'GPAI', 'Copyright'],
    topic: 'International Law'
  },
  {
    id: 'doc-003',
    title: 'Investigative Interview Transcript — Whistleblower on Data Scrape.txt',
    fileType: 'txt',
    sizeFormatted: '840 KB',
    uploadDate: '2026-09-02',
    author: 'Sarah Jenkins',
    sourceOutlet: 'NewsIntel Investigative Desk',
    status: 'Indexed',
    vectorChunksCount: 34,
    entityTags: ['Whistleblower', 'Data Scraping', 'Paywalls'],
    topic: 'Investigative Journalism'
  },
  {
    id: 'doc-004',
    title: 'Federal Election Campaign Finance Data 2026.csv',
    fileType: 'csv',
    sizeFormatted: '12.4 MB',
    uploadDate: '2026-09-05',
    author: 'FEC Open Data Desk',
    sourceOutlet: 'Federal Election Commission',
    status: 'Indexed',
    vectorChunksCount: 310,
    entityTags: ['FEC', 'Elections', 'Campaign Finance'],
    topic: 'Political Finance'
  },
  {
    id: 'doc-005',
    title: 'Global Semiconductor Supply Chain Resilience Assessment.md',
    fileType: 'md',
    sizeFormatted: '1.2 MB',
    uploadDate: '2026-09-09',
    author: 'Dr. Aris Thorne',
    sourceOutlet: 'Tech Policy Institute',
    status: 'Cleaning',
    vectorChunksCount: 0,
    entityTags: ['Semiconductors', 'Supply Chain', 'TSMC'],
    topic: 'Technology & Hardware'
  }
];

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: 'sr-1',
    documentTitle: 'US Antitrust FTC Report on BigTech AI Mergers Q3-2026.pdf',
    fileType: 'pdf',
    outlet: 'Federal Trade Commission',
    publishDate: '2026-08-14',
    snippet: '...minority equity stakes coupled with cloud compute provisioning agreements are subject to mandatory antitrust review under Section 7 of the Clayton Act...',
    fullContent: 'Section 4.2 - Compute Provisioning & Strategic Partnerships: The Commission finds that exclusive compute access contracts between sovereign LLM providers and hyperscale cloud infrastructure platforms create significant barriers to entry for independent developers. Under Section 7 of the Clayton Act, minority equity stakes coupled with cloud compute provisioning agreements are subject to mandatory antitrust review to prevent stealth market consolidation.',
    score: 97,
    denseScore: 98,
    sparseScore: 94,
    pageNumber: 14,
    entities: ['FTC', 'Clayton Act', 'Cloud Compute', 'Antitrust']
  },
  {
    id: 'sr-2',
    documentTitle: 'EU AI Act Enforcement & Compliance Guidelines Transcript.docx',
    fileType: 'docx',
    outlet: 'European Commission',
    publishDate: '2026-07-22',
    snippet: '...Providers of General Purpose AI models presenting systemic risk are mandated to publish comprehensive audit logs of technical documentation by Q4 2026...',
    fullContent: 'Article 53 Compliance Directives: Providers of General Purpose AI (GPAI) models presenting systemic risk are mandated to publish comprehensive audit logs of technical documentation. Specifically, GPAI models with cumulative training compute exceeding 10^25 FLOPs must provide detailed summaries of copyrighted material utilized during pre-training datasets by Q4 2026.',
    score: 91,
    denseScore: 89,
    sparseScore: 95,
    pageNumber: 8,
    entities: ['EU AI Act', 'GPAI', 'Copyright', 'FLOPs']
  },
  {
    id: 'sr-3',
    documentTitle: 'Investigative Interview Transcript — Whistleblower on Data Scrape.txt',
    fileType: 'txt',
    outlet: 'NewsIntel Investigative Desk',
    publishDate: '2026-09-02',
    snippet: '...automated web crawlers bypassed robot.txt headers across 40 major regional news publishers, storing unredacted subscriber paywalled articles...',
    fullContent: 'Transcript Segment [14:32 - 18:05]: Q: How did the automated scraping infrastructure handle domain paywalls? A: Internal logs show automated web crawlers bypassed robot.txt headers across 40 major regional news publishers, storing unredacted subscriber paywalled articles into the vector embedding pipeline without licensing agreements or API tokens.',
    score: 88,
    denseScore: 92,
    sparseScore: 82,
    pageNumber: 3,
    entities: ['Whistleblower', 'Paywalls', 'Robots.txt', 'News Publishers']
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-09-11 10:15:22',
    user: 'ashik@newsintel.io',
    role: 'Journalist',
    action: 'QUERY_EXECUTED',
    details: 'Hybrid RAG Query: "Antitrust & compute partnerships in AI"',
    ipAddress: '192.168.1.42',
    status: 'SUCCESS'
  },
  {
    id: 'log-002',
    timestamp: '2026-09-11 10:12:04',
    user: 'saideep@newsintel.io',
    role: 'System Admin',
    action: 'DOCUMENT_UPLOADED',
    details: 'Ingested document "US Antitrust FTC Report Q3-2026.pdf" (142 vector chunks)',
    ipAddress: '10.0.4.19',
    status: 'SUCCESS'
  },
  {
    id: 'log-003',
    timestamp: '2026-09-11 09:48:11',
    user: 'shreeya@newsintel.io',
    role: 'Senior Editor',
    action: 'EVIDENCE_EXPORTED',
    details: 'Exported evidence citations [cit-101, cit-103] to PDF Research Briefing',
    ipAddress: '192.168.1.88',
    status: 'SUCCESS'
  },
  {
    id: 'log-004',
    timestamp: '2026-09-11 08:30:15',
    user: 'guest_journalist@external.org',
    role: 'Journalist',
    action: 'ACCESS_DENIED',
    details: 'Attempted to export unredacted Whistleblower transcript doc-003 without Senior Editor permission',
    ipAddress: '203.0.113.55',
    status: 'DENIED'
  }
];

export const INITIAL_EVAL_METRICS: EvaluationMetric[] = [
  {
    id: 'eval-1',
    metricName: 'Context Precision',
    score: 0.94,
    benchmarkTarget: 0.90,
    change: '+3.2%',
    status: 'Optimal',
    description: 'Measures proportion of retrieved chunks that are directly relevant to user research queries.'
  },
  {
    id: 'eval-2',
    metricName: 'Context Recall',
    score: 0.91,
    benchmarkTarget: 0.88,
    change: '+1.8%',
    status: 'Optimal',
    description: 'Measures whether all ground-truth facts required to answer the question were retrieved.'
  },
  {
    id: 'eval-3',
    metricName: 'Faithfulness (Groundedness)',
    score: 0.97,
    benchmarkTarget: 0.95,
    change: '+0.5%',
    status: 'Optimal',
    description: 'Measures how strictly the generated answer is grounded in retrieved context without hallucination.'
  },
  {
    id: 'eval-4',
    metricName: 'Answer Relevance',
    score: 0.93,
    benchmarkTarget: 0.90,
    change: '+2.1%',
    status: 'Optimal',
    description: 'Evaluates conciseness and direct alignment of AI output with newsroom editorial intent.'
  }
];

export const EVAL_BENCHMARK_CASES: EvalBenchmarkCase[] = [
  {
    id: 'tc-101',
    query: 'What compute thresholds trigger EU AI Act compliance audits for General Purpose AI?',
    expectedAnswer: 'Models with cumulative training compute exceeding 10^25 FLOPs.',
    actualAnswer: 'General Purpose AI models exceeding 10^25 FLOPs in cumulative training compute must publish audit summaries of training data.',
    retrievedContextCount: 4,
    precision: 0.96,
    recall: 1.00,
    faithfulness: 0.98,
    passed: true
  },
  {
    id: 'tc-102',
    query: 'Does FTC review equity investments in cloud platforms under antitrust law?',
    expectedAnswer: 'Yes, minority stakes paired with cloud compute access agreements are reviewed under Section 7 of the Clayton Act.',
    actualAnswer: 'Yes, Section 7 of the Clayton Act subjects minority equity stakes and compute provisioning agreements to FTC antitrust review.',
    retrievedContextCount: 5,
    precision: 0.92,
    recall: 0.95,
    faithfulness: 0.96,
    passed: true
  },
  {
    id: 'tc-103',
    query: 'Which news publishers were affected by unauthorized web crawling paywall bypass?',
    expectedAnswer: 'Over 40 regional news publishers experienced paywall bypass via robot.txt directive ignoring.',
    actualAnswer: 'Internal whistleblower logs reveal 40 regional news publishers had subscriber paywalls bypassed by web crawlers.',
    retrievedContextCount: 3,
    precision: 0.88,
    recall: 0.90,
    faithfulness: 0.94,
    passed: true
  }
];
