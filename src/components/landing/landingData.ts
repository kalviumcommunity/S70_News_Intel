export interface SourceCitation {
  id: number;
  publisher: string;
  date: string;
  headline: string;
  excerpt: string;
  relevance: string;
}

export const HERO_SOURCES: Record<number, SourceCitation> = {
  1: {
    id: 1,
    publisher: "Reuters",
    date: "Sep 18, 2026",
    headline: "India Sanctions $15B Semiconductor Fab Expansion in Gujarat",
    excerpt: "Government approves three new assembly and test units, boosting domestic chip production capacity by 340%.",
    relevance: "98% Match"
  },
  2: {
    id: 2,
    publisher: "Economic Times",
    date: "Sep 14, 2026",
    headline: "Global Fab Giants Partner with Indian Tech Conglomerates",
    excerpt: "Joint ventures in 28nm node manufacturing secure long-term automotive and industrial supply chains.",
    relevance: "95% Match"
  },
  3: {
    id: 3,
    publisher: "Financial Times",
    date: "Sep 10, 2026",
    headline: "Tech Hardware Ecosystem Shifts Toward South Asia",
    excerpt: "Subsidies under ISM 2.0 attract leading OSAT providers to set up advanced packaging infrastructure.",
    relevance: "92% Match"
  }
};

export const STATS_BAR = [
  { value: "1,284+", label: "Verified News Sources", change: "+14% this month" },
  { value: "142ms", label: "Semantic Search Latency", change: "Sub-second RAG" },
  { value: "100%", label: "Source-Backed Grounding", change: "Zero Hallucination" },
  { value: "24+", label: "Enterprise Newsrooms", change: "Active Teams" }
];

export const PROBLEM_CARDS = [
  {
    icon: 'Clock',
    color: 'blue',
    title: 'Information Overload',
    desc: 'Too much information makes research slow. Finding signal inside thousands of daily articles is overwhelming.'
  },
  {
    icon: 'Network',
    color: 'cyan',
    title: 'Fragmented Sources',
    desc: 'Important information is spread across different platforms, paywalled publications, and regional news outlets.'
  },
  {
    icon: 'ShieldCheck',
    color: 'indigo',
    title: 'Hard to Verify',
    desc: 'Finding trustworthy evidence behind an answer takes time. Hallucinated AI summaries create unacceptable risk.'
  }
];

export const WORKFLOW_STEPS = [
  { step: "01", title: "Ingestion & Extraction", desc: "PDFs, DOCX, Gazette filings, and live RSS news feeds automatically cleaned and metadata-tagged." },
  { step: "02", title: "Semantic Vector Chunks", desc: "Dense vector embeddings generated and stored in high-performance enterprise vector database." },
  { step: "03", title: "Hybrid Search & Rerank", desc: "Combine BM25 keyword precision with dense neural semantic matching and cross-encoder reranking." },
  { step: "04", title: "Grounded Answer + Evidence", desc: "LLM synthesizes concise answers with exact passage citations and page number evidence markers." }
];

export const FEATURES_LIST = [
  { icon: 'Search', color: 'blue', title: 'AI-Powered Search', desc: 'Semantic query processing across thousands of global news streams and document archives.' },
  { icon: 'Sparkles', color: 'cyan', title: 'RAG-Based Research', desc: 'Grounded answer generation leveraging retrieval-augmented intelligence with zero hallucination.' },
  { icon: 'ShieldCheck', color: 'emerald', title: 'Source Citations', desc: 'Every claim is pinned directly to publisher source passages, publication dates, and page metadata.' },
  { icon: 'Building2', color: 'indigo', title: 'Entity Intelligence', desc: 'Extract and map key companies, figures, deals, and policy shifts automatically from unstructured text.' },
  { icon: 'Clock', color: 'amber', title: 'News Timeline', desc: 'Track story evolution chronologically across days, months, and years to detect subtle trend shifts.' },
  { icon: 'GitCompare', color: 'slate', title: 'Multi-Source Comparison', desc: 'Contrast reporting perspectives across diverse domestic and international publications side-by-side.' },
];

export const USE_CASES = [
  {
    category: "Journalism & Media",
    title: "Investigative Research",
    desc: "Cross-reference archive interviews, leaked documents, and historical policy speeches in seconds."
  },
  {
    category: "Financial Markets",
    title: "Earnings & Macro Analysis",
    desc: "Extract market-moving announcements, supply chain impacts, and regulatory updates instantly."
  },
  {
    category: "Policy & Legal",
    title: "Regulatory Intelligence",
    desc: "Track legislative amendments, government GAZETTE notifications, and ministry press releases."
  },
  {
    category: "Corporate Strategy",
    title: "Competitive Intelligence",
    desc: "Monitor competitor expansion, M&A rumors, joint ventures, and executive announcements."
  }
];
