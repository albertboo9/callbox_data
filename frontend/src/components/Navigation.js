import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  X as CloseIcon,
  BarChart3,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    handleCloseProfileMenu();
  };

  const navigationItems = [
    { label: 'Tableau de bord', path: '/dashboard', icon: <BarChart3 size={20} /> },
    { label: 'Sondages', path: '/surveys', icon: <BarChart3 size={20} /> },
  ];

  const drawer = (
    <Box sx={{ width: 280, height: '100%', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' }}>
      {/* Header */}
      <Box sx={{
        p: 3,
        borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            📊
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>
            CallBoxData
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Info */}
      {user && (
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                fontWeight: 700,
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'white' }}>
                {user.name}
              </Typography>
              <Chip
                label={user.role === 'merchant' ? 'Marchand' : user.role === 'company' ? 'Entreprise' : 'Admin'}
                size="small"
                sx={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  fontSize: '0.7rem',
                }}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Navigation Items */}
      <List sx={{ pt: 2 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                mx: 2,
                my: 1,
                borderRadius: 2,
                background: location.pathname === item.path
                  ? 'rgba(59, 130, 246, 0.2)'
                  : 'transparent',
                border: location.pathname === item.path
                  ? '1px solid rgba(59, 130, 246, 0.3)'
                  : 'none',
                '&:hover': {
                  background: 'rgba(59, 130, 246, 0.1)',
                },
              }}
            >
              <Box sx={{ color: '#3b82f6', mr: 2 }}>
                {item.icon}
              </Box>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: 'white',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout */}
      {user && (
        <Box sx={{ p: 3, mt: 'auto' }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleLogout}
            startIcon={<LogOut size={20} />}
            sx={{
              borderColor: 'rgba(239, 68, 68, 0.5)',
              color: '#ef4444',
              '&:hover': {
                borderColor: '#ef4444',
                background: 'rgba(239, 68, 68, 0.1)',
              },
            }}
          >
            Déconnexion
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(26, 26, 46, 0.95))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
            }}
            onClick={() => navigate(user ? '/dashboard' : '/')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                }}
              >
                📊
              </Box>
            </motion.div>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              CallBoxData
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && user && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navigationItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: location.pathname === item.path ? '#3b82f6' : 'rgba(255, 255, 255, 0.8)',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      '&:hover': {
                        color: '#3b82f6',
                        background: 'rgba(59, 130, 246, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          {/* User Menu / Auth Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                {/* User Avatar */}
                <IconButton
                  onClick={handleProfileMenu}
                  sx={{
                    p: 0.5,
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    '&:hover': {
                      borderColor: '#3b82f6',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>

                {/* Profile Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseProfileMenu}
                  sx={{
                    '& .MuiPaper-root': {
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(26, 26, 46, 0.95))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: 2,
                      minWidth: 200,
                    },
                  }}
                >
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'white' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {user.email}
                    </Typography>
                    <Chip
                      label={user.role === 'merchant' ? 'Marchand' : user.role === 'company' ? 'Entreprise' : 'Admin'}
                      size="small"
                      sx={{
                        mt: 1,
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  <MenuItem onClick={handleCloseProfileMenu} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    <User size={16} style={{ marginRight: 8 }} />
                    Profil
                  </MenuItem>
                  <MenuItem onClick={handleCloseProfileMenu} sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    <Settings size={16} style={{ marginRight: 8 }} />
                    Paramètres
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      color: '#ef4444',
                      '&:hover': {
                        background: 'rgba(239, 68, 68, 0.1)',
                      },
                    }}
                  >
                    <LogOut size={16} style={{ marginRight: 8 }} />
                    Déconnexion
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                      color: '#3b82f6',
                      '&:hover': {
                        borderColor: '#3b82f6',
                        background: 'rgba(59, 130, 246, 0.1)',
                      },
                    }}
                  >
                    Connexion
                  </Button>
                </motion.div>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && user && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    color: '#3b82f6',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
            borderRight: '1px solid rgba(59, 130, 246, 0.2)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar Spacer */}
      <Toolbar />
    </>
  );
};

export default Navigation;