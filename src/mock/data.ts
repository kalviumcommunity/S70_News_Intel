import { DocumentItem, Citation, ResearchAnswer, CollectionItem, SavedSession, ActivityItem, AuditRecord } from '../types';

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Railway_Investigation_Report_2025.pdf',
    type: 'pdf',
    pages: 24,
    size: '4.2 MB',
    uploadedDate: 'Sep 10, 2026',
    status: 'Indexed',
    topics: ['Transport', 'Railway', 'Infrastructure'],
    entities: ['Indian Railways', 'Ministry of Railways', 'Safety Board'],
    uploadedBy: 'Ashik',
    content: `EXECUTIVE SUMMARY: RAILWAY DISRUPTION INVESTIGATION 2025

1. OVERVIEW OF INCIDENT
Between March 12 and March 15, 2025, the Northern Corridor rail network experienced systemic service delays affecting over 450 passenger and freight operations. 

2. KEY FINDINGS
The investigation identified repeated signaling failures between March 12 and March 15 as the primary cause of the disruption. Specifically, outdated relay software at the Central Junction hub failed to process automated train routing commands during peak hours, triggering fail-safe red signals across 14 consecutive switch points.

3. CONTRIBUTING FACTORS
While the initial failure stemmed from software relay locks, maintenance delays contributed to the extended recovery period. Technical crews lacked immediate access to replacement relay components due to supply chain backlogs, extending what should have been a 2-hour fix into a 72-hour operational bottleneck.

4. SAFETY & COMPLIANCE RECOMMENDATIONS
The Commission recommends an immediate upgrade of all mechanical relay stations to modern digital interlocking systems, alongside mandatory quarterly firmware audits across all regional corridors.`
  },
  {
    id: 'doc-2',
    name: 'Transport_Minister_Interview.docx',
    type: 'docx',
    pages: 12,
    size: '1.8 MB',
    uploadedDate: 'Sep 09, 2026',
    status: 'Indexed',
    topics: ['Politics', 'Transport', 'Policy'],
    entities: ['Ministry of Transport', 'Union Minister'],
    uploadedBy: 'Ashik',
    content: `INTERVIEW TRANSCRIPT: TRANSPORT MINISTER (Q3 PRESS BRIEFING)

REPORTER: Minister, the recent safety board report points directly to maintenance backlogs and legacy relay switches. Who holds accountability for the delay in modernization funds?

MINISTER: We acknowledged early on that infrastructure modernization requires sustained investment. The emergency allocation of ₹1,200 crore was released directly to the signaling division last November. However, implementation on the ground faced vendor compliance delays. We have instructed regional general managers to expedite all pending signal overhauls by Q4.`
  },
  {
    id: 'doc-3',
    name: 'Railway_Archive_March_2025.pdf',
    type: 'pdf',
    pages: 18,
    size: '3.1 MB',
    uploadedDate: 'Sep 08, 2026',
    status: 'Indexed',
    topics: ['History', 'Railway', 'Operations'],
    entities: ['Northern Railway Zone', 'Maintenance Division'],
    uploadedBy: 'Saideep',
    content: `MARCH 2025 OPERATIONAL ARCHIVE & DISPATCH LOGS

LOG ENTRY #4402 - MARCH 12, 2025 06:14 AM
Central Junction Relay Terminal unresponsive to remote control signal. Manual override authorized. Dispatcher notes indicate inter-locking red status across track 4B and 4C.`
  },
  {
    id: 'doc-4',
    name: 'Infrastructure_Audit_Report.txt',
    type: 'txt',
    pages: 8,
    size: '640 KB',
    uploadedDate: 'Sep 07, 2026',
    status: 'Indexed',
    topics: ['Infrastructure', 'Audit'],
    entities: ['National Audit Bureau'],
    uploadedBy: 'Shreeya',
    content: `AUDIT MEMORANDUM: CORRIDOR SIGNALING RELIABILITY

An independent audit of 42 major junction hubs revealed that 34% of signaling relays exceeded their recommended operational lifespan of 10 years without overhaul.`
  },
  {
    id: 'doc-5',
    name: 'Railway_Delay_Dataset.csv',
    type: 'csv',
    pages: 45,
    size: '12.8 MB',
    uploadedDate: 'Sep 06, 2026',
    status: 'Processing',
    topics: ['Data', 'Delay Analysis'],
    entities: ['Data Analytics Cell'],
    uploadedBy: 'Ashik',
    content: `Date,Train_ID,Origin,Destination,Delay_Minutes,Cause_Code
2025-03-12,12001,NDLS,BCT,185,SIG_FAIL_REUSE
2025-03-12,12002,BCT,NDLS,210,SIG_FAIL_REUSE`
  }
];

export const MOCK_CITATIONS: Record<number, Citation> = {
  1: {
    id: 1,
    documentId: 'doc-1',
    documentTitle: 'Railway Investigation Report 2025',
    pageNumber: 14,
    excerptText: 'The investigation found that the primary disruption was caused by signaling failures at the Central Junction relay terminal between March 12 and March 15.',
    highlightSentence: 'The investigation identified repeated signaling failures between March 12 and March 15 as the primary cause of the disruption.',
    type: 'pdf'
  },
  2: {
    id: 2,
    documentId: 'doc-1',
    documentTitle: 'Railway Investigation Report 2025',
    pageNumber: 16,
    excerptText: 'Technical crews lacked immediate access to replacement relay components due to supply chain backlogs, extending what should have been a 2-hour fix into a 72-hour operational bottleneck.',
    highlightSentence: 'Maintenance delays contributed to the extended recovery period.',
    type: 'pdf'
  },
  3: {
    id: 3,
    documentId: 'doc-2',
    documentTitle: 'Transport Minister Interview',
    pageNumber: 4,
    excerptText: 'The emergency allocation of ₹1,200 crore was released directly to the signaling division last November, but vendor compliance delayed execution.',
    highlightSentence: 'Implementation on the ground faced vendor compliance delays.',
    type: 'docx'
  }
};

export const DEFAULT_RESEARCH_ANSWER: ResearchAnswer = {
  question: 'What caused the railway disruption in 2025?',
  paragraphs: [
    'The official safety board investigation concluded that the primary disruption along the Northern Corridor was caused by systemic signaling failures [1] at the Central Junction relay terminal. Outdated relay control software failed to process automated train routing commands during peak operational hours, triggering automatic safety shutdowns across 14 switch points.',
    'While the mechanical failure initiated the standstill, maintenance delays contributed significantly to the extended recovery period [2]. Technical maintenance teams lacked immediate access to mandatory replacement relay modules due to supply chain bottlenecks, prolonging the outage from an estimated 2 hours into a 72-hour network gridlock.',
    'Furthermore, official transcripts indicate that while modernization funds totaling ₹1,200 crore were allocated prior to the incident, implementation faced procurement and vendor compliance delays [3] across regional divisions.'
  ],
  citations: MOCK_CITATIONS,
  sources: [
    {
      id: 'doc-1',
      name: 'Railway Investigation Report 2025',
      type: 'pdf',
      details: 'PDF · 24 pages',
      citationId: 1
    },
    {
      id: 'doc-2',
      name: 'Transport Minister Interview',
      type: 'docx',
      details: 'DOCX · 12 pages',
      citationId: 3
    },
    {
      id: 'doc-3',
      name: 'Railway Archive — March 2025',
      type: 'pdf',
      details: 'PDF · 18 pages',
      citationId: 2
    }
  ],
  relatedQuestions: [
    'What happened after the disruption?',
    'Were similar incidents reported previously?',
    'What budget allocations were made for signaling overhaul?'
  ]
};

export const MOCK_COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-1',
    title: 'Railway Investigation',
    documentCount: 18,
    updatedDate: 'Sep 10, 2026',
    description: 'Archive reports, transcript files, and dispatch logs regarding the 2025 rail disruption.'
  },
  {
    id: 'col-2',
    title: 'Election 2026',
    documentCount: 42,
    updatedDate: 'Sep 09, 2026',
    description: 'Campaign speeches, party manifestos, and finance compliance audit filings.'
  },
  {
    id: 'col-3',
    title: 'Technology Industry',
    documentCount: 27,
    updatedDate: 'Sep 05, 2026',
    description: 'Antitrust filings, semiconductor supply reports, and regulatory compliance documents.'
  },
  {
    id: 'col-4',
    title: 'Climate Archive',
    documentCount: 35,
    updatedDate: 'Aug 28, 2026',
    description: 'Environmental impact studies, clean energy grid subsidies, and emissions reports.'
  }
];

export const MOCK_SAVED_SESSIONS: SavedSession[] = [
  {
    id: 'sav-1',
    question: 'What caused the railway disruption in 2025?',
    sourceCount: 8,
    date: 'September 10, 2026'
  },
  {
    id: 'sav-2',
    question: 'Find previous interviews with the transport minister',
    sourceCount: 14,
    date: 'September 9, 2026'
  },
  {
    id: 'sav-3',
    question: 'Timeline of the railway investigation',
    sourceCount: 11,
    date: 'September 8, 2026'
  },
  {
    id: 'sav-4',
    question: 'What changed between the two infrastructure audit reports?',
    sourceCount: 6,
    date: 'September 4, 2026'
  }
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    user: 'Ashik',
    action: 'uploaded',
    target: 'Railway Investigation Report 2025.pdf',
    timestamp: '10:32 AM'
  },
  {
    id: 'act-2',
    user: 'Saideep',
    action: 'executed research query',
    target: '"What caused the railway disruption?"',
    timestamp: '10:18 AM'
  },
  {
    id: 'act-3',
    user: 'Shreeya',
    action: 'indexed document',
    target: 'Transport Minister Interview.docx',
    timestamp: '09:54 AM'
  },
  {
    id: 'act-4',
    user: 'Ashik',
    action: 'created collection',
    target: 'Railway Investigation',
    timestamp: '08:40 AM'
  }
];

export const MOCK_AUDIT_LOGS: AuditRecord[] = [
  {
    id: 'aud-101',
    user: 'Ashik',
    action: 'Uploaded Document',
    document: 'Railway_Investigation_Report_2025.pdf',
    timestamp: '10:32 AM',
    status: 'Success'
  },
  {
    id: 'aud-102',
    user: 'Saideep',
    action: 'Searched Archive',
    document: 'Transport Archive',
    timestamp: '10:18 AM',
    status: 'Success'
  },
  {
    id: 'aud-103',
    user: 'Shreeya',
    action: 'Indexed Dataset',
    document: 'Interview Dataset',
    timestamp: '09:54 AM',
    status: 'Success'
  },
  {
    id: 'aud-104',
    user: 'Guest Reporter',
    action: 'Export Attempt',
    document: 'Confidential Transcript',
    timestamp: '08:15 AM',
    status: 'Denied'
  }
];
