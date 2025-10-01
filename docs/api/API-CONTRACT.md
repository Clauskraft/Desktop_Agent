# API Contract

## AgentScope Backend API

Base URL: `http://localhost:8000/api`

### Authentication

All endpoints except `/health` require Bearer token authentication:

```http
Authorization: Bearer <your-api-token>
```

## Endpoints

### Health Check

#### GET /health
Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": 1234567890,
  "version": "1.0.0",
  "environment": "production"
}
```

### Agents

#### POST /agents/run
Execute an agent synchronously.

**Request:**
```json
{
  "agent_id": "string",
  "messages": [
    {
      "role": "user|assistant|system",
      "content": "string"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2000
}
```

**Response:**
```json
{
  "agent_id": "string",
  "message": {
    "role": "assistant",
    "content": "string"
  },
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50,
    "total_tokens": 150
  },
  "metadata": {},
  "duration_ms": 1234
}
```

#### WS /agents/stream
Stream agent responses via WebSocket.

**Send:**
```json
{
  "action": "run",
  "agent_id": "string",
  "messages": [...]
}
```

**Receive:**
```json
{
  "type": "token|complete|error",
  "content": "string",
  "done": false
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `413` - Payload Too Large
- `429` - Too Many Requests
- `500` - Internal Server Error
