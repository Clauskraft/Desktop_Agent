/**
 * Global Application State Management
 * 
 * Zustand store with persistence for the Agent Cockpit application.
 * Manages UI state, user preferences, and real-time data.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Agent, Project, Chat, Message } from '../database';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: 'en' | 'da';
    notifications: boolean;
    compactMode: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  currentRoute: string;
  loading: boolean;
  loadingMessage?: string;
}

export interface AgentState {
  selectedAgent?: Agent;
  agents: Agent[];
  agentFilter: {
    category?: string;
    provider?: string;
    search?: string;
  };
}

export interface ProjectState {
  selectedProject?: Project;
  projects: Project[];
}

export interface ChatState {
  activeChat?: Chat;
  chats: Chat[];
  messages: Message[];
  isStreaming: boolean;
  streamingMessage?: string;
}

export interface AnalyticsState {
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  dateRange: {
    start: Date;
    end: Date;
  };
}

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface AppStore {
  // User State
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;

  // UI State
  ui: UIState;
  toggleSidebar: () => void;
  collapseSidebar: (collapsed: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  setCurrentRoute: (route: string) => void;
  setLoading: (loading: boolean, message?: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  removeNotification: (id: string) => void;

  // Agent State
  agentState: AgentState;
  setSelectedAgent: (agent?: Agent) => void;
  setAgents: (agents: Agent[]) => void;
  setAgentFilter: (filter: Partial<AgentState['agentFilter']>) => void;
  clearAgentFilter: () => void;

  // Project State
  projectState: ProjectState;
  setSelectedProject: (project?: Project) => void;
  setProjects: (projects: Project[]) => void;

  // Chat State
  chatState: ChatState;
  setActiveChat: (chat?: Chat) => void;
  setChats: (chats: Chat[]) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsStreaming: (streaming: boolean) => void;
  setStreamingMessage: (message?: string) => void;

  // Analytics State
  analyticsState: AnalyticsState;
  updateAnalytics: (data: Partial<AnalyticsState>) => void;
  setDateRange: (start: Date, end: Date) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Utility
  reset: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialUIState: UIState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  currentRoute: '/',
  loading: false,
};

const initialAgentState: AgentState = {
  agents: [],
  agentFilter: {},
};

const initialProjectState: ProjectState = {
  projects: [],
};

const initialChatState: ChatState = {
  chats: [],
  messages: [],
  isStreaming: false,
};

const initialAnalyticsState: AnalyticsState = {
  totalRequests: 0,
  totalTokens: 0,
  totalCost: 0,
  dateRange: {
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  },
};

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // User State
      user: null,
      
      setUser: (user) => set({ user }),
      
      updateUserPreferences: (preferences) => 
        set((state) => ({
          user: state.user
            ? { ...state.user, preferences: { ...state.user.preferences, ...preferences } }
            : null,
        })),

      // UI State
      ui: initialUIState,

      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
        })),

      collapseSidebar: (collapsed) =>
        set((state) => ({
          ui: { ...state.ui, sidebarCollapsed: collapsed },
        })),

      openCommandPalette: () =>
        set((state) => ({
          ui: { ...state.ui, commandPaletteOpen: true },
        })),

      closeCommandPalette: () =>
        set((state) => ({
          ui: { ...state.ui, commandPaletteOpen: false },
        })),

      setCurrentRoute: (route) =>
        set((state) => ({
          ui: { ...state.ui, currentRoute: route },
        })),

      setLoading: (loading, message) =>
        set((state) => ({
          ui: { ...state.ui, loading, loadingMessage: message },
        })),

      // Notifications
      notifications: [],

      addNotification: (notification) => {
        const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        set((state) => ({
          notifications: [
            {
              ...notification,
              id,
              timestamp: new Date(),
              read: false,
            },
            ...state.notifications,
          ],
        }));
      },

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      clearNotifications: () => set({ notifications: [] }),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      // Agent State
      agentState: initialAgentState,

      setSelectedAgent: (agent) =>
        set((state) => ({
          agentState: { ...state.agentState, selectedAgent: agent },
        })),

      setAgents: (agents) =>
        set((state) => ({
          agentState: { ...state.agentState, agents },
        })),

      setAgentFilter: (filter) =>
        set((state) => ({
          agentState: {
            ...state.agentState,
            agentFilter: { ...state.agentState.agentFilter, ...filter },
          },
        })),

      clearAgentFilter: () =>
        set((state) => ({
          agentState: { ...state.agentState, agentFilter: {} },
        })),

      // Project State
      projectState: initialProjectState,

      setSelectedProject: (project) =>
        set((state) => ({
          projectState: { ...state.projectState, selectedProject: project },
        })),

      setProjects: (projects) =>
        set((state) => ({
          projectState: { ...state.projectState, projects },
        })),

      // Chat State
      chatState: initialChatState,

      setActiveChat: (chat) =>
        set((state) => ({
          chatState: { ...state.chatState, activeChat: chat },
        })),

      setChats: (chats) =>
        set((state) => ({
          chatState: { ...state.chatState, chats },
        })),

      setMessages: (messages) =>
        set((state) => ({
          chatState: { ...state.chatState, messages },
        })),

      addMessage: (message) =>
        set((state) => ({
          chatState: {
            ...state.chatState,
            messages: [...state.chatState.messages, message],
          },
        })),

      setIsStreaming: (streaming) =>
        set((state) => ({
          chatState: { ...state.chatState, isStreaming: streaming },
        })),

      setStreamingMessage: (message) =>
        set((state) => ({
          chatState: { ...state.chatState, streamingMessage: message },
        })),

      // Analytics State
      analyticsState: initialAnalyticsState,

      updateAnalytics: (data) =>
        set((state) => ({
          analyticsState: { ...state.analyticsState, ...data },
        })),

      setDateRange: (start, end) =>
        set((state) => ({
          analyticsState: {
            ...state.analyticsState,
            dateRange: { start, end },
          },
        })),

      // Theme
      theme: 'light',

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setTheme: (theme) => set({ theme }),

      // Utility
      reset: () =>
        set({
          user: null,
          ui: initialUIState,
          notifications: [],
          agentState: initialAgentState,
          projectState: initialProjectState,
          chatState: initialChatState,
          analyticsState: initialAnalyticsState,
          theme: 'light',
        }),
    }),
    {
      name: 'agent-cockpit-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist specific state
        user: state.user,
        theme: state.theme,
        ui: {
          sidebarCollapsed: state.ui.sidebarCollapsed,
        },
      }),
    }
  )
);

// ============================================================================
// SELECTORS (for optimized re-renders)
// ============================================================================

export const selectUser = (state: AppStore) => state.user;
export const selectTheme = (state: AppStore) => state.theme;
export const selectUI = (state: AppStore) => state.ui;
export const selectNotifications = (state: AppStore) => state.notifications;
export const selectUnreadNotifications = (state: AppStore) =>
  state.notifications.filter((n) => !n.read);
export const selectAgentState = (state: AppStore) => state.agentState;
export const selectSelectedAgent = (state: AppStore) => state.agentState.selectedAgent;
export const selectAgents = (state: AppStore) => state.agentState.agents;
export const selectProjectState = (state: AppStore) => state.projectState;
export const selectSelectedProject = (state: AppStore) => state.projectState.selectedProject;
export const selectProjects = (state: AppStore) => state.projectState.projects;
export const selectChatState = (state: AppStore) => state.chatState;
export const selectActiveChat = (state: AppStore) => state.chatState.activeChat;
export const selectChats = (state: AppStore) => state.chatState.chats;
export const selectMessages = (state: AppStore) => state.chatState.messages;
export const selectIsStreaming = (state: AppStore) => state.chatState.isStreaming;
export const selectAnalyticsState = (state: AppStore) => state.analyticsState;

// ============================================================================
// STORE SUBSCRIPTIONS (Side Effects)
// ============================================================================

// Subscribe to theme changes and apply to document
useAppStore.subscribe(
  (state) => state.theme,
  (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }
);

// Subscribe to loading state and show/hide loading overlay
useAppStore.subscribe(
  (state) => state.ui.loading,
  (loading) => {
    if (loading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }
  }
);

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook to access only the actions without triggering re-renders on state changes
 */
export const useAppActions = () => {
  const store = useAppStore();
  return {
    setUser: store.setUser,
    updateUserPreferences: store.updateUserPreferences,
    toggleSidebar: store.toggleSidebar,
    collapseSidebar: store.collapseSidebar,
    openCommandPalette: store.openCommandPalette,
    closeCommandPalette: store.closeCommandPalette,
    setCurrentRoute: store.setCurrentRoute,
    setLoading: store.setLoading,
    addNotification: store.addNotification,
    markNotificationRead: store.markNotificationRead,
    clearNotifications: store.clearNotifications,
    removeNotification: store.removeNotification,
    setSelectedAgent: store.setSelectedAgent,
    setAgents: store.setAgents,
    setAgentFilter: store.setAgentFilter,
    clearAgentFilter: store.clearAgentFilter,
    setSelectedProject: store.setSelectedProject,
    setProjects: store.setProjects,
    setActiveChat: store.setActiveChat,
    setChats: store.setChats,
    setMessages: store.setMessages,
    addMessage: store.addMessage,
    setIsStreaming: store.setIsStreaming,
    setStreamingMessage: store.setStreamingMessage,
    updateAnalytics: store.updateAnalytics,
    setDateRange: store.setDateRange,
    toggleTheme: store.toggleTheme,
    setTheme: store.setTheme,
    reset: store.reset,
  };
};

export default useAppStore;
