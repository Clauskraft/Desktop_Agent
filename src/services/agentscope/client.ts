/**
 * AgentScope Client
 * TypeScript SDK for AgentScope backend integration
 */

import axios, { AxiosInstance } from 'axios';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

export interface AgentRunRequest {
  agent_id: string;
  messages: Message[];
  system_prompt?: string;
  temperature?: number;
  max_tokens?: number;
  tools?: any[];
  metadata?: Record<string, any>;
}

export interface AgentRunResponse {
  agent_id: string;
  message: Message;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  metadata: Record<string, any>;
  duration_ms: number;
}

export interface StreamEvent {
  type: 'start' | 'token' | 'complete' | 'error';
  content?: string;
  agent_id?: string;
  usage?: any;
  metadata?: any;
  error?: string;
  done: boolean;
}

export class AgentScopeClient {
  private api: AxiosInstance;
  private wsUrl: string;

  constructor(baseURL: string = 'http://localhost:8000', apiToken?: string) {
    this.api = axios.create({
      baseURL: `${baseURL}/api`,
      headers: apiToken ? { Authorization: `Bearer ${apiToken}` } : {},
    });

    this.wsUrl = baseURL.replace('http', 'ws') + '/api/agents/stream';
  }

  /**
   * Run agent synchronously
   */
  async run(request: AgentRunRequest): Promise<AgentRunResponse> {
    const response = await this.api.post<AgentRunResponse>('/agents/run', request);
    return response.data;
  }

  /**
   * Stream agent responses via WebSocket
   */
  stream(
    request: AgentRunRequest,
    onToken: (token: string) => void,
    onComplete: (usage: any, metadata: any) => void,
    onError: (error: string) => void
  ): WebSocket {
    const ws = new WebSocket(this.wsUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'run', ...request }));
    };

    ws.onmessage = (event) => {
      const data: StreamEvent = JSON.parse(event.data);

      switch (data.type) {
        case 'token':
          if (data.content) onToken(data.content);
          break;
        case 'complete':
          onComplete(data.usage, data.metadata);
          ws.close();
          break;
        case 'error':
          onError(data.error || 'Unknown error');
          ws.close();
          break;
      }
    };

    ws.onerror = (error) => {
      onError('WebSocket error');
      ws.close();
    };

    return ws;
  }

  /**
   * List available agents
   */
  async listAgents() {
    const response = await this.api.get('/agents/');
    return response.data;
  }

  /**
   * Get agent details
   */
  async getAgent(agentId: string) {
    const response = await this.api.get(`/agents/${agentId}`);
    return response.data;
  }

  /**
   * Health check
   */
  async health() {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export default AgentScopeClient;
