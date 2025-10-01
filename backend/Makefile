# Makefile for AgentScope Backend
# Supports both uv and pip package managers

.PHONY: help install dev test build clean lint format

# Default target
.DEFAULT_GOAL := help

# Package manager detection
PYTHON := python3
PIP := pip3

# Check if uv is available
UV_EXISTS := $(shell command -v uv 2> /dev/null)
ifdef UV_EXISTS
    PKG_MANAGER := uv
    INSTALL_CMD := uv pip install
else
    PKG_MANAGER := pip
    INSTALL_CMD := $(PIP) install
endif

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'
	@echo ''
	@echo 'Package manager: $(PKG_MANAGER)'

install: ## Install production dependencies
	@echo "📦 Installing production dependencies with $(PKG_MANAGER)..."
	$(INSTALL_CMD) -r requirements.txt
	@echo "✅ Production dependencies installed"

install-dev: install ## Install development dependencies
	@echo "📦 Installing development dependencies with $(PKG_MANAGER)..."
	$(INSTALL_CMD) -r requirements-dev.txt
	@echo "✅ Development dependencies installed"

dev: ## Start development server
	@echo "🚀 Starting development server..."
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

test: ## Run tests
	@echo "🧪 Running tests..."
	pytest tests/ -v --cov=app --cov-report=term-missing --cov-report=html
	@echo "✅ Tests complete. Coverage report: htmlcov/index.html"

test-fast: ## Run tests without coverage
	@echo "🧪 Running tests (fast)..."
	pytest tests/ -v
	@echo "✅ Tests complete"

lint: ## Run linters
	@echo "🔍 Running linters..."
	ruff check app/ tests/
	mypy app/ --ignore-missing-imports
	@echo "✅ Linting complete"

format: ## Format code
	@echo "✨ Formatting code..."
	black app/ tests/
	isort app/ tests/
	@echo "✅ Code formatted"

format-check: ## Check if code is formatted
	@echo "🔍 Checking code format..."
	black app/ tests/ --check
	isort app/ tests/ --check
	@echo "✅ Format check complete"

build: clean ## Build production package
	@echo "📦 Building production package..."
	$(PYTHON) -m pip install build
	$(PYTHON) -m build
	@echo "✅ Build complete. Package in dist/"

clean: ## Clean build artifacts
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf build/
	rm -rf *.egg-info
	rm -rf .pytest_cache
	rm -rf .coverage
	rm -rf htmlcov/
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	@echo "✅ Cleaned"

migrate: ## Run database migrations
	@echo "🔄 Running database migrations..."
	alembic upgrade head
	@echo "✅ Migrations complete"

migrate-create: ## Create new migration
	@echo "📝 Creating new migration..."
	@read -p "Migration name: " name; \
	alembic revision --autogenerate -m "$$name"
	@echo "✅ Migration created"

docker-build: ## Build Docker image
	@echo "🐳 Building Docker image..."
	docker build -t agent-cockpit-backend:latest .
	@echo "✅ Docker image built"

docker-run: ## Run Docker container
	@echo "🐳 Running Docker container..."
	docker run -p 8000:8000 --env-file .env agent-cockpit-backend:latest

docker-dev: ## Run Docker container in dev mode
	@echo "🐳 Running Docker container (dev)..."
	docker run -p 8000:8000 -v $$(pwd):/app --env-file .env agent-cockpit-backend:latest

check: lint test ## Run all checks (lint + test)
	@echo "✅ All checks passed"

setup: install-dev ## Initial setup
	@echo "🔧 Setting up project..."
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env from .env.example..."; \
		cp .env.example .env; \
		echo "⚠️  Please edit .env with your configuration"; \
	fi
	@echo "✅ Setup complete"

info: ## Show project info
	@echo "📊 Project Information"
	@echo "────────────────────────────────────"
	@echo "Package manager: $(PKG_MANAGER)"
	@echo "Python version: $$($(PYTHON) --version)"
	@echo "Project: AgentScope Backend"
	@echo "────────────────────────────────────"
