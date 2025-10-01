"""
Tests for agent endpoints
"""

import pytest
from fastapi import status


class TestAgentEndpoints:
    """Test suite for agent endpoints"""
    
    def test_list_agents_requires_auth(self, client):
        """Test that listing agents requires authentication"""
        response = client.get("/api/agents/")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_list_agents_with_auth(self, client, auth_headers):
        """Test listing agents with authentication"""
        response = client.get("/api/agents/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert "agents" in data
        assert "total" in data
        assert isinstance(data["agents"], list)
    
    def test_get_agent_requires_auth(self, client):
        """Test that getting agent details requires authentication"""
        response = client.get("/api/agents/test-agent")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_get_agent_with_auth(self, client, auth_headers):
        """Test getting agent details with authentication"""
        response = client.get("/api/agents/test-agent", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert "id" in data
        assert "name" in data
        assert "model" in data
        assert "status" in data
    
    def test_run_agent_requires_auth(self, client, mock_agent_request):
        """Test that running agent requires authentication"""
        response = client.post("/api/agents/run", json=mock_agent_request)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_run_agent_with_auth(self, client, auth_headers, mock_agent_request):
        """Test running agent with authentication"""
        response = client.post(
            "/api/agents/run",
            json=mock_agent_request,
            headers=auth_headers
        )
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Verify response structure
        assert "agent_id" in data
        assert "message" in data
        assert "usage" in data
        assert "metadata" in data
        assert "duration_ms" in data
        
        # Verify message structure
        message = data["message"]
        assert "role" in message
        assert "content" in message
        assert message["role"] == "assistant"
        
        # Verify usage structure
        usage = data["usage"]
        assert "prompt_tokens" in usage
        assert "completion_tokens" in usage
        assert "total_tokens" in usage
    
    def test_run_agent_invalid_request(self, client, auth_headers):
        """Test running agent with invalid request"""
        invalid_request = {
            "agent_id": "test-agent",
            # Missing required 'messages' field
        }
        
        response = client.post(
            "/api/agents/run",
            json=invalid_request,
            headers=auth_headers
        )
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_run_agent_with_custom_temperature(self, client, auth_headers, mock_agent_request):
        """Test running agent with custom temperature"""
        mock_agent_request["temperature"] = 0.5
        
        response = client.post(
            "/api/agents/run",
            json=mock_agent_request,
            headers=auth_headers
        )
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Verify custom temperature is reflected in metadata
        assert data["metadata"]["temperature"] == 0.5
    
    def test_run_agent_with_tools(self, client, auth_headers, mock_agent_request):
        """Test running agent with tools"""
        mock_agent_request["tools"] = [
            {
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "description": "Get weather information",
                    "parameters": {}
                }
            }
        ]
        
        response = client.post(
            "/api/agents/run",
            json=mock_agent_request,
            headers=auth_headers
        )
        
        assert response.status_code == status.HTTP_200_OK
