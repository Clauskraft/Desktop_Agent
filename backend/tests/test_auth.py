"""
Tests for authentication middleware
"""

import pytest
from fastapi import status


class TestAuthentication:
    """Test suite for authentication"""
    
    def test_public_endpoints_no_auth(self, client):
        """Test that public endpoints don't require auth"""
        public_endpoints = [
            "/",
            "/api",
            "/api/health",
            "/api/health/ping",
            "/api/health/ready",
        ]
        
        for endpoint in public_endpoints:
            response = client.get(endpoint)
            assert response.status_code != status.HTTP_401_UNAUTHORIZED
    
    def test_protected_endpoint_no_auth(self, client):
        """Test that protected endpoints require auth"""
        response = client.get("/api/agents/")
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "Missing authentication token" in response.json()["detail"]
    
    def test_protected_endpoint_invalid_scheme(self, client):
        """Test authentication with invalid scheme"""
        headers = {"Authorization": "Basic invalid-token"}
        response = client.get("/api/agents/", headers=headers)
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert "Invalid authentication format" in response.json()["detail"]
    
    def test_protected_endpoint_invalid_token(self, client):
        """Test authentication with invalid token"""
        headers = {"Authorization": "Bearer invalid-token"}
        response = client.get("/api/agents/", headers=headers)
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
        assert "Invalid authentication token" in response.json()["detail"]
    
    def test_protected_endpoint_valid_token(self, client, auth_headers):
        """Test authentication with valid token"""
        response = client.get("/api/agents/", headers=auth_headers)
        
        assert response.status_code == status.HTTP_200_OK
    
    def test_auth_header_format(self, client):
        """Test various authentication header formats"""
        # Missing Bearer prefix
        headers = {"Authorization": "invalid-token"}
        response = client.get("/api/agents/", headers=headers)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        
        # Empty Bearer token
        headers = {"Authorization": "Bearer "}
        response = client.get("/api/agents/", headers=headers)
        assert response.status_code == status.HTTP_403_FORBIDDEN
        
        # Multiple spaces
        headers = {"Authorization": "Bearer  token  with  spaces"}
        response = client.get("/api/agents/", headers=headers)
        assert response.status_code == status.HTTP_403_FORBIDDEN
