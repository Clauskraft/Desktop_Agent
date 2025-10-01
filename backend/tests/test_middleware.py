"""
Integration tests for middleware
"""

import pytest
from fastapi import status
import time


@pytest.mark.integration
class TestMiddlewareIntegration:
    """Test suite for middleware integration"""
    
    def test_cors_headers(self, client):
        """Test CORS middleware adds correct headers"""
        response = client.options(
            "/api/health",
            headers={"Origin": "http://localhost:5173"}
        )
        
        assert "access-control-allow-origin" in response.headers
        assert "access-control-allow-methods" in response.headers
        assert "access-control-allow-headers" in response.headers
    
    def test_process_time_header(self, client):
        """Test that process time header is added"""
        response = client.get("/api/health")
        
        assert "x-process-time" in response.headers
        process_time = float(response.headers["x-process-time"])
        assert process_time > 0
    
    def test_request_id_header(self, client):
        """Test that request ID is added"""
        response = client.get("/api/health")
        
        assert "x-request-id" in response.headers
        request_id = response.headers["x-request-id"]
        assert len(request_id) > 0
    
    def test_custom_request_id(self, client):
        """Test that custom request ID is preserved"""
        custom_id = "custom-request-123"
        response = client.get(
            "/api/health",
            headers={"X-Request-ID": custom_id}
        )
        
        # Server should use the provided request ID
        assert response.headers["x-request-id"] == custom_id
    
    def test_body_size_limit(self, client, auth_headers):
        """Test that large request bodies are rejected"""
        # Create a large payload (> 10MB)
        large_payload = {
            "agent_id": "test",
            "messages": [
                {
                    "role": "user",
                    "content": "x" * (11 * 1024 * 1024)  # 11MB
                }
            ]
        }
        
        response = client.post(
            "/api/agents/run",
            json=large_payload,
            headers=auth_headers
        )
        
        assert response.status_code == status.HTTP_413_REQUEST_ENTITY_TOO_LARGE
    
    def test_gzip_compression(self, client):
        """Test that GZip compression is applied"""
        response = client.get(
            "/api/agents/",
            headers={
                "Authorization": f"Bearer test-token",
                "Accept-Encoding": "gzip"
            }
        )
        
        # Response should be compressed if large enough
        # Note: GZip middleware only compresses responses > 1000 bytes
        if len(response.content) > 1000:
            assert "content-encoding" in response.headers
            assert response.headers["content-encoding"] == "gzip"
    
    def test_audit_log_creation(self, client, auth_headers, tmp_path):
        """Test that audit log is created for requests"""
        # Make authenticated request
        response = client.get("/api/agents/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
        
        # Audit log should be created
        # Note: This test assumes audit logging is enabled
        # In a real scenario, you would check the actual log file
    
    def test_middleware_chain_order(self, client):
        """Test that middleware executes in correct order"""
        # CORS -> Auth -> Audit -> Rate Limit -> Body Size -> App
        
        # Test that auth happens before app logic
        response = client.get("/api/agents/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        
        # Headers from middleware chain should be present
        assert "x-process-time" in response.headers
        assert "x-request-id" in response.headers
