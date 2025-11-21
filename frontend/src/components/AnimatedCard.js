import React from 'react';
import { Card, CardContent, CardActions, Box } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedCard = ({
  children,
  actions,
  delay = 0,
  hover = true,
  sx = {},
  ...props
}) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const hoverVariants = hover ? {
    hover: {
      y: -8,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  } : {};

  return (
    <Card
      component={motion.div}
      variants={{ ...cardVariants, ...hoverVariants }}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        },
        ...sx,
      }}
      {...props}
    >
      <CardContent sx={{ p: 3 }}>
        {children}
      </CardContent>
      {actions && (
        <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </Card>
  );
};

export default AnimatedCard;