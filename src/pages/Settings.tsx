import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Switch, FormControlLabel, Alert } from '@mui/material';
import { TdcButton, TdcTextField, TdcCard } from '../components/ui';
import { AgentScopeClient } from '../services/agentscope';

const Settings: React.FC = () => {
  const [backendUrl, setBackendUrl] = useState('http://localhost:8000');
  const [apiToken, setApiToken] = useState('');
  const [agentScopeEnabled, setAgentScopeEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const client = new AgentScopeClient(backendUrl, apiToken);
      await client.health();
      setConnectionStatus('success');
      setTimeout(() => setConnectionStatus('idle'), 3000);
    } catch (error) {
      setConnectionStatus('error');
      setTimeout(() => setConnectionStatus('idle'), 3000);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Settings
      </Typography>
      
      <TdcCard sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>AgentScope Backend</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TdcTextField 
            label="Backend URL" 
            value={backendUrl}
            onChange={(e) => setBackendUrl(e.target.value)}
            fullWidth 
            helperText="AgentScope backend server URL"
          />
          <TdcTextField 
            label="API Token" 
            type="password" 
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            fullWidth 
            helperText="Authentication token for backend API"
          />
          <FormControlLabel 
            control={
              <Switch 
                checked={agentScopeEnabled} 
                onChange={(e) => setAgentScopeEnabled(e.target.checked)}
              />
            } 
            label="Enable AgentScope Integration" 
          />
          {connectionStatus === 'success' && (
            <Alert severity="success">Connection successful!</Alert>
          )}
          {connectionStatus === 'error' && (
            <Alert severity="error">Connection failed. Check URL and token.</Alert>
          )}
          <TdcButton 
            variant="contained" 
            onClick={testConnection}
            disabled={connectionStatus === 'testing'}
            sx={{ alignSelf: 'flex-start' }}
          >
            {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </TdcButton>
        </Box>
      </TdcCard>
      
      <TdcCard sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>API Keys</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TdcTextField label="OpenAI API Key" type="password" fullWidth />
          <TdcTextField label="Anthropic API Key" type="password" fullWidth />
          <TdcTextField label="Google AI API Key" type="password" fullWidth />
          <TdcButton variant="contained" sx={{ alignSelf: 'flex-start' }}>
            Save API Keys
          </TdcButton>
        </Box>
      </TdcCard>
      
      <TdcCard sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Preferences</Typography>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel control={<Switch />} label="Dark Mode" />
        </Box>
      </TdcCard>
    </Box>
  );
};

export default Settings;
