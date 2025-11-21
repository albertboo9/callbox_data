import { createTheme } from '@mui/material/styles';

// Cyberpunk color palette
const colors = {
  primary: {
    main: '#3b82f6', 
    light: '#60a5fa',
    dark: '#2563eb',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#06b6d4', 
    light: '#22d3ee',
    dark: '#0891b2',
    contrastText: '#ffffff',
  },
  accent: {
    purple: '#8b5cf6',
    pink: '#ec4899',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  },
  background: {
    default: '#0f0f23', // Deep space
    paper: '#1a1a2e', // Dark navy
    alt: '#16213e', // Darker blue
    glass: 'rgba(15, 23, 42, 0.8)',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(59, 130, 246, 0.2)',
  border: {
    light: 'rgba(59, 130, 246, 0.3)',
    medium: 'rgba(59, 130, 246, 0.5)',
    strong: 'rgba(59, 130, 246, 0.8)',
  },
  glow: {
    primary: 'rgba(59, 130, 246, 0.5)',
    secondary: 'rgba(6, 182, 212, 0.5)',
    accent: 'rgba(139, 92, 246, 0.5)',
  }
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: colors.text,
    divider: colors.divider,
    // Custom colors
    accent: colors.accent,
    border: colors.border,
    glow: colors.glow,
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 900,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },

  shape: {
    borderRadius: 12,
  },

  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.3)',
    '0 4px 6px rgba(0, 0, 0, 0.3)',
    '0 10px 15px rgba(0, 0, 0, 0.3)',
    '0 20px 25px rgba(0, 0, 0, 0.3)',
    '0 25px 50px rgba(0, 0, 0, 0.4)',
    // Custom glow shadows
    '0 0 20px rgba(59, 130, 246, 0.3)',
    '0 0 30px rgba(59, 130, 246, 0.4)',
    '0 0 40px rgba(59, 130, 246, 0.5)',
    '0 0 20px rgba(6, 182, 212, 0.3)',
    '0 0 30px rgba(6, 182, 212, 0.4)',
    '0 0 40px rgba(6, 182, 212, 0.5)',
    '0 0 20px rgba(139, 92, 246, 0.3)',
    '0 0 30px rgba(139, 92, 246, 0.4)',
    '0 0 40px rgba(139, 92, 246, 0.5)',
    '0 0 20px rgba(16, 185, 129, 0.3)',
    '0 0 30px rgba(16, 185, 129, 0.4)',
    '0 0 40px rgba(16, 185, 129, 0.5)',
    '0 0 20px rgba(245, 158, 11, 0.3)',
    '0 0 30px rgba(245, 158, 11, 0.4)',
    '0 0 40px rgba(245, 158, 11, 0.5)',
    '0 0 20px rgba(236, 72, 153, 0.3)',
    '0 0 30px rgba(236, 72, 153, 0.4)',
    '0 0 40px rgba(236, 72, 153, 0.5)',
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.primary.main} ${colors.background.paper}`,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: colors.background.paper,
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.primary.main,
            borderRadius: '4px',
            '&:hover': {
              background: colors.primary.dark,
            },
          },
        },
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          scrollBehavior: 'smooth',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '12px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '@media (max-width:600px)': {
            fontSize: '0.9rem',
            padding: '10px 20px',
            minHeight: 44,
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`,
          color: 'white',
          boxShadow: `0 4px 20px ${colors.glow.primary}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary.dark}, ${colors.secondary.dark})`,
            boxShadow: `0 8px 30px ${colors.glow.primary}`,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: colors.border.medium,
          color: colors.text.primary,
          '&:hover': {
            borderColor: colors.primary.main,
            background: 'rgba(59, 130, 246, 0.1)',
            color: colors.primary.main,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: colors.background.glass,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border.light}`,
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: colors.background.glass,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border.light}`,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 12,
            '& fieldset': {
              borderColor: colors.border.medium,
            },
            '&:hover fieldset': {
              borderColor: colors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              boxShadow: `0 0 20px ${colors.glow.primary}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            '&.Mui-focused': {
              color: colors.primary.main,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: colors.text.primary,
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.background.glass,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.border.light}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `linear-gradient(135deg, ${colors.background.default}, ${colors.background.paper})`,
          borderRight: `1px solid ${colors.border.light}`,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(59, 130, 246, 0.1)',
          border: `1px solid ${colors.border.light}`,
          color: colors.primary.main,
          '&.MuiChip-colorPrimary': {
            background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`,
            color: 'white',
          },
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`,
          boxShadow: `0 0 20px ${colors.glow.primary}`,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          background: colors.background.glass,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border.light}`,
          borderRadius: 12,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            background: 'rgba(59, 130, 246, 0.1)',
          },
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Add custom properties to theme
theme.custom = {
  colors,
  glow: {
    primary: `0 0 20px ${colors.primary.main}40`,
    secondary: `0 0 20px ${colors.secondary.main}40`,
    accent: `0 0 20px ${colors.accent.purple}40`,
  },
  gradients: {
    primary: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`,
    secondary: `linear-gradient(135deg, ${colors.secondary.main}, ${colors.accent.purple})`,
    accent: `linear-gradient(135deg, ${colors.accent.purple}, ${colors.accent.pink})`,
    background: `linear-gradient(135deg, ${colors.background.default}, ${colors.background.paper}, ${colors.background.alt})`,
  },
};

export default theme;