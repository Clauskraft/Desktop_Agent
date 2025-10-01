"""
Application Configuration
Uses Pydantic Settings for environment variable management
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # Application
    APP_NAME: str = "AgentScope Backend"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    WORKERS: int = 4
    
    # Security
    SECRET_KEY: str = "change-this-in-production"
    API_TOKEN: str = "change-this-in-production"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    CORS_ENABLED: bool = True
    
    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_PER_MINUTE: int = 60
    RATE_LIMIT_PER_HOUR: int = 1000
    
    # Body Size
    MAX_BODY_SIZE: int = 10485760  # 10MB
    
    # Database
    DATABASE_URL: str = "sqlite:///./agent_cockpit.db"
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"
    
    # AgentScope
    AGENTSCOPE_MODEL: str = "gpt-4"
    AGENTSCOPE_TEMPERATURE: float = 0.7
    AGENTSCOPE_MAX_TOKENS: int = 2000
    
    # API Keys
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""
    
    # Audit Log
    AUDIT_LOG_ENABLED: bool = True
    AUDIT_LOG_FILE: str = "logs/audit.log"
    
    # Monitoring
    METRICS_ENABLED: bool = True
    HEALTH_CHECK_ENABLED: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
