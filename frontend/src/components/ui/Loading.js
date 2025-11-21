import React from 'react';
import {
  Box,
  Skeleton,
  CircularProgress,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import SkeletonCard from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Simple Loading Spinner
export const LoadingSpinner = ({
  size = 40,
  color = 'primary',
  thickness = 3.6,
  ...props
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    {...props}
  >
    <CircularProgress
      size={size}
      color={color}
      thickness={thickness}
    />
  </Box>
);

// Full Page Loading
export const PageLoading = ({ message = 'Chargement...' }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'background.default',
      zIndex: 9999,
    }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <CircularProgress size={60} thickness={4} />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Typography
        variant="h6"
        sx={{ mt: 2, color: 'text.secondary' }}
      >
        {message}
      </Typography>
    </motion.div>
  </Box>
);

// Inline Loading
export const InlineLoading = ({ size = 'medium', message }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    sx={{ py: 2 }}
  >
    <CircularProgress size={size === 'small' ? 20 : size === 'large' ? 40 : 30} />
    {message && (
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    )}
  </Box>
);

// Linear Loading Bar
export const LoadingBar = ({ message, ...props }) => (
  <Box sx={{ width: '100%', mb: 2 }}>
    <LinearProgress {...props} />
    {message && (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, textAlign: 'center' }}
      >
        {message}
      </Typography>
    )}
  </Box>
);

// Card Skeleton
export const CardSkeleton = ({ height = 200, showAvatar = true }) => (
  <Card sx={{ height }}>
    <CardContent>
      {showAvatar && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ ml: 2, flex: 1 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Box>
        </Box>
      )}
      <Skeleton variant="text" height={28} width="80%" />
      <Skeleton variant="text" height={20} width="60%" />
      <Skeleton variant="text" height={20} width="70%" />
      <Box sx={{ mt: 2 }}>
        <Skeleton variant="rectangular" height={100} />
      </Box>
    </CardContent>
  </Card>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Box>
    {/* Header */}
    <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} variant="text" width={120} height={24} />
      ))}
    </Box>

    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box key={rowIndex} sx={{ display: 'flex', mb: 1, gap: 2, alignItems: 'center' }}>
        <Skeleton variant="circular" width={32} height={32} />
        {Array.from({ length: columns - 1 }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width={100 + Math.random() * 50} height={20} />
        ))}
      </Box>
    ))}
  </Box>
);

// Dashboard Skeleton
export const DashboardSkeleton = () => (
  <Box>
    {/* Stats Cards */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid item xs={12} md={3} key={i}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ ml: 2 }}>
                  <Skeleton variant="text" width={80} height={24} />
                  <Skeleton variant="text" width={60} height={20} />
                </Box>
              </Box>
              <Skeleton variant="text" width={60} height={32} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    {/* Charts */}
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={300} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Skeleton variant="text" width={150} height={32} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={300} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

// Form Skeleton
export const FormSkeleton = () => (
  <Box sx={{ maxWidth: 600, mx: 'auto' }}>
    <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />

    {Array.from({ length: 4 }).map((_, i) => (
      <Box key={i} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={56} />
      </Box>
    ))}

    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
      <Skeleton variant="rectangular" width={120} height={48} />
      <Skeleton variant="rectangular" width={100} height={48} />
    </Box>
  </Box>
);

// Shimmer Effect Component
export const Shimmer = ({ width = '100%', height = 20, borderRadius = 4 }) => (
  <Box
    sx={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      '@keyframes shimmer': {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
    }}
  />
);

export default {
  Spinner: LoadingSpinner,
  Page: PageLoading,
  Inline: InlineLoading,
  Bar: LoadingBar,
  Card: CardSkeleton,
  Table: TableSkeleton,
  Dashboard: DashboardSkeleton,
  Form: FormSkeleton,
  Shimmer,
};