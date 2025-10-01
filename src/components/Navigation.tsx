import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Divider, useTheme } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  LibraryBooks as LibraryIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Folder as ProjectIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  open: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Agent Library', icon: <LibraryIcon />, path: '/library' },
    { text: 'Projects', icon: <ProjectIcon />, path: '/projects' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 280 : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 280 : 64,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          background: theme.custom.glass.background,
          backdropFilter: 'blur(20px)',
          borderRight: `1px solid ${theme.custom.glass.border}`,
        },
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 2, 
          justifyContent: open ? 'space-between' : 'center',
          minHeight: 64,
        }}
      >
        {open && (
          <Box 
            sx={{ 
              pl: 1, 
              fontWeight: theme.typography.fontWeightBold, 
              fontSize: theme.typography.h5.fontSize, 
              color: theme.palette.primary.main 
            }}
          >
            Agent Cockpit
          </Box>
        )}
        <IconButton 
          onClick={onToggle} 
          sx={{ color: theme.palette.primary.main }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      
      <Divider />
      
      <List sx={{ mt: 2, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mb: 0.5,
              borderRadius: theme.shape.borderRadius / 4,
              transition: theme.transitions.create(['background-color', 'color'], {
                duration: theme.transitions.duration.short,
              }),
              '&.Mui-selected': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.contrastText,
                },
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              },
              '&:hover': {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40, 
                color: location.pathname === item.path 
                  ? theme.palette.primary.contrastText 
                  : theme.palette.primary.main 
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigation;
