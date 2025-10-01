"""
Audit Log Middleware
Logs all API requests for security and compliance
"""

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
import structlog
import time
import json
from pathlib import Path

from app.config import settings

logger = structlog.get_logger(__name__)


class AuditLogMiddleware(BaseHTTPMiddleware):
    """
    Audit log middleware that records all API requests
    """
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        
        # Ensure log directory exists
        log_file = Path(settings.AUDIT_LOG_FILE)
        log_file.parent.mkdir(parents=True, exist_ok=True)
    
    async def dispatch(self, request: Request, call_next):
        """
        Log request details before and after processing
        """
        start_time = time.time()
        
        # Collect request info
        request_info = {
            "timestamp": time.time(),
            "method": request.method,
            "path": request.url.path,
            "query_params": dict(request.query_params),
            "client_ip": request.client.host if request.client else None,
            "user_agent": request.headers.get("user-agent"),
            "request_id": request.headers.get("X-Request-ID"),
        }
        
        # Process request
        response = await call_next(request)
        
        # Add response info
        request_info.update({
            "status_code": response.status_code,
            "duration_ms": (time.time() - start_time) * 1000,
        })
        
        # Write to audit log
        try:
            with open(settings.AUDIT_LOG_FILE, "a") as f:
                f.write(json.dumps(request_info) + "\n")
        except Exception as e:
            logger.error("audit_log_write_failed", error=str(e))
        
        # Also log to structured logger
        logger.info("audit_log", **request_info)
        
        return response
