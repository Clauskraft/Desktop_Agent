# ADR-001: AgentScope Sidecar Architecture

**Date:** 2025-09-30

**Status:** Accepted

## Context

We need a backend service to orchestrate AI agents with support for:
- Multiple AI providers (OpenAI, Anthropic, Google)
- Streaming responses
- Authentication and rate limiting
- Tool execution and agent chaining

## Decision

Implement AgentScope as a FastAPI sidecar service with:

1. **FastAPI Backend**
   - RESTful API for synchronous requests
   - WebSocket support for streaming
   - Middleware for auth, CORS, rate limiting

2. **AgentScope Integration**
   - Agent orchestration framework
   - Multi-provider support
   - Tool and function calling

3. **Security**
   - Bearer token authentication
   - Rate limiting (60 req/min)
   - Audit logging
   - Body size limits

## Alternatives Considered

1. **Direct API calls from frontend**
   - Cons: Exposes API keys, no rate limiting, no orchestration

2. **LangChain/LlamaIndex**
   - Cons: More complex, heavier dependencies

3. **Cloud functions**
   - Cons: Cold start latency, vendor lock-in

## Consequences

### Positive
- Centralized agent management
- Secure API key handling
- Rate limiting and monitoring
- Streaming support
- Easy to scale

### Negative
- Additional service to deploy
- Network latency for localhost
- Requires Python runtime

## Implementation

See:
- `backend/` - FastAPI application
- `backend/Makefile` - Build targets
- `src/services/agentscope/` - Frontend client
