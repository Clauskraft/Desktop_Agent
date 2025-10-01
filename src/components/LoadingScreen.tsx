import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #003D7A 0%, #0066CC 100%)',
      }}
    >
      <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
      <Typography variant="h5" sx={{ color: 'white' }}>
        Agent Cockpit
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;