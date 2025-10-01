import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, Avatar, CircularProgress, Chip } from '@mui/material';
import { Send as SendIcon, SmartToy as BotIcon, Person as PersonIcon } from '@mui/icons-material';
import { TdcButton, TdcTextField, TdcCard } from '../components/ui';
import { AgentScopeClient, Message } from '../services/agentscope';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSend = async () => {
    if (!message.trim() || isStreaming) return;

    const userMessage: Message = {
      role: 'user',
      content: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsStreaming(true);
    setStreamingContent('');

    try {
      // TODO: Get backend URL and token from settings
      const client = new AgentScopeClient('http://localhost:8000', 'test-token');

      // Start streaming
      const ws = client.stream(
        {
          agent_id: 'default-agent',
          messages: [...messages, userMessage],
        },
        (token: string) => {
          setStreamingContent((prev) => prev + token);
        },
        (usage: any, metadata: any) => {
          // Complete - add assistant message
          const assistantMessage: Message = {
            role: 'assistant',
            content: streamingContent,
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setStreamingContent('');
          setIsStreaming(false);
        },
        (error: string) => {
          console.error('Streaming error:', error);
          setIsStreaming(false);
          setStreamingContent('');
        }
      );

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Chat Interface
        </Typography>
        <Chip label="AgentScope Beta" color="primary" size="small" />
      </Box>
      
      <TdcCard sx={{ flex: 1, p: 3, mb: 2, overflow: 'auto', bgcolor: 'background.default' }} glass>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {messages.length === 0 && !streamingContent && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <BotIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.5 }} />
              <Typography color="text.secondary" variant="h6">
                Start a conversation with AI
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
                Powered by AgentScope
              </Typography>
            </Box>
          )}

          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
                  width: 36,
                  height: 36,
                }}
              >
                {msg.role === 'user' ? <PersonIcon /> : <BotIcon />}
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                  color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </Typography>
              </Paper>
            </Box>
          ))}

          {streamingContent && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
                <BotIcon />
              </Avatar>
              <Paper elevation={1} sx={{ p: 2, maxWidth: '70%', bgcolor: 'background.paper' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {streamingContent}
                  <CircularProgress size={12} sx={{ ml: 1 }} />
                </Typography>
              </Paper>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>
      </TdcCard>
      
      <Paper sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TdcTextField
          fullWidth
          placeholder="Type your message... (Shift+Enter for new line)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={3}
          disabled={isStreaming}
        />
        <TdcButton
          variant="contained"
          onClick={handleSend}
          disabled={!message.trim() || isStreaming}
          endIcon={isStreaming ? <CircularProgress size={20} /> : <SendIcon />}
        >
          {isStreaming ? 'Sending...' : 'Send'}
        </TdcButton>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
