import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const StyledToaster = styled(Toaster)(({ theme }) => ({
  '& .Toastify__toast': {
    borderRadius: 12,
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.9rem',
    fontWeight: 500,
    boxShadow: theme.shadows[8],
    border: `1px solid ${theme.palette.divider}`,
  },

  '& .Toastify__toast--success': {
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    borderColor: theme.palette.success.light,
  },

  '& .Toastify__toast--error': {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    borderColor: theme.palette.error.light,
  },

  '& .Toastify__toast--warning': {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    borderColor: theme.palette.warning.light,
  },

  '& .Toastify__toast--info': {
    background: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    borderColor: theme.palette.info.light,
  },

  '& .Toastify__toast-icon': {
    width: 20,
    height: 20,
  },

  '& .Toastify__close-button': {
    color: 'currentColor',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

// Toast Container Component
export const ToastContainer = () => (
  <StyledToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        maxWidth: '500px',
      },
    }}
  />
);

// Toast Functions
export const showToast = {
  success: (message, options = {}) => toast.success(message, {
    icon: <CheckCircle size={20} />,
    ...options,
  }),

  error: (message, options = {}) => toast.error(message, {
    icon: <AlertCircle size={20} />,
    ...options,
  }),

  warning: (message, options = {}) => toast.warning(message, {
    icon: <AlertTriangle size={20} />,
    ...options,
  }),

  info: (message, options = {}) => toast.info(message, {
    icon: <Info size={20} />,
    ...options,
  }),

  loading: (message, options = {}) => toast.loading(message, options),

  dismiss: (toastId) => toast.dismiss(toastId),

  dismissAll: () => toast.dismiss(),
};

// Custom Toast Component for complex content
export const CustomToast = ({ message, type = 'info', action, onAction }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ flex: 1 }}>{message}</Box>
    {action && (
      <IconButton
        size="small"
        onClick={onAction}
        sx={{
          color: 'inherit',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        }}
      >
        {action}
      </IconButton>
    )}
  </Box>
);

// Promise Toast for async operations
export const promiseToast = async (promise, messages, options = {}) => {
  const { loading = 'Loading...', success = 'Success!', error = 'Error occurred' } = messages;

  return toast.promise(promise, {
    loading,
    success,
    error,
  }, options);
};

export default showToast;