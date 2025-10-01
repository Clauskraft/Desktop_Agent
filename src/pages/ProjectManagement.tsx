import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TdcCard, TdcButton } from '../components/ui';

const ProjectManagement: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Projects
        </Typography>
        <TdcButton variant="contained" startIcon={<AddIcon />}>
          New Project
        </TdcButton>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <TdcCard sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Sample Project</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Project description goes here
            </Typography>
            <TdcButton size="small">View Details</TdcButton>
          </TdcCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectManagement;
