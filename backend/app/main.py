"""
FastAPI Main Application
AgentScope Backend with authentication, CORS, rate limiting, and monitoring
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
import structlog
import time
from typing import Callable

from app.config import settings
from app.middleware.auth import AuthMiddleware
from app.middleware.audit import AuditLogMiddleware
from app.routes import agents, health

# Configure structured logging
logger = structlog.get_logger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager
    Handles startup and shutdown events
    """
    # Startup
    logger.info("application_startup", version=settings.APP_VERSION, env=settings.APP_ENV)
    
    # Initialize database connection pool
    # Initialize AgentScope runtime
    # Load models
    
    yield
    
    # Shutdown
    logger.info("application_shutdown")
    # Close database connections
    # Cleanup resources


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI Agent Management Backend with AgentScope",
    docs_url="/api/docs" if settings.DEBUG else None,
    redoc_url="/api/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# ============================================================================
# MIDDLEWARE
# ============================================================================

# CORS Middleware
if settings.CORS_ENABLED:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["X-Request-ID", "X-RateLimit-Remaining"],
    )

# GZip Compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Authentication Middleware
app.add_middleware(AuthMiddleware)

# Audit Log Middleware
if settings.AUDIT_LOG_ENABLED:
    app.add_middleware(AuditLogMiddleware)


# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next: Callable):
    """Add processing time header to all responses"""
    start_time = time.time()
    
    # Add request ID
    request_id = request.headers.get("X-Request-ID", f"req_{int(time.time() * 1000)}")
    
    response = await call_next(request)
    
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    response.headers["X-Request-ID"] = request_id
    
    # Log request
    logger.info(
        "http_request",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        process_time=process_time,
        request_id=request_id,
    )
    
    return response


# Body size limit middleware
@app.middleware("http")
async def limit_upload_size(request: Request, call_next: Callable):
    """Limit request body size"""
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > settings.MAX_BODY_SIZE:
        return JSONResponse(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            content={"detail": "Request body too large"},
        )
    return await call_next(request)


# ============================================================================
# ROUTES
# ============================================================================

# Health check endpoints
app.include_router(health.router, prefix="/api/health", tags=["Health"])

# Agent endpoints
app.include_router(agents.router, prefix="/api/agents", tags=["Agents"])


# ============================================================================
# ROOT ENDPOINT
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
        "status": "operational",
        "docs": "/api/docs" if settings.DEBUG else "disabled",
    }


@app.get("/api")
async def api_info():
    """API information endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "endpoints": {
            "health": "/api/health",
            "agents": "/api/agents",
            "docs": "/api/docs" if settings.DEBUG else "disabled",
        },
    }


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(
        "unhandled_exception",
        error=str(exc),
        path=request.url.path,
        method=request.method,
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "request_id": request.headers.get("X-Request-ID"),
        },
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        workers=1 if settings.DEBUG else settings.WORKERS,
        log_level=settings.LOG_LEVEL.lower(),
    )
