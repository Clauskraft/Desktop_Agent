import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { useStore } from './stores/AppStore';
import { createTDCTheme } from './styles/TDCTheme';

// Components
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import CommandPalette from './components/CommandPalette';

// Pages
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import PromptLibrary from './pages/PromptLibrary';
import ProjectManagement from './pages/ProjectManagement';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

function App() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  const { darkMode, initializeApp } = useStore();
  const navigate = useNavigate();
  const theme = createTDCTheme(darkMode ? 'dark' : 'light');

  useEffect(() => {
    // Initialize app
    const init = async () => {
      await initializeApp();
      setLoading(false);
    };
    init();

    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Navigation 
          open={drawerOpen} 
          onToggle={() => setDrawerOpen(!drawerOpen)} 
        />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            p: 3,
            ml: drawerOpen ? '280px' : '64px',
            transition: 'margin-left 0.3s ease',
            overflow: 'auto',
            background: theme.palette.background.default,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/chat/:conversationId" element={<ChatInterface />} />
            <Route path="/library" element={<PromptLibrary />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>

        <CommandPalette 
          open={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;