import React from 'react';
import { Button as MuiButton, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  padding: '12px 24px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',

  // Glow effect for gradient buttons
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },

  '&:hover::before': {
    left: '100%',
  },

  // Responsive adjustments
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '10px 20px',
    minHeight: 44, // Better touch target
  },

  // Variant-specific styles
  ...(variant === 'gradient' && {
    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    color: 'white',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',

    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb, #0891b2)',
      boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
      transform: 'translateY(-2px)',
    },

    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)',
    },
  }),

  ...(variant === 'glass' && {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',

    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(59, 130, 246, 0.4)',
      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
    },
  }),

  ...(variant === 'neon' && {
    background: 'transparent',
    border: '2px solid #3b82f6',
    color: '#3b82f6',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',

    '&:hover': {
      background: '#3b82f6',
      color: 'white',
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
      textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
    },
  }),

  // Loading state
  '&.loading': {
    pointerEvents: 'none',
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      width: 20,
      height: 20,
      margin: 'auto',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  },
}));

const Button = React.forwardRef(({
  children,
  variant = 'contained',
  size = 'medium',
  loading = false,
  icon,
  fullWidthMobile = false,
  glow = false,
  ...props
}, ref) => {
  const MotionButton = motion(StyledButton);

  return (
    <MotionButton
      ref={ref}
      variant={variant}
      size={size}
      className={loading ? 'loading' : ''}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{
        ...(fullWidthMobile && {
          width: { xs: '100%', sm: 'auto' },
        }),
        ...(glow && {
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
          animation: 'pulse 2s infinite',
        }),
        ...props.sx,
      }}
      {...props}
    >
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      )}
      {loading ? 'Chargement...' : children}
    </MotionButton>
  );
});

Button.displayName = 'Button';

export default Button;