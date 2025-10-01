// Unified API Service for Multiple AI Providers
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  AZURE = 'azure',
  LOCAL = 'local',
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export interface StreamingOptions {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}

export interface ModelConfig {
  provider: AIProvider;
  model: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}

class APIService {
  private static instance: APIService;
  private abortControllers: Map<string, AbortController> = new Map();

  static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  // OpenAI Implementation
  async openAIChat(
    messages: ChatMessage[],
    config: ModelConfig,
    streaming?: StreamingOptions
  ): Promise<string> {
    const requestId = uuidv4();
    const controller = new AbortController();
    this.abortControllers.set(requestId, controller);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4',
          messages,
          temperature: config.temperature ?? 0.7,
          max_tokens: config.maxTokens ?? 2000,
          stream: !!streaming,
        }),
        signal: streaming?.signal || controller.signal,
      });

      if (!response.ok) throw new Error(`OpenAI API error: ${response.statusText}`);

      if (streaming && response.body) {
        return this.handleStreamingResponse(response.body, streaming);
      } else {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      streaming?.onError?.(error as Error);
      throw error;
    } finally {
      this.abortControllers.delete(requestId);
    }
  }

  // Anthropic Implementation
  async anthropicChat(
    messages: ChatMessage[],
    config: ModelConfig,
    streaming?: StreamingOptions
  ): Promise<string> {
    const requestId = uuidv4();
    const controller = new AbortController();
    this.abortControllers.set(requestId, controller);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': config.apiKey!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: config.model || 'claude-3-opus-20240229',
          messages: messages.filter(m => m.role !== 'system'),
          system: messages.find(m => m.role === 'system')?.content,
          max_tokens: config.maxTokens ?? 2000,
          temperature: config.temperature ?? 0.7,
          stream: !!streaming,
        }),
        signal: streaming?.signal || controller.signal,
      });

      if (!response.ok) throw new Error(`Anthropic API error: ${response.statusText}`);

      if (streaming && response.body) {
        return this.handleStreamingResponse(response.body, streaming);
      } else {
        const data = await response.json();
        return data.content[0].text;
      }
    } catch (error) {
      streaming?.onError?.(error as Error);
      throw error;
    } finally {
      this.abortControllers.delete(requestId);
    }
  }

  // Unified chat method
  async chat(
    messages: ChatMessage[],
    config: ModelConfig,
    streaming?: StreamingOptions
  ): Promise<string> {
    switch (config.provider) {
      case AIProvider.OPENAI:
        return this.openAIChat(messages, config, streaming);
      case AIProvider.ANTHROPIC:
        return this.anthropicChat(messages, config, streaming);
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
  }

  // Handle streaming responses
  private async handleStreamingResponse(
    stream: ReadableStream<Uint8Array>,
    options: StreamingOptions
  ): Promise<string> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const token = json.choices?.[0]?.delta?.content || json.content?.[0]?.text || '';
              if (token) {
                fullResponse += token;
                options.onToken?.(token);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      options.onComplete?.(fullResponse);
      return fullResponse;
    } catch (error) {
      options.onError?.(error as Error);
      throw error;
    }
  }

  // Calculate token count (approximate)
  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  // Calculate cost
  calculateCost(tokens: number, provider: AIProvider, model: string): number {
    const rates: Record<string, number> = {
      'gpt-4': 0.03,
      'gpt-3.5-turbo': 0.002,
      'claude-3-opus': 0.015,
      'claude-3-sonnet': 0.003,
      'gemini-pro': 0.001,
    };
    
    const rate = rates[model] || 0.01;
    return (tokens / 1000) * rate;
  }
}

export default APIService.getInstance();