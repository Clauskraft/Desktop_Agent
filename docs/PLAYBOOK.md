# 📖 Operational Playbook

## Overview

This playbook provides operational procedures for deploying, monitoring, and maintaining the AI Agent Desktop Cockpit.

---

## 🚀 **Deployment**

### Prerequisites
- Node.js ≥18.0.0
- Python ≥3.11
- Docker (optional)
- Git

### Initial Setup

```bash
# Clone repository
git clone https://github.com/yourusername/agent-cockpit.git
cd agent-cockpit

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
make install
cd ..

# Configure environment
cp .env.example .env
# Edit .env with your API keys
```

### Development Mode

```bash
# Terminal 1: Start backend
cd backend
make dev

# Terminal 2: Start frontend
npm run dev

# Terminal 3: Start Electron (optional)
npm run electron:dev
```

### Production Build

```bash
# Build frontend
npm run build

# Build backend
cd backend
make build

# Build Electron apps
npm run electron:build
```

### Docker Deployment

```bash
cd backend
docker-compose up -d
```

---

## 🔍 **Monitoring**

### Health Checks

```bash
# Backend health
curl http://localhost:8000/api/health

# Expected response:
{
  "status": "healthy",
  "version": "1.1.0",
  "uptime": "..."
}
```

### Logs

```bash
# Backend logs
cd backend
docker-compose logs -f

# Or if running locally:
tail -f backend/logs/app.log
```

### Metrics

Monitor these key metrics:
- **Response Time**: API endpoints should respond < 200ms
- **Token Usage**: Track daily/monthly token consumption
- **Error Rate**: Should be < 1%
- **Memory Usage**: Backend should stay < 512MB
- **Database Size**: Monitor IndexedDB growth

---

## 🐛 **Troubleshooting**

### Common Issues

#### Backend Won't Start

```bash
# Check if port 8000 is in use
netstat -an | grep 8000

# Check Python version
python --version  # Must be ≥3.11

# Reinstall dependencies
cd backend
rm -rf venv
make install
```

#### Frontend Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### Electron App Crashes

```bash
# Check Electron logs
# Windows: %APPDATA%\agent-cockpit\logs
# macOS: ~/Library/Logs/agent-cockpit
# Linux: ~/.config/agent-cockpit/logs
```

#### Database Issues

```bash
# Clear IndexedDB (dev mode)
# Open DevTools → Application → IndexedDB → Delete
```

---

## 🔐 **Security**

### API Key Management

- Store keys in `.env` (never commit!)
- Use environment-specific keys
- Rotate keys every 90 days
- Use key vaults in production

### Authentication

```bash
# Generate new auth token
python backend/scripts/gen_token.py
```

### Audit Logs

```bash
# View audit logs
cat backend/logs/audit.log

# Filter by user
grep "user_id=123" backend/logs/audit.log
```

---

## 🔄 **Backup & Recovery**

### Database Backup

```bash
# Backup IndexedDB
# Export from Settings → Data → Export
```

### Configuration Backup

```bash
# Backup configs
tar -czf backup-$(date +%Y%m%d).tar.gz \
  .env \
  backend/.env \
  electron/config
```

### Restore

```bash
# Restore from backup
tar -xzf backup-YYYYMMDD.tar.gz
```

---

## 📊 **Performance Optimization**

### Frontend

- **Code Splitting**: Lazy load routes
- **Image Optimization**: Use WebP format
- **Caching**: Enable service worker
- **Bundle Size**: Keep < 300KB (gzipped)

### Backend

- **Database Indexing**: Add indexes for queries
- **Caching**: Use Redis for API responses
- **Connection Pooling**: Limit to 20 connections
- **Rate Limiting**: 100 req/min per user

---

## 🚨 **Incident Response**

### Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| P0 | System down | < 15 minutes |
| P1 | Critical feature broken | < 1 hour |
| P2 | Major feature degraded | < 4 hours |
| P3 | Minor issue | < 24 hours |

### Escalation

1. **On-Call Engineer**: First responder
2. **Tech Lead**: If not resolved in 30 min
3. **Engineering Manager**: If not resolved in 2 hours

### Rollback Procedure

```bash
# Rollback to previous version
git checkout v1.0.0
npm install
npm run build
npm run electron:build

# Or use Docker
docker-compose down
docker-compose up -d --force-recreate
```

---

## 📈 **Scaling**

### Horizontal Scaling

```bash
# Add more backend instances
docker-compose up --scale backend=3
```

### Vertical Scaling

- Increase memory limits in docker-compose.yml
- Upgrade database instance size
- Enable CDN for static assets

---

## 🔧 **Maintenance**

### Regular Tasks

**Daily**:
- Check error logs
- Monitor disk space
- Review performance metrics

**Weekly**:
- Update dependencies
- Review security alerts
- Backup configurations

**Monthly**:
- Rotate API keys
- Update documentation
- Performance audit

### Dependency Updates

```bash
# Check for updates
npm outdated
cd backend && pip list --outdated

# Update safely
npm update
cd backend && make update
```

---

## 📞 **Support Contacts**

- **Tech Support**: support@example.com
- **On-Call**: +1-XXX-XXX-XXXX
- **Slack**: #agent-cockpit-support
- **Documentation**: https://docs.example.com

---

## 📝 **Change Log**

Track all production changes in CHANGELOG.md

---

**Last Updated**: 2025-10-01  
**Version**: 1.1.0  
**Maintained by**: TDC Team
