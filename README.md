# AI Agent Desktop Cockpit

## Overview
Enterprise-grade AI agent management platform with support for multiple AI providers, built with React, TypeScript, and Electron.

## Features
- ✅ Multi-provider AI support (OpenAI, Anthropic, Google, Azure, Local)
- ✅ Advanced chat interface with streaming
- ✅ Project management system
- ✅ Agent library with GitHub import
- ✅ Analytics dashboard
- ✅ Electron desktop app
- ✅ TDC Corporate Visual Identity

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Desktop app
npm run electron:dev

# Build for production
npm run build
npm run electron:build
```

## Configuration

1. Copy `.env.example` to `.env`
2. Add your API keys:
```
VITE_OPENAI_API_KEY=your-key
VITE_ANTHROPIC_API_KEY=your-key  
VITE_GOOGLE_API_KEY=your-key
```

## Project Structure
- `/src` - React application source
- `/electron` - Electron main process
- `/docs` - Documentation
- `/public` - Static assets

## Tech Stack
- React 18 + TypeScript
- Electron 27
- Material-UI 5
- IndexedDB (Dexie)
- Zustand state management
- Vite build system

## License
MIT