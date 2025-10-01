# Installation Guide

## Prerequisites

- Node.js >= 18.0.0
- Python >= 3.11
- npm >= 9.0.0
- Git

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/agent-cockpit.git
cd agent-cockpit
```

### 2. Frontend Setup
```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with configuration
make install  # or: pip install -r requirements.txt
make dev      # or: uvicorn app.main:app --reload
```

### 4. Electron Desktop App
```bash
npm run electron:dev
```

## Configuration

### Frontend (.env)
```env
REACT_APP_OPENAI_API_KEY=your-key
REACT_APP_ANTHROPIC_API_KEY=your-key
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Backend (backend/.env)
```env
API_TOKEN=your-api-token
OPENAI_API_KEY=your-key
DATABASE_URL=sqlite:///./agent_cockpit.db
```

## Build for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
make build
```

### Electron
```bash
npm run electron:build
```

## Docker Deployment

```bash
cd backend
docker-compose up -d
```

## Troubleshooting

### Port already in use
```bash
# Frontend (5173)
lsof -ti:5173 | xargs kill -9

# Backend (8000)
lsof -ti:8000 | xargs kill -9
```

### Python dependencies fail
```bash
cd backend
pip install --upgrade pip
make install
```
