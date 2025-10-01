import React from 'react';
import { Box, Typography, Grid, Chip, useTheme } from '@mui/material';
import { TdcCard, TdcButton } from '../components/ui';

const PromptLibrary: React.FC = () => {
  const theme = useTheme();
  
  const prompts = [
    { id: 1, title: 'Code Review Agent', category: 'Development', uses: 45 },
    { id: 2, title: 'Content Writer', category: 'Writing', uses: 32 },
    { id: 3, title: 'Data Analyst', category: 'Analytics', uses: 28 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Prompt Library
      </Typography>
      
      <Grid container spacing={3}>
        {prompts.map((prompt) => (
          <Grid item xs={12} md={6} lg={4} key={prompt.id}>
            <TdcCard sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>{prompt.title}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={prompt.category} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'primary.contrastText' 
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Used {prompt.uses} times
                </Typography>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <TdcButton size="small" variant="outlined">View</TdcButton>
                <TdcButton size="small" variant="contained">Use</TdcButton>
              </Box>
            </TdcCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PromptLibrary;
