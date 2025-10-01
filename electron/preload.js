/**
 * Electron Preload Script
 * 
 * This script runs in a sandboxed context and exposes a secure API
 * to the renderer process via contextBridge.
 */

const { contextBridge, ipcRenderer } = require('electron');

// ============================================================================
// EXPOSED API
// ============================================================================

contextBridge.exposeInMainWorld('electronAPI', {
  // App Info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),

  // File Dialogs
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),

  // System Paths
  getPath: (name) => ipcRenderer.invoke('get-path', name),

  // Notifications
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  setBadgeCount: (count) => ipcRenderer.invoke('set-badge-count', count),

  // Persistent Storage (Electron Store)
  getStoreValue: (key) => ipcRenderer.invoke('get-store-value', key),
  setStoreValue: (key, value) => ipcRenderer.invoke('set-store-value', key, value),

  // IPC Communication (Listeners)
  onNavigate: (callback) => {
    ipcRenderer.on('navigate', (event, route) => callback(route));
  },
  onThemeChanged: (callback) => {
    ipcRenderer.on('theme-changed', (event, isDark) => callback(isDark));
  },
  onToggleSidebar: (callback) => {
    ipcRenderer.on('toggle-sidebar', () => callback());
  },
  onOpenCommandPalette: (callback) => {
    ipcRenderer.on('open-command-palette', () => callback());
  },
  onImportAgents: (callback) => {
    ipcRenderer.on('import-agents', () => callback());
  },
  onExportData: (callback) => {
    ipcRenderer.on('export-data', () => callback());
  },
  onFind: (callback) => {
    ipcRenderer.on('find', () => callback());
  },
  onDeepLink: (callback) => {
    ipcRenderer.on('deep-link', (event, url) => callback(url));
  },

  // Remove Listeners (Cleanup)
  removeNavigateListener: () => ipcRenderer.removeAllListeners('navigate'),
  removeThemeChangedListener: () => ipcRenderer.removeAllListeners('theme-changed'),
  removeToggleSidebarListener: () => ipcRenderer.removeAllListeners('toggle-sidebar'),
  removeOpenCommandPaletteListener: () => ipcRenderer.removeAllListeners('open-command-palette'),
  removeImportAgentsListener: () => ipcRenderer.removeAllListeners('import-agents'),
  removeExportDataListener: () => ipcRenderer.removeAllListeners('export-data'),
  removeFindListener: () => ipcRenderer.removeAllListeners('find'),
  removeDeepLinkListener: () => ipcRenderer.removeAllListeners('deep-link'),
});

// ============================================================================
// ENVIRONMENT INFO
// ============================================================================

contextBridge.exposeInMainWorld('env', {
  isElectron: true,
  isDevelopment: process.env.NODE_ENV === 'development',
  platform: process.platform,
});

// ============================================================================
// CONSOLE LOGGING (Development Only)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  console.log('Preload script loaded');
  console.log('Platform:', process.platform);
  console.log('Electron version:', process.versions.electron);
  console.log('Chrome version:', process.versions.chrome);
  console.log('Node version:', process.versions.node);
}
