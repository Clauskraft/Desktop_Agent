/**
 * IndexedDB Database Schema
 * 
 * Complete database schema using Dexie.js for offline-first data storage.
 * Supports agents, projects, chats, messages, and analytics.
 */

import Dexie, { Table } from 'dexie';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Agent {
  id?: number;
  uuid: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  systemPrompt: string;
  provider: 'openai' | 'anthropic' | 'google' | 'azure' | 'local';
  model: string;
  temperature: number;
  maxTokens: number;
  version: string;
  source: 'github' | 'custom' | 'marketplace';
  sourceUrl?: string;
  author?: string;
  rating?: number;
  usageCount: number;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Project {
  id?: number;
  uuid: string;
  name: string;
  description: string;
  systemPrompt?: string;
  agentId?: string;
  settings: {
    provider?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    customInstructions?: string;
  };
  members: Array<{
    userId: string;
    role: 'owner' | 'admin' | 'member' | 'viewer';
    joinedAt: Date;
  }>;
  webhooks: Array<{
    id: string;
    url: string;
    events: string[];
    enabled: boolean;
  }>;
  apiKeys: Array<{
    id: string;
    name: string;
    provider: string;
    encryptedKey: string;
    createdAt: Date;
  }>;
  status: 'active' | 'archived' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Chat {
  id?: number;
  uuid: string;
  projectId?: string;
  agentId: string;
  title: string;
  provider: string;
  model: string;
  systemPrompt?: string;
  status: 'active' | 'archived' | 'deleted';
  messageCount: number;
  totalTokens: number;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
  metadata?: Record<string, any>;
}

export interface Message {
  id?: number;
  uuid: string;
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  provider?: string;
  model?: string;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost?: number;
  responseTime?: number;
  attachments?: Array<{
    type: 'file' | 'image' | 'audio';
    name: string;
    url: string;
    size: number;
  }>;
  feedback?: {
    rating: 'positive' | 'negative';
    comment?: string;
  };
  regenerated: boolean;
  parentMessageId?: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface Analytics {
  id?: number;
  date: string; // YYYY-MM-DD
  provider: string;
  model: string;
  agentId?: string;
  projectId?: string;
  requests: number;
  tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost: number;
  avgResponseTime: number;
  errors: number;
  metadata?: Record<string, any>;
}

export interface Settings {
  id?: number;
  key: string;
  value: any;
  category: 'app' | 'user' | 'agent' | 'project';
  updatedAt: Date;
}

// ============================================================================
// DATABASE CLASS
// ============================================================================

export class AgentCockpitDB extends Dexie {
  agents!: Table<Agent, number>;
  projects!: Table<Project, number>;
  chats!: Table<Chat, number>;
  messages!: Table<Message, number>;
  analytics!: Table<Analytics, number>;
  settings!: Table<Settings, number>;

  constructor() {
    super('AgentCockpitDB');

    // Define database schema
    this.version(1).stores({
      agents: '++id, uuid, name, category, provider, model, usageCount, lastUsed, createdAt',
      projects: '++id, uuid, name, status, createdAt',
      chats: '++id, uuid, projectId, agentId, status, createdAt, updatedAt, lastMessageAt',
      messages: '++id, uuid, chatId, role, createdAt',
      analytics: '++id, date, provider, model, agentId, projectId',
      settings: '++id, key, category',
    });
  }
}

// Create database instance
export const db = new AgentCockpitDB();

// ============================================================================
// DATABASE OPERATIONS
// ============================================================================

/**
 * Agent Operations
 */
export const agentOperations = {
  // Create agent
  async create(agent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>): Promise<number> {
    const now = new Date();
    return await db.agents.add({
      ...agent,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  },

  // Get agent by UUID
  async getByUuid(uuid: string): Promise<Agent | undefined> {
    return await db.agents.where('uuid').equals(uuid).first();
  },

  // Get all agents
  async getAll(): Promise<Agent[]> {
    return await db.agents.toArray();
  },

  // Get agents by category
  async getByCategory(category: string): Promise<Agent[]> {
    return await db.agents.where('category').equals(category).toArray();
  },

  // Update agent
  async update(uuid: string, updates: Partial<Agent>): Promise<void> {
    await db.agents.where('uuid').equals(uuid).modify({
      ...updates,
      updatedAt: new Date(),
    });
  },

  // Increment usage count
  async incrementUsage(uuid: string): Promise<void> {
    const agent = await db.agents.where('uuid').equals(uuid).first();
    if (agent) {
      await db.agents.where('uuid').equals(uuid).modify({
        usageCount: agent.usageCount + 1,
        lastUsed: new Date(),
      });
    }
  },

  // Delete agent
  async delete(uuid: string): Promise<void> {
    await db.agents.where('uuid').equals(uuid).delete();
  },

  // Search agents
  async search(query: string): Promise<Agent[]> {
    const lowerQuery = query.toLowerCase();
    return await db.agents
      .filter(agent => 
        agent.name.toLowerCase().includes(lowerQuery) ||
        agent.description.toLowerCase().includes(lowerQuery) ||
        agent.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .toArray();
  },
};

/**
 * Project Operations
 */
export const projectOperations = {
  // Create project
  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const now = new Date();
    return await db.projects.add({
      ...project,
      createdAt: now,
      updatedAt: now,
    });
  },

  // Get project by UUID
  async getByUuid(uuid: string): Promise<Project | undefined> {
    return await db.projects.where('uuid').equals(uuid).first();
  },

  // Get all projects
  async getAll(): Promise<Project[]> {
    return await db.projects.where('status').equals('active').toArray();
  },

  // Update project
  async update(uuid: string, updates: Partial<Project>): Promise<void> {
    await db.projects.where('uuid').equals(uuid).modify({
      ...updates,
      updatedAt: new Date(),
    });
  },

  // Archive project
  async archive(uuid: string): Promise<void> {
    await db.projects.where('uuid').equals(uuid).modify({
      status: 'archived',
      updatedAt: new Date(),
    });
  },

  // Delete project
  async delete(uuid: string): Promise<void> {
    await db.projects.where('uuid').equals(uuid).modify({
      status: 'deleted',
      updatedAt: new Date(),
    });
  },
};

/**
 * Chat Operations
 */
export const chatOperations = {
  // Create chat
  async create(chat: Omit<Chat, 'id' | 'createdAt' | 'updatedAt' | 'messageCount' | 'totalTokens' | 'totalCost'>): Promise<number> {
    const now = new Date();
    return await db.chats.add({
      ...chat,
      messageCount: 0,
      totalTokens: 0,
      totalCost: 0,
      createdAt: now,
      updatedAt: now,
    });
  },

  // Get chat by UUID
  async getByUuid(uuid: string): Promise<Chat | undefined> {
    return await db.chats.where('uuid').equals(uuid).first();
  },

  // Get chats by project
  async getByProject(projectId: string): Promise<Chat[]> {
    return await db.chats.where('projectId').equals(projectId).reverse().sortBy('lastMessageAt');
  },

  // Get chats by agent
  async getByAgent(agentId: string): Promise<Chat[]> {
    return await db.chats.where('agentId').equals(agentId).reverse().sortBy('lastMessageAt');
  },

  // Get recent chats
  async getRecent(limit: number = 10): Promise<Chat[]> {
    return await db.chats
      .where('status').equals('active')
      .reverse()
      .sortBy('lastMessageAt')
      .then(chats => chats.slice(0, limit));
  },

  // Update chat stats
  async updateStats(uuid: string, tokens: number, cost: number): Promise<void> {
    const chat = await db.chats.where('uuid').equals(uuid).first();
    if (chat) {
      await db.chats.where('uuid').equals(uuid).modify({
        messageCount: chat.messageCount + 1,
        totalTokens: chat.totalTokens + tokens,
        totalCost: chat.totalCost + cost,
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      });
    }
  },

  // Update chat
  async update(uuid: string, updates: Partial<Chat>): Promise<void> {
    await db.chats.where('uuid').equals(uuid).modify({
      ...updates,
      updatedAt: new Date(),
    });
  },

  // Delete chat
  async delete(uuid: string): Promise<void> {
    await db.chats.where('uuid').equals(uuid).modify({
      status: 'deleted',
      updatedAt: new Date(),
    });
    // Also delete messages
    await db.messages.where('chatId').equals(uuid).delete();
  },
};

/**
 * Message Operations
 */
export const messageOperations = {
  // Create message
  async create(message: Omit<Message, 'id' | 'createdAt'>): Promise<number> {
    return await db.messages.add({
      ...message,
      createdAt: new Date(),
    });
  },

  // Get messages by chat
  async getByChatId(chatId: string): Promise<Message[]> {
    return await db.messages.where('chatId').equals(chatId).sortBy('createdAt');
  },

  // Update message
  async update(uuid: string, updates: Partial<Message>): Promise<void> {
    await db.messages.where('uuid').equals(uuid).modify(updates);
  },

  // Delete message
  async delete(uuid: string): Promise<void> {
    await db.messages.where('uuid').equals(uuid).delete();
  },

  // Add feedback
  async addFeedback(uuid: string, feedback: Message['feedback']): Promise<void> {
    await db.messages.where('uuid').equals(uuid).modify({ feedback });
  },
};

/**
 * Analytics Operations
 */
export const analyticsOperations = {
  // Record analytics
  async record(data: Omit<Analytics, 'id'>): Promise<number> {
    // Check if entry exists for this date/provider/model
    const existing = await db.analytics
      .where('[date+provider+model]')
      .equals([data.date, data.provider, data.model])
      .first();

    if (existing) {
      // Update existing
      await db.analytics.update(existing.id!, {
        requests: existing.requests + data.requests,
        tokens: {
          prompt: existing.tokens.prompt + data.tokens.prompt,
          completion: existing.tokens.completion + data.tokens.completion,
          total: existing.tokens.total + data.tokens.total,
        },
        cost: existing.cost + data.cost,
        avgResponseTime: (existing.avgResponseTime * existing.requests + data.avgResponseTime * data.requests) / (existing.requests + data.requests),
        errors: existing.errors + data.errors,
      });
      return existing.id!;
    } else {
      // Create new
      return await db.analytics.add(data);
    }
  },

  // Get analytics by date range
  async getByDateRange(startDate: string, endDate: string): Promise<Analytics[]> {
    return await db.analytics
      .where('date')
      .between(startDate, endDate, true, true)
      .toArray();
  },

  // Get total stats
  async getTotals(): Promise<{
    requests: number;
    tokens: number;
    cost: number;
  }> {
    const all = await db.analytics.toArray();
    return all.reduce((acc, curr) => ({
      requests: acc.requests + curr.requests,
      tokens: acc.tokens + curr.tokens.total,
      cost: acc.cost + curr.cost,
    }), { requests: 0, tokens: 0, cost: 0 });
  },
};

/**
 * Settings Operations
 */
export const settingsOperations = {
  // Get setting
  async get(key: string): Promise<any> {
    const setting = await db.settings.where('key').equals(key).first();
    return setting?.value;
  },

  // Set setting
  async set(key: string, value: any, category: Settings['category'] = 'app'): Promise<void> {
    const existing = await db.settings.where('key').equals(key).first();
    if (existing) {
      await db.settings.update(existing.id!, {
        value,
        updatedAt: new Date(),
      });
    } else {
      await db.settings.add({
        key,
        value,
        category,
        updatedAt: new Date(),
      });
    }
  },

  // Get all settings by category
  async getByCategory(category: Settings['category']): Promise<Record<string, any>> {
    const settings = await db.settings.where('category').equals(category).toArray();
    return settings.reduce((acc, setting) => ({
      ...acc,
      [setting.key]: setting.value,
    }), {});
  },

  // Delete setting
  async delete(key: string): Promise<void> {
    await db.settings.where('key').equals(key).delete();
  },
};

// ============================================================================
// DATABASE UTILITIES
// ============================================================================

/**
 * Clear all data (for testing or reset)
 */
export async function clearDatabase(): Promise<void> {
  await db.agents.clear();
  await db.projects.clear();
  await db.chats.clear();
  await db.messages.clear();
  await db.analytics.clear();
  await db.settings.clear();
}

/**
 * Export database to JSON
 */
export async function exportDatabase(): Promise<string> {
  const data = {
    agents: await db.agents.toArray(),
    projects: await db.projects.toArray(),
    chats: await db.chats.toArray(),
    messages: await db.messages.toArray(),
    analytics: await db.analytics.toArray(),
    settings: await db.settings.toArray(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Import database from JSON
 */
export async function importDatabase(jsonData: string): Promise<void> {
  const data = JSON.parse(jsonData);
  
  await db.transaction('rw', [db.agents, db.projects, db.chats, db.messages, db.analytics, db.settings], async () => {
    if (data.agents) await db.agents.bulkAdd(data.agents);
    if (data.projects) await db.projects.bulkAdd(data.projects);
    if (data.chats) await db.chats.bulkAdd(data.chats);
    if (data.messages) await db.messages.bulkAdd(data.messages);
    if (data.analytics) await db.analytics.bulkAdd(data.analytics);
    if (data.settings) await db.settings.bulkAdd(data.settings);
  });
}

/**
 * Get database statistics
 */
export async function getDatabaseStats() {
  return {
    agents: await db.agents.count(),
    projects: await db.projects.count(),
    chats: await db.chats.count(),
    messages: await db.messages.count(),
    analytics: await db.analytics.count(),
    settings: await db.settings.count(),
  };
}

// Initialize database
db.open().catch(err => {
  console.error('Failed to open database:', err);
});

export default db;
