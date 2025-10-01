import React from 'react';
import { Dialog, DialogContent, TextField, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const [search, setSearch] = React.useState('');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          placeholder="Type a command or search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <List sx={{ mt: 2 }}>
          <ListItem button onClick={onClose}>
            <ListItemText primary="Open Chat" secondary="Start a new conversation" />
          </ListItem>
          <ListItem button onClick={onClose}>
            <ListItemText primary="View Agents" secondary="Browse agent library" />
          </ListItem>
          <ListItem button onClick={onClose}>
            <ListItemText primary="Settings" secondary="Configure application" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;