"""
Integration tests for WebSocket agent streaming
"""

import pytest
from fastapi.testclient import TestClient
import json


@pytest.mark.integration
@pytest.mark.websocket
class TestWebSocketIntegration:
    """Test suite for WebSocket integration"""
    
    def test_websocket_connection(self, client):
        """Test WebSocket connection establishment"""
        with client.websocket_connect("/api/agents/stream") as websocket:
            # Connection should be established
            assert websocket is not None
    
    def test_websocket_ping_pong(self, client):
        """Test WebSocket ping/pong heartbeat"""
        with client.websocket_connect("/api/agents/stream") as websocket:
            # Send ping
            websocket.send_json({"action": "ping"})
            
            # Receive pong
            response = websocket.receive_json()
            assert response["type"] == "pong"
    
    def test_websocket_agent_run(self, client):
        """Test agent execution via WebSocket"""
        with client.websocket_connect("/api/agents/stream") as websocket:
            # Send agent run request
            request = {
                "action": "run",
                "agent_id": "test-agent",
                "messages": [
                    {"role": "user", "content": "Hello"}
                ],
            }
            websocket.send_json(request)
            
            # Receive start event
            start_event = websocket.receive_json()
            assert start_event["type"] == "start"
            assert start_event["agent_id"] == "test-agent"
            assert start_event["done"] is False
            
            # Receive token events
            tokens = []
            while True:
                event = websocket.receive_json()
                
                if event["type"] == "token":
                    tokens.append(event["content"])
                    assert event["done"] is False
                elif event["type"] == "complete":
                    assert event["done"] is True
                    assert "usage" in event
                    assert "metadata" in event
                    break
                else:
                    pytest.fail(f"Unexpected event type: {event['type']}")
            
            # Verify we received tokens
            assert len(tokens) > 0
            full_response = "".join(tokens)
            assert len(full_response) > 0
    
    def test_websocket_invalid_action(self, client):
        """Test WebSocket with invalid action"""
        with client.websocket_connect("/api/agents/stream") as websocket:
            # Send invalid action
            websocket.send_json({"action": "invalid"})
            
            # Should receive error
            response = websocket.receive_json()
            assert response["type"] == "error"
            assert "Unknown action" in response["error"]
    
    def test_websocket_multiple_requests(self, client):
        """Test multiple agent requests in same WebSocket connection"""
        with client.websocket_connect("/api/agents/stream") as websocket:
            # First request
            websocket.send_json({
                "action": "run",
                "agent_id": "agent-1",
                "messages": [{"role": "user", "content": "First"}],
            })
            
            # Skip through first response
            while True:
                event = websocket.receive_json()
                if event["type"] == "complete":
                    break
            
            # Second request
            websocket.send_json({
                "action": "run",
                "agent_id": "agent-2",
                "messages": [{"role": "user", "content": "Second"}],
            })
            
            # Verify second response
            start_event = websocket.receive_json()
            assert start_event["type"] == "start"
            assert start_event["agent_id"] == "agent-2"
