import React, { useEffect, useState } from 'react';
import { Box, Grid, CardContent, Typography, useTheme } from '@mui/material';
import { TrendingUp, Chat, Speed, Token, Assessment, AttachMoney } from '@mui/icons-material';
import { TdcCard } from '../components/ui';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { analyticsOperations, chatOperations } from '../database';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalChats: 0,
    totalTokens: 0,
    activeAgents: 0,
    totalCost: 0,
  });

  const [chartData] = useState([
    { name: 'Mon', tokens: 4000, cost: 2.4 },
    { name: 'Tue', tokens: 3000, cost: 1.8 },
    { name: 'Wed', tokens: 5000, cost: 3.0 },
    { name: 'Thu', tokens: 4500, cost: 2.7 },
    { name: 'Fri', tokens: 6000, cost: 3.6 },
    { name: 'Sat', tokens: 3500, cost: 2.1 },
    { name: 'Sun', tokens: 4000, cost: 2.4 },
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const totals = await analyticsOperations.getTotals();
      const recentChats = await chatOperations.getRecent(100);
      
      setStats({
        totalChats: recentChats.length,
        totalTokens: totals.tokens,
        activeAgents: 12, // TODO: Get from database
        totalCost: totals.cost,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Chats',
      value: stats.totalChats.toString(),
      icon: Chat,
      color: theme.palette.primary.main,
    },
    {
      title: 'Tokens Used',
      value: `${(stats.totalTokens / 1000).toFixed(1)}K`,
      icon: Token,
      color: theme.palette.success.main,
    },
    {
      title: 'Active Agents',
      value: stats.activeAgents.toString(),
      icon: Speed,
      color: theme.palette.warning.main,
    },
    {
      title: 'Total Cost',
      value: `$${stats.totalCost.toFixed(2)}`,
      icon: AttachMoney,
      color: theme.palette.error.main,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
        }}
      >
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TdcCard variant="elevated">
              <CardContent>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}
                >
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        mb: 1,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: stat.color,
                        fontWeight: theme.typography.fontWeightBold,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <stat.icon 
                    sx={{ 
                      fontSize: 48, 
                      color: stat.color, 
                      opacity: 0.2 
                    }} 
                  />
                </Box>
              </CardContent>
            </TdcCard>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Token Usage Chart */}
        <Grid item xs={12} lg={8}>
          <TdcCard>
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: theme.typography.fontWeightSemiBold,
                  color: theme.palette.text.primary,
                }}
              >
                Token Usage
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor={theme.palette.primary.main} 
                        stopOpacity={0.3} 
                      />
                      <stop 
                        offset="95%" 
                        stopColor={theme.palette.primary.main} 
                        stopOpacity={0} 
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme.palette.divider} 
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.text.secondary} 
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tokens" 
                    stroke={theme.palette.primary.main} 
                    fillOpacity={1} 
                    fill="url(#colorTokens)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </TdcCard>
        </Grid>

        {/* Cost Chart */}
        <Grid item xs={12} lg={4}>
          <TdcCard>
            <CardContent>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: theme.typography.fontWeightSemiBold,
                  color: theme.palette.text.primary,
                }}
              >
                Daily Cost
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme.palette.divider} 
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.text.secondary} 
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme.palette.background.paper,
                      borderColor: theme.palette.divider,
                    }}
                  />
                  <Bar 
                    dataKey="cost" 
                    fill={theme.palette.success.main} 
                    radius={[8, 8, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </TdcCard>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <TdcCard variant="glass">
            <CardContent sx={{ p: 3 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2 
                }}
              >
                <Assessment 
                  sx={{ 
                    mr: 1, 
                    color: theme.palette.primary.main 
                  }} 
                />
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontWeight: theme.typography.fontWeightSemiBold,
                    color: theme.palette.text.primary,
                  }}
                >
                  Recent Activity
                </Typography>
              </Box>
              <Typography 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontStyle: 'italic',
                }}
              >
                No recent activity to display
              </Typography>
            </CardContent>
          </TdcCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
