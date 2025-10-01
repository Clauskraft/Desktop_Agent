/**
 * Global Type Definitions
 * 
 * Shared TypeScript types and interfaces used across the application.
 */

// ============================================================================
// AI PROVIDER TYPES
// ============================================================================

export type AIProvider = 'openai' | 'anthropic' | 'google' | 'azure' | 'local';

export type AIModel = 
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'claude-3-haiku'
  | 'gemini-pro'
  | 'gemini-ultra'
  | 'local-model';

export interface AIConfig {
  provider: AIProvider;
  model: AIModel;
  apiKey?: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}

export interface StreamingOptions {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    requestId: string;
    timestamp: string;
    duration: number;
  };
}

export interface ChatCompletionResponse {
  id: string;
  provider: AIProvider;
  model: string;
  content: string;
  role: 'assistant';
  finishReason: 'stop' | 'length' | 'content_filter' | 'function_call';
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cost: number;
  responseTime: number;
  metadata?: Record<string, any>;
}

// ============================================================================
// AGENT TYPES
// ============================================================================

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface AgentMetrics {
  totalUsage: number;
  avgResponseTime: number;
  successRate: number;
  totalCost: number;
  rating: number;
  lastUsed?: Date;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export interface ProjectMember {
  userId: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
}

export interface ProjectWebhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  enabled: boolean;
  secret?: string;
  headers?: Record<string, string>;
}

export interface ProjectAPIKey {
  id: string;
  name: string;
  provider: AIProvider;
  encryptedKey: string;
  createdAt: Date;
  lastUsed?: Date;
}

// ============================================================================
// CHAT TYPES
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost?: number;
  responseTime?: number;
  attachments?: MessageAttachment[];
  feedback?: MessageFeedback;
}

export interface MessageAttachment {
  id: string;
  type: 'file' | 'image' | 'audio' | 'video';
  name: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface MessageFeedback {
  rating: 'positive' | 'negative';
  comment?: string;
  timestamp: Date;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface UsageStatistics {
  period: 'day' | 'week' | 'month' | 'year';
  requests: number;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost: number;
  avgResponseTime: number;
  errors: number;
  providers: Record<AIProvider, number>;
  models: Record<string, number>;
}

export interface CostBreakdown {
  provider: AIProvider;
  model: string;
  requests: number;
  tokens: number;
  cost: number;
  percentage: number;
}

export interface PerformanceMetrics {
  avgResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  successRate: number;
}

// ============================================================================
// UI TYPES
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'auto';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface ToastNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ModalOptions {
  title: string;
  content: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;
  closable?: boolean;
  width?: number | string;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormField<T = any> {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea';
  value: T;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  options?: Array<{ label: string; value: any }>;
  validation?: (value: T) => string | undefined;
}

export interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// ============================================================================
// FILE TYPES
// ============================================================================

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface SearchOptions {
  query: string;
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  item: T;
  score: number;
  highlights?: Record<string, string[]>;
}

// ============================================================================
// KEYBOARD SHORTCUT TYPES
// ============================================================================

export interface KeyboardShortcut {
  id: string;
  key: string;
  modifiers: Array<'ctrl' | 'shift' | 'alt' | 'meta'>;
  description: string;
  handler: () => void;
  enabled: boolean;
}

// ============================================================================
// ELECTRON TYPES
// ============================================================================

export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  showSaveDialog: (options: any) => Promise<any>;
  showOpenDialog: (options: any) => Promise<any>;
  getPath: (name: string) => Promise<string>;
  showNotification: (options: any) => Promise<void>;
  setBadgeCount: (count: number) => Promise<void>;
  getStoreValue: (key: string) => Promise<any>;
  setStoreValue: (key: string, value: any) => Promise<void>;
  onNavigate: (callback: (route: string) => void) => void;
  onThemeChanged: (callback: (isDark: boolean) => void) => void;
  onToggleSidebar: (callback: () => void) => void;
  onOpenCommandPalette: (callback: () => void) => void;
  onImportAgents: (callback: () => void) => void;
  onExportData: (callback: () => void) => void;
  onFind: (callback: () => void) => void;
  onDeepLink: (callback: (url: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
    env?: {
      isElectron: boolean;
      isDevelopment: boolean;
      platform: string;
    };
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncFunction<T = void> = () => Promise<T>;

export type Callback<T = void> = (arg: T) => void;

export type ValueOf<T> = T[keyof T];

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
