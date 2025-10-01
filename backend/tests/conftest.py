"""
Test configuration and fixtures
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings


@pytest.fixture
def client():
    """Test client fixture"""
    return TestClient(app)


@pytest.fixture
def auth_headers():
    """Authentication headers fixture"""
    return {
        "Authorization": f"Bearer {settings.API_TOKEN}"
    }


@pytest.fixture
def mock_agent_request():
    """Mock agent request fixture"""
    return {
        "agent_id": "test-agent",
        "messages": [
            {
                "role": "user",
                "content": "Hello, world!"
            }
        ],
        "temperature": 0.7,
        "max_tokens": 100,
    }
