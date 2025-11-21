import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  PersonAdd,
  LockOutlined,
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Person,
  Business,
  Store,
  AdminPanelSettings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme as useCustomTheme } from '../ThemeContext';
import axios from 'axios';

const Login = () => {
  const theme = useTheme();
  const { isDark } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'merchant'
  });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/register' : '/login';
      const payload = isRegister
        ? formData
        : { email: formData.email, password: formData.password };

      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, payload);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect based on role
      switch (response.data.user.role) {
        case 'company':
          navigate('/dashboard');
          break;
        case 'merchant':
          navigate('/surveys');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'company':
        return <Business />;
      case 'merchant':
        return <Store />;
      default:
        return <Person />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'company':
        return 'Entreprise';
      case 'merchant':
        return 'Marchand';
      default:
        return role;
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={isDark ? 4 : 2}
            sx={{
              padding: isMobile ? 3 : 4,
              borderRadius: 4,
              background: isDark
                ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                  }}
                >
                  {isRegister ? <PersonAdd sx={{ fontSize: 40 }} /> : <LockOutlined sx={{ fontSize: 40 }} />}
                </Avatar>
              </motion.div>

              <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  fontSize: isMobile ? '1.75rem' : '2rem',
                }}
              >
                CallBoxData
              </Typography>
              <Typography
                component="h2"
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {isRegister ? 'Créer un compte' : 'Se connecter'}
              </Typography>
            </Box>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: 'error.main',
                    },
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* Registration Fields */}
              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nom complet"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Numéro de téléphone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                </motion.div>
              )}

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isRegister ? 0.1 : 0.1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: isRegister ? 0.2 : 0.2 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </motion.div>

              {/* Role Selection for Registration */}
              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FormControl
                    fullWidth
                    margin="normal"
                    sx={{ mb: 3 }}
                  >
                    <InputLabel>Rôle</InputLabel>
                    <Select
                      value={formData.role}
                      label="Rôle"
                      name="role"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          {getRoleIcon(formData.role)}
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="merchant">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Store color="secondary" />
                          <span>Marchand</span>
                        </Box>
                      </MenuItem>
                      <MenuItem value="company">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Business color="primary" />
                          <span>Entreprise</span>
                        </Box>
                      </MenuItem>
                      <MenuItem value="admin">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AdminPanelSettings color="error" />
                          <span>Administrateur</span>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isRegister ? 0.4 : 0.3 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 3,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #be185d 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                    },
                  }}
                  disabled={loading}
                >
                  {loading ? 'Chargement...' : (isRegister ? 'Créer le compte' : 'Se connecter')}
                </Button>
              </motion.div>

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  ou
                </Typography>
              </Divider>

              {/* Toggle between login/register */}
              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsRegister(!isRegister)}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {isRegister
                    ? 'Déjà un compte ? Se connecter'
                    : 'Pas encore de compte ? S\'inscrire'
                  }
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4, maxWidth: 400 }}
          >
            Collectez des données de qualité avec CallBoxData.
            La plateforme de sondage moderne et intuitive.
          </Typography>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Login;