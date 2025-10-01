"""
Authentication Middleware
Token-based authentication for API endpoints
"""

from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
import structlog

from app.config import settings

logger = structlog.get_logger(__name__)

# Public endpoints that don't require authentication
PUBLIC_PATHS = {
    "/",
    "/api",
    "/api/health",
    "/api/health/ping",
    "/api/health/ready",
    "/api/docs",
    "/api/redoc",
    "/api/openapi.json",
}


class AuthMiddleware(BaseHTTPMiddleware):
    """
    Authentication middleware that validates API tokens
    """
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
    
    async def dispatch(self, request: Request, call_next):
        """
        Validate authentication token for protected endpoints
        """
        # Skip authentication for public paths
        if request.url.path in PUBLIC_PATHS or request.url.path.startswith("/api/docs"):
            return await call_next(request)
        
        # Get token from header
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            logger.warning("missing_auth_header", path=request.url.path)
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Missing authentication token"},
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Validate token format
        try:
            scheme, token = auth_header.split()
            if scheme.lower() != "bearer":
                raise ValueError("Invalid authentication scheme")
        except ValueError:
            logger.warning("invalid_auth_format", path=request.url.path)
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Invalid authentication format. Use: Bearer <token>"},
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Validate token
        if token != settings.API_TOKEN:
            logger.warning("invalid_token", path=request.url.path)
            return JSONResponse(
                status_code=status.HTTP_403_FORBIDDEN,
                content={"detail": "Invalid authentication token"},
            )
        
        # Token is valid, continue
        logger.debug("authenticated_request", path=request.url.path)
        return await call_next(request)
