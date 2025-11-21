import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Users,
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  TrendingUp,
  Database,
  Target,
  Sparkles,
  Award,
  Globe,
  Play,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const containerRef = useRef(null);

  // Using AOS for scroll animations instead of Framer Motion scroll hooks to avoid hydration issues

  useEffect(() => {
    setIsLoaded(true);

    // Hide scroll indicator after 5 seconds
    const timer = setTimeout(() => setShowScrollIndicator(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Advanced animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };


  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const features = [
    {
      icon: <Database size={24} />,
      title: 'Stockage Sécurisé',
      description: 'Base de données cloud avec chiffrement et sauvegardes automatiques.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Sécurité Avancée',
      description: 'Authentification sécurisée et protection des données sensibles.',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Optimisé',
      description: 'Interface adaptée à tous les appareils avec expérience fluide.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analyses Détaillées',
      description: 'Rapports complets et tableaux de bord intuitifs.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Performance',
      description: 'Application rapide et réactive pour une productivité maximale.',
    },
    {
      icon: <Target size={24} />,
      title: 'Précision',
      description: 'Collecte de données fiable avec validation en temps réel.',
    }
  ];

  const stats = [
    { value: '10K+', label: 'Utilisateurs actifs' },
    { value: '500K+', label: 'Sondages créés' },
    { value: '99.9%', label: 'Disponibilité' },
    { value: '4.9/5', label: 'Satisfaction client' }
  ];

  if (!isLoaded) {
    return (
      <Box sx={{
        minHeight: '100vh',
        background: theme.custom.gradients.surface,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: theme.custom.gradients.primary,
            opacity: 0.1,
            top: '20%',
            left: '10%',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: theme.custom.gradients.accent,
            opacity: 0.1,
            bottom: '20%',
            right: '10%',
          }}
        />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1
          }}
        >
          <Box sx={{
            position: 'relative',
            zIndex: 1,
          }}>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: theme.custom.gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme.custom.shadows.colored.primary,
                mb: 3,
              }}>
                <Sparkles size={40} color="white" />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary"
                textAlign="center"
                sx={{ mb: 2 }}
              >
                CallBoxData
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                Chargement de l'expérience...
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        background: theme.custom.gradients.surface,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: theme.custom.gradients.primary,
            opacity: 0.05,
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{
            backgroundPosition: ['100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: theme.custom.gradients.accent,
            opacity: 0.05,
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: theme.custom.gradients.secondary,
            opacity: 0.03,
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Header */}
      <Box sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: 1,
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
          }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: theme.custom.gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme.custom.shadows.colored.primary,
              }}>
                <Sparkles size={24} color="white" />
              </Box>
              <Typography variant="h6" fontWeight={700} color="primary">
                CallBoxData
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Connexion
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  background: theme.custom.gradients.primary,
                  boxShadow: theme.custom.shadows.colored.primary,
                }}
              >
                Commencer
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        py: { xs: 8, md: 16 },
        position: 'relative',
        zIndex: 1,
      }}>
        <Container maxWidth="lg">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div variants={heroItemVariants}>
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        mb: 4,
                        fontWeight: 800,
                        background: theme.custom.gradients.primary,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.1,
                      }}
                    >
                      Collectez des données
                      <motion.span
                        animate={{
                          color: ['#6366f1', '#a855f7', '#f59e0b', '#6366f1'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ display: 'block' }}
                      >
                        d'excellence
                      </motion.span>
                    </Typography>
                  </motion.div>

                  <motion.div variants={heroItemVariants}>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{ mb: 6, lineHeight: 1.6, maxWidth: 500 }}
                    >
                      Révolutionnez votre collecte de données avec une plateforme moderne,
                      sécurisée et intuitive. Analyses avancées et expérience mobile optimale.
                    </Typography>
                  </motion.div>

                  <motion.div variants={heroItemVariants}>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 6 }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => navigate('/login')}
                          endIcon={<ArrowRight size={20} />}
                          sx={{
                            minWidth: 180,
                            py: 1.5,
                            px: 4,
                            background: theme.custom.gradients.primary,
                            boxShadow: theme.custom.shadows.colored.primary,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                          }}
                        >
                          Commencer
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outlined"
                          size="large"
                          sx={{
                            minWidth: 180,
                            py: 1.5,
                            px: 4,
                            borderWidth: 2,
                            '&:hover': {
                              borderWidth: 2,
                              background: 'rgba(99, 102, 241, 0.05)',
                            }
                          }}
                        >
                          <Play size={20} style={{ marginRight: 8 }} />
                          Démo
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>

                  {/* Enhanced Trust indicators */}
                  <motion.div variants={heroItemVariants}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                          <Award size={24} color={theme.palette.secondary.main} />
                        </motion.div>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  repeatDelay: 3
                                }}
                              >
                                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                              </motion.div>
                            ))}
                          </Box>
                          <Typography variant="body2" fontWeight={600}>
                            4.9/5
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Globe size={24} color={theme.palette.primary.main} />
                        </motion.div>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            10K+
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            utilisateurs actifs
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  variants={heroItemVariants}
                  style={{ position: 'relative' }}
                >
                  {/* Floating elements */}
                  <motion.div
                    animate={{
                      y: [-20, 20, -20],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      zIndex: 0,
                    }}
                  >
                    <Box sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: theme.custom.gradients.accent,
                      opacity: 0.6,
                    }} />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [20, -20, 20],
                      x: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    style={{
                      position: 'absolute',
                      bottom: -30,
                      left: -30,
                      zIndex: 0,
                    }}
                  >
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: theme.custom.gradients.secondary,
                      opacity: 0.4,
                    }} />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        height: { xs: 350, md: 450 },
                        background: theme.custom.gradients.card,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: theme.custom.shadows.strong,
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Animated background pattern */}
                      <motion.div
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear"
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          opacity: 0.05,
                          background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}, transparent 50%),
                                     radial-gradient(circle at 80% 20%, ${theme.palette.accent.main}, transparent 50%),
                                     radial-gradient(circle at 40% 40%, ${theme.palette.secondary.main}, transparent 50%)`,
                        }}
                      />

                      <Box sx={{
                        width: '90%',
                        height: '85%',
                        backgroundColor: 'background.paper',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                            >
                              <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: theme.custom.gradients.primary,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                                <BarChart3 size={20} color="white" />
                              </Box>
                            </motion.div>
                            <Box>
                              <Typography variant="h6" fontWeight={700}>
                                Tableau de bord
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Analyse en temps réel
                              </Typography>
                            </Box>
                          </Box>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        >
                          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Box sx={{
                                flex: 1,
                                p: 3,
                                background: theme.custom.gradients.surface,
                                borderRadius: 2,
                                textAlign: 'center',
                                border: `1px solid ${theme.palette.divider}`,
                              }}>
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                >
                                  <Typography variant="h3" fontWeight={800} color="primary">
                                    245
                                  </Typography>
                                </motion.div>
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                  Réponses
                                </Typography>
                              </Box>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <Box sx={{
                                flex: 1,
                                p: 3,
                                background: theme.custom.gradients.surface,
                                borderRadius: 2,
                                textAlign: 'center',
                                border: `1px solid ${theme.palette.divider}`,
                              }}>
                                <motion.div
                                  animate={{
                                    color: ['#22c55e', '#16a34a', '#15803d', '#22c55e'],
                                  }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                >
                                  <Typography variant="h3" fontWeight={800}>
                                    78%
                                  </Typography>
                                </motion.div>
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                  Taux de completion
                                </Typography>
                              </Box>
                            </motion.div>
                          </Box>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
                        >
                          <Box sx={{
                            flex: 1,
                            background: theme.custom.gradients.surface,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${theme.palette.divider}`,
                            position: 'relative',
                            overflow: 'hidden',
                          }}>
                            {/* Animated chart background */}
                            <motion.div
                              animate={{
                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                              }}
                              transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: 0.1,
                                background: `linear-gradient(45deg,
                                  ${theme.palette.primary.main},
                                  ${theme.palette.accent.main},
                                  ${theme.palette.secondary.main},
                                  ${theme.palette.primary.main})`,
                                backgroundSize: '400% 400%',
                              }}
                            />
                            <motion.div
                              animate={{
                                y: [0, -5, 0],
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <TrendingUp size={64} color={theme.palette.primary.main} />
                            </motion.div>
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 2, duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fab
                size="small"
                sx={{
                  background: theme.custom.gradients.primary,
                  boxShadow: theme.custom.shadows.colored.primary,
                  '&:hover': {
                    background: theme.custom.gradients.primary,
                  }
                }}
              >
                <ChevronDown size={20} color="white" />
              </Fab>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <Box
        sx={{ py: { xs: 10, md: 16 }, backgroundColor: 'background.paper' }}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight={700}
              sx={{
                mb: 4,
                background: theme.custom.gradients.primary,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Fonctionnalités puissantes
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 10, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Tout ce dont vous avez besoin pour collecter et analyser vos données efficacement
              avec une expérience utilisateur exceptionnelle
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={cardHoverVariants}
                    whileHover="hover"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Card sx={{
                      height: '100%',
                      p: 4,
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      background: theme.custom.gradients.card,
                      border: `1px solid ${theme.palette.divider}`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: theme.custom.gradients.primary,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}>
                      {/* Animated background element */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                        style={{
                          position: 'absolute',
                          top: -20,
                          right: -20,
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: theme.custom.gradients.primary,
                          opacity: 0.05,
                        }}
                      />

                      <Box sx={{
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 3,
                            background: theme.custom.gradients.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 4,
                            color: 'white',
                            boxShadow: theme.custom.shadows.colored.primary,
                          }}>
                            {feature.icon}
                          </Box>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                        >
                          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {feature.description}
                          </Typography>
                        </motion.div>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          background: theme.custom.gradients.primary,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
        data-aos="fade-in"
        data-aos-duration="1500"
      >
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(30px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Chiffres qui comptent
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mb: 8, opacity: 0.9 }}
            >
              La confiance de milliers d'utilisateurs
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{ height: '100%' }}
                >
                  <Box sx={{
                    textAlign: 'center',
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-5px)',
                    }
                  }}>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        color: ['#ffffff', '#f0f9ff', '#ffffff'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                          mb: 2,
                          fontSize: { xs: '2.5rem', md: '3rem' },
                          background: 'linear-gradient(135deg, #ffffff, #f0f9ff)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </motion.div>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          backgroundColor: 'background.default',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Floating elements */}
        <motion.div
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: theme.custom.gradients.primary,
            opacity: 0.05,
            filter: 'blur(30px)',
          }}
        />
        <motion.div
          animate={{
            y: [30, -30, 30],
            x: [20, -20, 20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '5%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: theme.custom.gradients.accent,
            opacity: 0.05,
            filter: 'blur(40px)',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  mb: 4,
                  background: theme.custom.gradients.primary,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Prêt à révolutionner
                <br />
                votre collecte de données ?
              </Typography>
            </motion.div>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Rejoignez des milliers d'utilisateurs qui font confiance à CallBoxData
              pour des analyses de données exceptionnelles
            </Typography>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                endIcon={<ArrowRight size={24} />}
                sx={{
                  minWidth: 250,
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  background: theme.custom.gradients.primary,
                  boxShadow: theme.custom.shadows.colored.primary,
                  borderRadius: 3,
                  '&:hover': {
                    background: theme.custom.gradients.primary,
                    boxShadow: theme.custom.shadows.colored.primary,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Commencer maintenant
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              data-aos="fade-in"
              data-aos-delay="800"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 4, fontSize: '0.9rem' }}
              >
                ✅ Configuration en 5 minutes • ✅ Support 24/7 • ✅ Sécurité garantie
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
      data-aos="fade-up"
      data-aos-duration="800"
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
            }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                >
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: theme.custom.gradients.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: theme.custom.shadows.colored.primary,
                  }}>
                    <Sparkles size={20} color="white" />
                  </Box>
                  <Typography variant="h6" fontWeight={700} color="primary">
                    CallBoxData
                  </Typography>
                </Box>
              </motion.div>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary">
                  Plateforme de sondage moderne
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  © 2024 CallBoxData. Tous droits réservés.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;