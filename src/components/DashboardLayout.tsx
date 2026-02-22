'use client';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { LogOut, StickyNote, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Toolbar className="flex justify-between">
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="font-bold flex items-center gap-2"
          >
            <StickyNote className="text-blue-600" /> NoteApp
          </Typography>
          <IconButton onClick={handleLogout} color="error">
            <LogOut size={20} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #e5e7eb',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected
                className="rounded-lg text-blue-600 bg-blue-50!"
              >
                <ListItemIcon>
                  <StickyNote className="text-blue-600" />
                </ListItemIcon>
                <ListItemText primary="Minhas Notas" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton className="rounded-lg mt-2">
                <ListItemIcon>
                  <PlusCircle />
                </ListItemIcon>
                <ListItemText primary="Nova Nota" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
