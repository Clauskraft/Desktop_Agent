import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { TdcCard } from '../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const theme = useTheme();
  
  const data = [
    { name: 'Mon', tokens: 4000 },
    { name: 'Tue', tokens: 3000 },
    { name: 'Wed', tokens: 5000 },
    { name: 'Thu', tokens: 2780 },
    { name: 'Fri', tokens: 1890 },
    { name: 'Sat', tokens: 2390 },
    { name: 'Sun', tokens: 3490 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Analytics
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TdcCard sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Token Usage (Last 7 Days)</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme.palette.divider} 
                />
                <XAxis 
                  dataKey="name" 
                  stroke={theme.palette.text.secondary} 
                />
                <YAxis 
                  stroke={theme.palette.text.secondary} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.divider,
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tokens" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={3}
                  dot={{ fill: theme.palette.primary.main, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TdcCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
