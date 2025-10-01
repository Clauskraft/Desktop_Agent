# 📋 DRY-RUN EXECUTION PLAN - v1.1.0

**Projekt**: AI Agent Desktop Cockpit  
**Workspace**: `C:\Users\claus\Projects\Desktop Agent`  
**Mål**: Implementer AgentScope Sidecar + TDC CVI Enforcement  
**Status**: Klar til udførsel  
**Dato**: 2025-09-30

---

## 📊 **NUVÆRENDE TILSTAND**

### ✅ **Eksisterende Filer** (Fra tidligere sessioner)
```
C:\Users\claus\Projects\Desktop Agent\
├── package.json          ✅
├── tsconfig.json         ✅
├── vite.config.ts        ✅
├── index.html            ✅
├── README.md             ✅
├── .gitignore            ✅
├── .env.example          ✅
├── docs/
│   └── SCOPE_AND_TODO.md ✅
├── src/
│   ├── index.tsx         ✅
│   ├── App.tsx           ✅
│   ├── components/
│   │   ├── Navigation.tsx          ✅
│   │   ├── CommandPalette.tsx      ✅
│   │   └── LoadingScreen.tsx       ✅
│   ├── pages/
│   │   ├── Dashboard.tsx           ✅
│   │   ├── ChatInterface.tsx       ✅
│   │   ├── PromptLibrary.tsx       ✅
│   │   ├── ProjectManagement.tsx   ✅
│   │   ├── Settings.tsx            ✅
│   │   └── Analytics.tsx           ✅
│   ├── services/
│   │   └── APIService.ts           ✅
│   └── (tomme mapper: database, stores, styles, types, utils)
└── (tomme mapper: electron, public)
```

### ❌ **MANGLER** (Skal oprettes)
```
❌ Git repository (ikke initialiseret endnu)
❌ src/theme/ (hele TDC CVI system)
❌ src/components/ui/ (TDC wrappers)
❌ backend/ (hele backend struktur)
❌ src/database/index.ts
❌ src/stores/AppStore.ts
❌ electron/main.js, preload.js
❌ CI/CD workflows
❌ Test suites
❌ Komplet dokumentation
```

---

## 🎯 **EXECUTION PLAN** (29 Commits)

### **FASE 0: Git Initialization** 🔧

#### **Commit 0**: Initialize git repository
**Handling**: Init git, første commit  
**Impact**: 🟢 Low - Just git setup  
**Risk**: 🟢 Low - No code changes  
**Filer**: Eksisterende + .git/

**Kommandoer**:
```bash
cd "C:\Users\claus\Projects\Desktop Agent"
git init
git config user.name "Klaus Kraft"
git config user.email "klaus@tdc.dk"
git branch -M main
git checkout -b feature/agentscope-cvi
git add .
git commit -m "chore: initial commit - existing project structure"
```

---

### **FASE 1: TDC CVI Foundation** 🎨

#### **Commit 1**: feat(ui): add TDC CVI theme system
**Handling**: Opret komplet theme system  
**Impact**: 🟡 Medium - Fundamental styling infrastructure  
**Risk**: 🟢 Low - Self-contained, no dependencies  
**Filer**: 10 nye

**Nye filer** (~1,400 lines total):
```
src/theme/
├── tokens.ts              (620 lines) - Design tokens (colors, typography, spacing)
├── tdcTheme.ts           (200 lines) - MUI theme (light + dark mode)
├── components.ts         (420 lines) - Component overrides & variants
└── index.ts              (30 lines) - Barrel export

src/components/ui/
├── TdcButton.tsx         (90 lines) - Button wrapper
├── TdcTextField.tsx      (50 lines) - TextField wrapper
├── TdcCard.tsx           (65 lines) - Card wrapper
├── TdcDialog.tsx         (80 lines) - Dialog wrapper
├── TdcSnackbar.tsx       (60 lines) - Snackbar wrapper
└── index.ts              (8 lines) - Barrel export
```

**Git commit**:
```bash
git add src/theme/ src/components/ui/
git commit -m "feat(ui): add TDC CVI theme foundation

- Add design tokens (colors, typography, spacing, shapes, shadows)
- Create token-based MUI theme (light + dark mode)
- Add component overrides for MUI components
- Create TDC UI component wrappers (Button, TextField, Card, Dialog, Snackbar)
- Enforce CVI compliance through type-safe wrappers"
```

---

### **FASE 2: Backend Foundation** ⚙️

#### **Commit 2**: feat(backend): add FastAPI + AgentScope runtime
**Handling**: Opret komplet backend API  
**Impact**: 🔴 High - Core backend functionality  
**Risk**: 🟡 Medium - Complex integration  
**Filer**: 14 nye

**Nye filer** (~2,100 lines total):
```
backend/
├── requirements.txt        (32 lines) - Pip dependencies
├── requirements-dev.txt    (18 lines) - Dev dependencies
├── Makefile               (150 lines) - Build targets (uv/pip support)
├── .env.example           (50 lines) - Environment template
├── Dockerfile             (40 lines) - Docker container
├── models.py              (400 lines) - Pydantic models
├── app.py                 (600 lines) - FastAPI app with endpoints
├── agents/
│   ├── __init__.py        (100 lines) - Package exports
│   ├── runtime.py         (400 lines) - AgentScope runtime
│   └── tools.py           (150 lines) - Agent tools
└── tests/
    ├── conftest.py        (100 lines) - Pytest fixtures
    └── test_run.py        (200 lines) - Unit tests
```

**Git commit**:
```bash
git add backend/
git commit -m "feat(backend): add FastAPI + AgentScope runtime

- Add AgentScope runtime with agent execution
- Create REST (/agents/run) and WebSocket (/agents/stream) endpoints
- Add authentication and rate limiting
- Include comprehensive test suite
- Add Makefile with install/dev/test/build targets
- Add Docker containerization"
```

---

### **FASE 3: State & Database** 💾

#### **Commit 3**: feat(data): add database and state management
**Handling**: Opret Dexie database + Zustand store  
**Impact**: 🟡 Medium - Core data layer  
**Risk**: 🟢 Low - Standard patterns  
**Filer**: 2 nye

**Nye filer** (~1,800 lines total):
```
src/database/
└── index.ts              (900 lines) - Complete IndexedDB schema (Dexie)

src/stores/
└── AppStore.ts          (900 lines) - Zustand global state
```

**Git commit**:
```bash
git add src/database/ src/stores/
git commit -m "feat(data): add database and state management

- Add IndexedDB schema with Dexie (agents, projects, chats, messages)
- Create Zustand store with persistence
- Add subscriptions for side effects"
```

---

### **FASE 4: Frontend Integration** 🔌

#### **Commit 4**: feat(frontend): add AgentScope client
**Handling**: Opret REST + WebSocket client  
**Impact**: 🟡 Medium - API integration  
**Risk**: 🟡 Medium - Network dependencies  
**Filer**: 2 nye

**Nye filer** (~500 lines total):
```
src/services/
├── AgentScopeClient.ts   (400 lines) - REST + WS client
└── agentScope.types.ts   (100 lines) - TypeScript types
```

**Git commit**:
```bash
git add src/services/AgentScopeClient.ts src/services/agentScope.types.ts
git commit -m "feat(frontend): add AgentScope client

- Create REST client for /agents/run
- Add WebSocket client for streaming
- Include error handling and reconnection logic
- Add TypeScript types for API contracts"
```

#### **Commit 5**: feat(ui): add AgentScope settings panel
**Handling**: Settings UI for backend config  
**Impact**: 🟢 Low - UI only  
**Risk**: 🟢 Low - No dependencies  
**Filer**: 1 ny, 1 modified

**Nye/ændrede filer**:
```
src/pages/
├── AgentScopeSettings.tsx    (200 lines) - NEW: Settings panel
└── Settings.tsx              - MOD: Add AgentScope tab
```

**Git commit**:
```bash
git add src/pages/AgentScopeSettings.tsx src/pages/Settings.tsx
git commit -m "feat(ui): add AgentScope settings panel

- Create settings UI for backend configuration
- Add connection status indicator
- Include test connection button
- Integrate into main Settings page"
```

#### **Commit 6**: feat(chat): integrate AgentScope in chat interface
**Handling**: Use client in ChatInterface  
**Impact**: 🟡 Medium - Core feature integration  
**Risk**: 🟡 Medium - Complex interaction  
**Filer**: 1 modified

**Ændrede filer**:
```
src/pages/ChatInterface.tsx   - MOD: Use AgentScopeClient for streaming
```

**Git commit**:
```bash
git add src/pages/ChatInterface.tsx
git commit -m "feat(chat): integrate AgentScope in chat interface

- Connect chat to AgentScope backend
- Add streaming response handling
- Include fallback to direct API if backend unavailable
- Add feature flag ENABLE_AGENTSCOPE"
```

---

### **FASE 5: CVI Migration** 🎨 (7 commits)

**Pattern**: Migrate hver eksisterende komponent til at bruge TDC theme tokens

#### **Commits 7-13**: Migrate components to CVI

| Commit | File | Impact | Lines Changed |
|--------|------|--------|---------------|
| 7 | Dashboard.tsx | 🟡 Medium | ~100 |
| 8 | ChatInterface.tsx | 🟡 Medium | ~150 |
| 9 | ProjectManagement.tsx | 🟢 Low | ~80 |
| 10 | PromptLibrary.tsx | 🟢 Low | ~70 |
| 11 | Analytics.tsx | 🟡 Medium | ~100 |
| 12 | Settings.tsx | 🟢 Low | ~60 |
| 13 | Navigation.tsx | 🟡 Medium | ~90 |

**Changes per file**:
```typescript
BEFORE: style={{ color: '#003D7A', padding: '16px' }}
AFTER:  Using theme.palette.primary.main, theme.spacing(2)

BEFORE: sx={{ bgcolor: '#f5f5f5' }}
AFTER:  sx={{ bgcolor: 'background.elevated' }}

BEFORE: <Button variant="contained">
AFTER:  <TdcButton variant="primary">
```

**Git commit template**:
```bash
git add src/pages/Dashboard.tsx
git commit -m "refactor(ui): migrate Dashboard to TDC CVI

- Replace inline styles with theme tokens
- Use TDC component wrappers
- Remove hard-coded colors and spacing"
```

---

### **FASE 6: CVI Enforcement** 🛡️

#### **Commit 14**: build(lint): add ESLint CVI rules
**Handling**: Forbyd inline styles og rå farver  
**Impact**: 🟡 Medium - May break build  
**Risk**: 🟡 Medium - Need to fix violations  
**Filer**: 1 ny

**Nye filer**:
```
.eslintrc.cvi.cjs          (150 lines) - ESLint rules that FAIL on violations
```

#### **Commit 15**: build(lint): add Stylelint config
**Handling**: CSS/SCSS linting  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 1 ny

**Nye filer**:
```
stylelint.config.cjs       (80 lines) - CSS linting rules
```

#### **Commit 16**: build(ci): add CVI scan script
**Handling**: Automated violation detection  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 1 ny

**Nye filer**:
```
scripts/cvi-scan.js        (200 lines) - Scan for hex/rgb/inline styles
```

#### **Commit 17**: test(visual): add Playwright smoke tests
**Handling**: Visual regression testing  
**Impact**: 🟡 Medium - Test infrastructure  
**Risk**: 🟡 Medium - Snapshots need baseline  
**Filer**: 4 nye

**Nye filer**:
```
tests/visual/
├── playwright.config.ts   (60 lines)
├── dashboard.spec.ts      (80 lines)
├── chat.spec.ts           (100 lines)
└── settings.spec.ts       (70 lines)
```

#### **Commit 18**: docs(cvi): add brand guidelines
**Handling**: CVI documentation  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 3 nye

**Nye filer**:
```
docs/brand/
├── TDC-CVI.md            (300 lines) - Brand guidelines
├── cvi-migration.md      (250 lines) - Migration guide
└── cvi-violations.json   - Auto-generated report
```

---

### **FASE 7: CI/CD** 🚀

#### **Commits 19-23**: Add GitHub Actions workflows

| Commit | Workflow | Description |
|--------|----------|-------------|
| 19 | backend.yml | Build, test, lint backend |
| 20 | frontend.yml | Build, test, lint, CVI guard |
| 21 | electron.yml | Desktop builds (Win/Mac/Linux) |
| 22 | visual-tests.yml | Playwright visual regression |
| 23 | release.yml | Auto-release on tag |

**Nye filer** (~450 lines total):
```
.github/workflows/
├── backend.yml           (80 lines)
├── frontend.yml          (100 lines)
├── electron.yml          (120 lines)
├── visual-tests.yml      (60 lines)
└── release.yml           (90 lines)
```

#### **Commit 24**: ci: add SBOM generation
**Handling**: Generate software bill of materials  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: Modified workflows

**Ændrede filer**:
```
.github/workflows/
├── backend.yml           - ADD: Generate pip SBOM
└── frontend.yml          - ADD: Generate npm SBOM
```

---

### **FASE 8: Documentation** 📚

#### **Commit 25**: docs: add comprehensive guides
**Handling**: Complete documentation suite  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 8 nye

**Nye filer** (~1,600 lines total):
```
docs/
├── API-CONTRACT.md           (400 lines) - API specification
├── INSTALL.md                (250 lines) - Installation guide
├── SECURITY.md               (200 lines) - Security policy
├── PLAYBOOK.md               (300 lines) - Operational guide
├── adr/
│   ├── 0001-agentscope-sidecar.md  (200 lines)
│   └── 0002-cvi-enforcement.md     (150 lines)
└── coverage-summary.md       (100 lines) - Test coverage
```

#### **Commit 26**: docs: update SCOPE_AND_TODO
**Handling**: Update project tracking  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 1 modified

**Ændrede filer**:
```
docs/SCOPE_AND_TODO.md    - MOD: Mark completed phases
```

#### **Commit 27**: docs: update BUILD_SUMMARY
**Handling**: Build documentation  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 1 ny/modified

**Nye/ændrede filer**:
```
docs/BUILD_SUMMARY.md     - UPDATE: v1.1.0 features
```

#### **Commit 28**: docs: add release checklist
**Handling**: Pre-release verification  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 1 ny

**Nye filer**:
```
docs/release-checklist.md  (80 lines)
```

---

### **FASE 9: Release** 🎉

#### **Commit 29**: release: v1.1.0
**Handling**: Version bump, changelog, release notes  
**Impact**: 🟢 Low  
**Risk**: 🟢 Low  
**Filer**: 3 nye, 1 modified

**Nye/ændrede filer**:
```
CHANGELOG.md              (150 lines) - NEW: Version history
RELEASE_NOTES.md          (150 lines) - NEW: v1.1.0 notes
package.json              - MOD: Bump to 1.1.0
```

**Git actions**:
```bash
git add CHANGELOG.md RELEASE_NOTES.md package.json
git commit -m "release: v1.1.0

AgentScope Sidecar + TDC CVI Enforcement

Major Features:
- AgentScope backend integration
- Complete TDC CVI compliance
- Visual regression testing
- CI/CD automation
- Comprehensive documentation"

git tag v1.1.0
git push origin feature/agentscope-cvi
git push origin v1.1.0
```

---

## 📊 **SAMLET OVERSIGT**

| Fase | Commits | Filer | Lines | Effort | Risk |
|------|---------|-------|-------|--------|------|
| 0: Git Init | 1 | 0 | 0 | 15m | 🟢 Low |
| 1: CVI Foundation | 1 | 10 | 1,400 | 2h | 🟢 Low |
| 2: Backend | 1 | 14 | 2,100 | 3h | 🟡 Medium |
| 3: State & DB | 1 | 2 | 1,800 | 2h | 🟢 Low |
| 4: Frontend Integration | 3 | 4 | 800 | 3h | 🟡 Medium |
| 5: CVI Migration | 7 | 7 | 750 | 7h | 🟢 Low |
| 6: CVI Enforcement | 5 | 9 | 1,000 | 4h | 🟡 Medium |
| 7: CI/CD | 5 | 6 | 550 | 4h | 🟡 Medium |
| 8: Documentation | 4 | 11 | 2,100 | 4h | 🟢 Low |
| 9: Release | 1 | 4 | 400 | 1h | 🟢 Low |
| **TOTAL** | **29** | **67** | **11,900** | **30h** | **🟡 Medium** |

---

## ✅ **ACCEPTANCE CRITERIA** (Definition of Done)

Alle disse skal være grønne før v1.1.0 release:

### **1. Build & Tests**
```bash
# Frontend
npm ci
npm run typecheck      # ✅ No TypeScript errors
npm run lint           # ✅ No linting errors
npm run test           # ✅ All tests pass
npm run build          # ✅ Build succeeds

# Backend
cd backend
make install
make test              # ✅ All tests pass
make lint              # ✅ No linting errors
```

### **2. CVI Compliance**
```bash
npm run cvi:lint       # ✅ No CVI violations
npm run cvi:scan       # ✅ No inline styles or hard-coded colors
npm run test:visual    # ✅ Visual regression tests pass
```

### **3. Electron Builds**
```bash
npm run electron:build # ✅ Windows/Mac/Linux builds succeed
```

### **4. Documentation**
- ✅ All README sections complete
- ✅ API documentation generated
- ✅ Installation guide verified
- ✅ Security policy reviewed

### **5. SBOM Generation**
- ✅ npm SBOM generated
- ✅ pip SBOM generated
- ✅ Both attached to GitHub Release

### **6. Git & GitHub**
- ✅ All commits pushed
- ✅ Tag v1.1.0 created
- ✅ GitHub Release published
- ✅ Artifacts uploaded

---

## 🛡️ **ROLLBACK PLAN**

Hvis noget går galt:

### **Rollback til Specifik Fase**
```bash
# Rollback to before a specific commit
git log --oneline
git reset --hard <commit-hash>
```

### **Feature Flags** (Runtime disable)
```bash
# Disable AgentScope
ENABLE_AGENTSCOPE=false

# Disable strict CVI enforcement
ENABLE_CVI_STRICT=false
```

### **Komplet Rollback**
```bash
git checkout main
git branch -D feature/agentscope-cvi
```

---

## 🚀 **EXECUTION WORKFLOW**

### **Før Jeg Starter**
1. ✅ Bekræft workspace: `C:\Users\claus\Projects\Desktop Agent`
2. ✅ Verificer skriveadgang
3. ⏸️ **AWAITING YOUR APPROVAL**

### **Under Execution**
1. Udfør commits i rækkefølge
2. Verificer efter hver fase
3. Rapport progress efter hver 5. commit

### **Efter Completion**
1. Kør alle verifikations-kommandoer
2. Generer commit-liste
3. Post CI-status
4. Lever verifikations-guide

---

## ❓ **AWAITING APPROVAL**

**Status**: ⏸️ **PAUSED** - Venter på din godkendelse

Svar venligst med:
- **"GODKEND PLAN"** → Jeg starter execution af alle 29 commits
- **"MODIFY X"** → Jeg justerer planen først
- **"HOLD"** → Vi diskuterer mere først

**Når godkendt**, starter jeg med:
1. **Commit 0**: Git initialization
2. **Commit 1**: TDC CVI theme system
3. **Commit 2**: Backend foundation
4. ... og fortsætter gennem alle 29 commits

**Total tid**: ~30 timer koncentreret arbejde  
**Risk**: 🟡 MEDIUM (med robust rollback support)

---

**Plan klar til udførsel** ✅  
**Workspace verificeret** ✅  
**Awaiting "GODKEND PLAN"** ⏸️
