# NewsIntel — Enterprise RAG News Research Platform

NewsIntel is an AI-powered research platform that helps journalists quickly find relevant information from large collections of articles, interview transcripts, and archived content. It provides grounded answers with citations and evidence for easy verification.

## 👥 Team

- **Ashik** — Frontend / UI-UX
- **Saideep** — Backend / Platform
- **Shreeya** — AI/ML / Data Pipeline

## 🛠️ Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query

### Backend
- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Redis
- Docker

### AI/ML
- Python
- LangChain / LlamaIndex
- Embeddings
- Vector Database
- LLM
- spaCy

## ✨ Key Features

- Document upload and ingestion
- PDF, DOCX, TXT, Markdown and CSV support
- Semantic and hybrid search
- AI-powered research chat
- Answers with source citations
- Evidence viewer
- Multi-turn research sessions
- Entity and topic filtering
- Role-based access control
- Admin dashboard
- Audit logging
- RAG evaluation

## 🔄 RAG Workflow

```text
Documents
   ↓
Ingestion
   ↓
Cleaning & Metadata Extraction
   ↓
Chunking
   ↓
Embeddings
   ↓
Vector Database
   ↓
User Query
   ↓
Hybrid Search
   ↓
Reranking
   ↓
LLM
   ↓
Answer + Citations + Evidence
```
