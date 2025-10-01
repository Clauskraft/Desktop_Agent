# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@example.com.

**Please do not report security vulnerabilities through public GitHub issues.**

## Security Features

### Authentication
- Bearer token authentication
- API token encryption (AES-256)
- Secure token storage (electron-store)

### Network Security
- HTTPS/TLS encryption
- CORS configuration
- Rate limiting (60 req/min)
- Body size limits (10MB)

### Data Protection
- API keys encrypted at rest
- No plain-text password storage
- Audit logging enabled
- Content Security Policy headers

### Best Practices

1. **API Keys**
   - Never commit `.env` files
   - Rotate keys regularly
   - Use environment variables

2. **Backend**
   - Keep dependencies updated
   - Enable HTTPS in production
   - Use strong API tokens

3. **Frontend**
   - No sensitive data in localStorage
   - Sanitize user inputs
   - Use secure WebSocket connections

## Compliance

- Input sanitization (XSS prevention)
- SQL injection protection
- CSRF protection
- Rate limiting
- Audit logs for compliance

## Updates

Security updates are released as needed. Monitor:
- GitHub Security Advisories
- Dependabot alerts
- Release notes

## Contact

Security Team: security@example.com
