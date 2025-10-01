# TDC Corporate Visual Identity (CVI) Guidelines

## Overview

This document outlines the TDC Corporate Visual Identity implementation in the Agent Cockpit project.

## Color System

### Primary Colors
- **Digital Blue**: `#003D7A` - Main brand color
- **Light Blue**: `#0066CC` - Secondary variant
- **Sky Blue**: `#4DA6FF` - Accent color

### Usage Rules
1. **NEVER use hard-coded colors** in components
2. **ALWAYS import from** `theme/tokens.ts`
3. **USE TDC UI components** instead of raw MUI

```typescript
// ❌ WRONG
<Box sx={{ color: '#003D7A' }}>

// ✅ CORRECT
import { colors } from '../theme/tokens';
<Box sx={{ color: colors.primary.main }}>
```

## Component Usage

### TDC UI Components
Always use TDC-wrapped components:
- `TdcButton` instead of `Button`
- `TdcCard` instead of `Card`
- `TdcTextField` instead of `TextField`
- `TdcDialog` instead of `Dialog`
- `TdcSnackbar` instead of `Snackbar`

### Glassmorphism
For glassmorphism effects, use the `glass` prop:
```typescript
<TdcCard glass>Content</TdcCard>
```

## Enforcement

### ESLint Rules
- Blocks hex colors: `#FFFFFF`
- Blocks RGB: `rgb(0, 0, 0)`
- Blocks inline styles: `style={{}}`

### CVI Scan
Run the CVI scanner:
```bash
npm run cvi:scan
```

### Visual Tests
Playwright visual regression tests ensure CVI compliance:
```bash
npm run test:e2e
```

## Migration Guide

### Step 1: Import tokens
```typescript
import { colors, spacing, borderRadius } from '../theme/tokens';
```

### Step 2: Replace hard-coded values
```typescript
// Before
sx={{ 
  color: '#003D7A', 
  padding: '16px',
  borderRadius: '8px' 
}}

// After
sx={{ 
  color: colors.primary.main,
  padding: spacing[4],
  borderRadius: borderRadius.base
}}
```

### Step 3: Use TDC components
```typescript
// Before
import { Button } from '@mui/material';
<Button>Click</Button>

// After
import { TdcButton } from '../components/ui';
<TdcButton>Click</TdcButton>
```

## Resources

- Design Tokens: `src/theme/tokens.ts`
- Theme Config: `src/theme/tdcTheme.ts`
- Component Overrides: `src/theme/components.ts`
- TDC UI Components: `src/components/ui/`
