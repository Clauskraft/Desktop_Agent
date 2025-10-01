"""
Agent Endpoints
AgentScope integration for agent execution
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException, status
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import structlog
import asyncio
import json

from app.config import settings

logger = structlog.get_logger(__name__)

router = APIRouter()


# ============================================================================
# MODELS
# ============================================================================

class Message(BaseModel):
    """Chat message model"""
    role: str  # 'user', 'assistant', 'system'
    content: str
    name: Optional[str] = None


class AgentRunRequest(BaseModel):
    """Request model for agent execution"""
    agent_id: str
    messages: List[Message]
    system_prompt: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None
    tools: Optional[List[Dict[str, Any]]] = None
    metadata: Optional[Dict[str, Any]] = None


class AgentRunResponse(BaseModel):
    """Response model for agent execution"""
    agent_id: str
    message: Message
    usage: Dict[str, int]
    metadata: Dict[str, Any]
    duration_ms: float


# ============================================================================
# REST ENDPOINT
# ============================================================================

@router.post("/run", response_model=AgentRunResponse)
async def run_agent(request: AgentRunRequest):
    """
    Run an agent with the given messages and configuration
    
    This endpoint executes an agent synchronously and returns the complete response.
    For streaming responses, use the /stream WebSocket endpoint.
    """
    try:
        logger.info("agent_run_request", agent_id=request.agent_id)
        
        # TODO: Implement actual AgentScope execution
        # For now, return a mock response
        
        import time
        start_time = time.time()
        
        # Simulate agent processing
        await asyncio.sleep(0.1)
        
        # Mock response
        response = AgentRunResponse(
            agent_id=request.agent_id,
            message=Message(
                role="assistant",
                content="This is a mock response. AgentScope integration pending.",
            ),
            usage={
                "prompt_tokens": 100,
                "completion_tokens": 50,
                "total_tokens": 150,
            },
            metadata={
                "model": settings.AGENTSCOPE_MODEL,
                "temperature": request.temperature or settings.AGENTSCOPE_TEMPERATURE,
            },
            duration_ms=(time.time() - start_time) * 1000,
        )
        
        logger.info("agent_run_complete", agent_id=request.agent_id, duration_ms=response.duration_ms)
        
        return response
        
    except Exception as e:
        logger.error("agent_run_error", agent_id=request.agent_id, error=str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Agent execution failed: {str(e)}",
        )


# ============================================================================
# WEBSOCKET ENDPOINT
# ============================================================================

class ConnectionManager:
    """Manages WebSocket connections"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info("websocket_connected", total_connections=len(self.active_connections))
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info("websocket_disconnected", total_connections=len(self.active_connections))
    
    async def send_json(self, websocket: WebSocket, data: dict):
        await websocket.send_json(data)
    
    async def send_text(self, websocket: WebSocket, message: str):
        await websocket.send_text(message)


manager = ConnectionManager()


@router.websocket("/stream")
async def stream_agent(websocket: WebSocket):
    """
    Stream agent responses via WebSocket
    
    Client sends:
    {
        "action": "run",
        "agent_id": "agent-123",
        "messages": [...],
        "system_prompt": "...",
        "temperature": 0.7,
        "max_tokens": 2000
    }
    
    Server responds with streaming chunks:
    {
        "type": "token",
        "content": "Hello",
        "done": false
    }
    
    Final message:
    {
        "type": "complete",
        "usage": {...},
        "metadata": {...},
        "done": true
    }
    """
    await manager.connect(websocket)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_json()
            
            action = data.get("action")
            
            if action == "run":
                agent_id = data.get("agent_id")
                messages = data.get("messages", [])
                
                logger.info("websocket_agent_run", agent_id=agent_id)
                
                try:
                    # TODO: Implement actual AgentScope streaming
                    # For now, simulate streaming
                    
                    # Send start event
                    await manager.send_json(websocket, {
                        "type": "start",
                        "agent_id": agent_id,
                        "done": False,
                    })
                    
                    # Simulate streaming tokens
                    mock_response = "This is a mock streaming response from AgentScope."
                    words = mock_response.split()
                    
                    for word in words:
                        await manager.send_json(websocket, {
                            "type": "token",
                            "content": word + " ",
                            "done": False,
                        })
                        await asyncio.sleep(0.05)  # Simulate network delay
                    
                    # Send completion event
                    await manager.send_json(websocket, {
                        "type": "complete",
                        "usage": {
                            "prompt_tokens": 100,
                            "completion_tokens": 50,
                            "total_tokens": 150,
                        },
                        "metadata": {
                            "model": settings.AGENTSCOPE_MODEL,
                        },
                        "done": True,
                    })
                    
                    logger.info("websocket_agent_complete", agent_id=agent_id)
                    
                except Exception as e:
                    logger.error("websocket_agent_error", agent_id=agent_id, error=str(e))
                    await manager.send_json(websocket, {
                        "type": "error",
                        "error": str(e),
                        "done": True,
                    })
            
            elif action == "ping":
                # Heartbeat
                await manager.send_json(websocket, {"type": "pong"})
            
            else:
                await manager.send_json(websocket, {
                    "type": "error",
                    "error": f"Unknown action: {action}",
                })
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("websocket_client_disconnected")
    
    except Exception as e:
        logger.error("websocket_error", error=str(e))
        manager.disconnect(websocket)


# ============================================================================
# AGENT MANAGEMENT
# ============================================================================

@router.get("/")
async def list_agents():
    """List available agents"""
    # TODO: Implement actual agent listing from database
    return {
        "agents": [
            {
                "id": "agent-1",
                "name": "General Assistant",
                "description": "General purpose AI assistant",
                "model": "gpt-4",
                "status": "active",
            },
            {
                "id": "agent-2",
                "name": "Code Assistant",
                "description": "Specialized in code generation and review",
                "model": "gpt-4",
                "status": "active",
            },
        ],
        "total": 2,
    }


@router.get("/{agent_id}")
async def get_agent(agent_id: str):
    """Get agent details"""
    # TODO: Implement actual agent retrieval from database
    return {
        "id": agent_id,
        "name": "Sample Agent",
        "description": "A sample agent",
        "model": settings.AGENTSCOPE_MODEL,
        "temperature": settings.AGENTSCOPE_TEMPERATURE,
        "max_tokens": settings.AGENTSCOPE_MAX_TOKENS,
        "status": "active",
    }
