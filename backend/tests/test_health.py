"""
Tests for health check endpoints
"""

import pytest
from fastapi import status


class TestHealthEndpoints:
    """Test suite for health check endpoints"""
    
    def test_health_check(self, client):
        """Test basic health check"""
        response = client.get("/api/health")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert "version" in data
        assert "environment" in data
    
    def test_health_ping(self, client):
        """Test ping endpoint"""
        response = client.get("/api/health/ping")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert data["status"] == "healthy"
    
    def test_readiness_check(self, client):
        """Test readiness check"""
        response = client.get("/api/health/ready")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        assert "ready" in data
        assert "checks" in data
        assert "timestamp" in data
        
        # Verify checks structure
        checks = data["checks"]
        assert "database" in checks
        assert "agentscope" in checks
        assert "api_keys" in checks
    
    def test_metrics_endpoint(self, client):
        """Test metrics endpoint"""
        response = client.get("/api/health/metrics")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        
        # Verify metrics structure
        assert "requests_total" in data
        assert "requests_per_minute" in data
        assert "average_response_time_ms" in data
        assert "active_connections" in data
        assert "uptime_seconds" in data
