'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';
import { LogOut, StickyNote, Menu as MenuIcon, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  const menuItems = [
    {
      text: 'Minhas Notas',
      icon: <StickyNote size={20} />,
      path: '/dashboard',
    },
  ];

  const SidebarContent = (
    <Box className={cn('h-full bg-white flex flex-col')}>
      <Toolbar className={cn('flex justify-between md:hidden')}>
        <Typography variant="h6" className={cn('font-bold')}>
          Menu
        </Typography>
        <IconButton onClick={() => setMobileOpen(false)}></IconButton>
      </Toolbar>
      <List className={cn('p-2 space-y-1')}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <ListItemIcon
                  className={cn(isActive ? 'text-blue-600' : 'text-gray-400')}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box className={cn('flex min-h-screen bg-gray-50')}>
      <AppBar
        position="fixed"
        className={cn(
          'bg-white text-gray-900 shadow-none',
          'border-b border-gray-200 z-[1201]'
        )}
      >
        <Toolbar className={cn('flex justify-between items-center')}>
          <Box className={cn('flex items-center gap-2')}>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              className={cn('md:hidden')}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={cn('font-bold flex items-center gap-2 text-blue-600')}
            >
              <StickyNote fill="currentColor" />{' '}
              <span className={cn('text-gray-900')}>NoteApp</span>
            </Typography>
          </Box>
          <IconButton
            onClick={handleLogout}
            className={cn('text-red-500 hover:bg-red-50')}
          >
            <LogOut size={20} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        className={cn('hidden md:block w-[240px] flex-shrink-0')}
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid #e5e7eb',
            },
          }}
          open
        >
          <Toolbar />
          {SidebarContent}
        </Drawer>
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {SidebarContent}
      </Drawer>

      <Box component="main" className={cn('flex-grow p-4 md:p-8 w-full')}>
        <Toolbar />
        <Box className={cn('max-w-6xl mx-auto')}>{children}</Box>
      </Box>
    </Box>
  );
}
