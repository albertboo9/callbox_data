import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
} from '@mui/material';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import {
  BarChart3,
  Users,
  Smartphone,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  Target,
  ChevronDown,
  Sparkles,
  Cpu,
  Database,
  Wifi,
  Lock,
  Eye,
  MessageSquare,
  BarChart,
  PieChart,
  Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import { showToast } from './ui/Toast';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const glowAnimation = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(59, 130, 246, 0.5)',
        '0 0 40px rgba(59, 130, 246, 0.8)',
        '0 0 20px rgba(59, 130, 246, 0.5)',
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const features = [
    {
      icon: <Database size={32} />,
      title: 'Base de Données Sécurisée',
      description: 'Stockage cloud avec Firebase, chiffrement de bout en bout et sauvegardes automatiques.',
      color: '#3b82f6',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      delay: 0.1
    },
    {
      icon: <Shield size={32} />,
      title: 'Sécurité Renforcée',
      description: 'Authentification JWT, autorisations granulaires et protection contre les attaques.',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.3)',
      delay: 0.2
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile First',
      description: 'Interface optimisée pour tous les appareils avec mode hors ligne intégré.',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      delay: 0.3
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Analyses Avancées',
      description: 'Tableaux de bord interactifs avec graphiques en temps réel et exports.',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      delay: 0.4
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance',
      description: 'Application ultra-rapide avec cache intelligent et optimisation automatique.',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.3)',
      delay: 0.5
    },
    {
      icon: <Globe size={32} />,
      title: 'API RESTful',
      description: 'Architecture moderne avec endpoints documentés et SDK disponibles.',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.3)',
      delay: 0.6
    }
  ];

  const stats = [
    { value: '10K+', label: 'Utilisateurs actifs', icon: <Users />, color: '#3b82f6' },
    { value: '500K+', label: 'Sondages créés', icon: <BarChart />, color: '#06b6d4' },
    { value: '99.9%', label: 'Disponibilité', icon: <Activity />, color: '#10b981' },
    { value: '4.9/5', label: 'Satisfaction', icon: <Star />, color: '#8b5cf6' }
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Marketing',
      company: 'TechCorp',
      avatar: 'MD',
      content: 'CallBoxData a révolutionné notre façon de collecter les retours clients. L\'interface est intuitive et les analyses sont d\'une précision remarquable.',
      rating: 5,
      color: '#3b82f6'
    },
    {
      name: 'Ahmed Benali',
      role: 'Marchand',
      company: 'Boutique Locale',
      avatar: 'AB',
      content: 'Enfin une solution simple pour collecter les avis de mes clients. Le mode hors ligne est parfait pour mon activité.',
      rating: 5,
      color: '#06b6d4'
    },
    {
      name: 'Sophie Martin',
      role: 'Chef de Projet',
      company: 'DataInsights',
      avatar: 'SM',
      content: 'Les tableaux de bord sont époustouflants. Nous avons gagné un temps considérable dans l\'analyse de nos données.',
      rating: 5,
      color: '#10b981'
    }
  ];

  if (!isLoaded) {
    return (
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
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
            background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
          }}>
            <Sparkles size={32} color="white" />
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Animated Background Elements */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `linear-gradient(45deg, ${['#3b82f6', '#06b6d4', '#8b5cf6'][i % 3]}, transparent)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: 0.3,
          }}
        />
      </Box>

      {/* Hero Section */}
      <Box
        ref={heroRef}
        sx={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Hero Background Effects */}
        <motion.div
          style={{ y, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0"
        >
          {/* Main glow orb */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            }}
          />

          {/* Secondary glow orb */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '30%',
              left: '15%',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
              filter: 'blur(50px)',
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
            }}
          />

          {/* Accent glow orb */}
          <Box
            sx={{
              position: 'absolute',
              top: '60%',
              right: '30%',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
            }}
          />
        </motion.div>

        <Container maxWidth="xl" sx={{ py: 8, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Chip
                    label="🚀 Nouvelle Version Disponible"
                    sx={{
                      mb: 3,
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      color: '#3b82f6',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      '& .MuiChip-label': {
                        fontSize: '0.85rem',
                      },
                    }}
                  />
                </motion.div>

                {/* Main Title */}
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    mb: 3,
                    fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                    lineHeight: 1.1,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                  }}
                >
                  Collectez des Données d'Excellence
                </Typography>

                {/* Subtitle */}
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                  }}
                >
                  Révolutionnez votre collecte de données avec CallBoxData.
                  Interface futuriste, analyses avancées, sécurité maximale.
                </Typography>

                {/* CTA Buttons */}
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="gradient"
                      size="large"
                      onClick={() => navigate('/login')}
                      icon={<ArrowRight size={20} />}
                      sx={{
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                        border: '1px solid rgba(59, 130, 246, 0.5)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                          boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)',
                        },
                      }}
                    >
                      Commencer Maintenant
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="glass"
                      size="large"
                      icon={<Play size={20} />}
                      sx={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(20px)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.4)',
                        },
                      }}
                    >
                      Voir la Démo
                    </Button>
                  </motion.div>
                </Box>

                {/* Social Proof */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                      >
                        <Star
                          size={20}
                          fill="#fbbf24"
                          color="#fbbf24"
                          style={{
                            filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))',
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 500,
                    }}
                  >
                    4.9/5 basé sur 2,500+ avis • 10,000+ utilisateurs actifs
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Hero Visual */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                style={{
                  transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 400, md: 500, lg: 600 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Main Dashboard Mockup */}
                  <motion.div
                    animate={glowAnimation}
                    style={{
                      width: '100%',
                      maxWidth: 400,
                      height: '90%',
                      borderRadius: 24,
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Header */}
                    <Box sx={{
                      p: 3,
                      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}>
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
                      <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ color: 'white', fontSize: '1.1rem' }}>
                          CallBoxData
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          Tableau de bord
                        </Typography>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3, height: 'calc(100% - 80px)' }}>
                      {/* Stats */}
                      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Box sx={{
                          flex: 1,
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                        }}>
                          <Typography variant="h4" fontWeight={700} sx={{ color: '#3b82f6' }}>
                            245
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Réponses
                          </Typography>
                        </Box>
                        <Box sx={{
                          flex: 1,
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(6, 182, 212, 0.1)',
                          border: '1px solid rgba(6, 182, 212, 0.2)',
                        }}>
                          <Typography variant="h4" fontWeight={700} sx={{ color: '#06b6d4' }}>
                            78%
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Completion
                          </Typography>
                        </Box>
                      </Box>

                      {/* Chart Placeholder */}
                      <Box sx={{
                        height: 200,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                        <BarChart3 size={48} color="#3b82f6" />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          right: 16,
                          height: 4,
                          background: 'rgba(59, 130, 246, 0.3)',
                          borderRadius: 2,
                        }}>
                          <motion.div
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                              borderRadius: 2,
                            }}
                            animate={{ width: ['0%', '70%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Floating elements */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    style={{
                      position: 'absolute',
                      top: '10%',
                      right: '5%',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                      opacity: 0.7,
                    }}
                  />

                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '10%',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #10b981, #f59e0b)',
                      opacity: 0.6,
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={32} color="rgba(59, 130, 246, 0.7)" />
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        ref={statsRef}
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 4,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, rgba(${stat.color.slice(1, 3)}, ${stat.color.slice(3, 5)}, ${stat.color.slice(5, 7)}, 0.1), rgba(${stat.color.slice(1, 3)}, ${stat.color.slice(3, 5)}, ${stat.color.slice(5, 7)}, 0.05))`,
                        border: `1px solid rgba(${stat.color.slice(1, 3)}, ${stat.color.slice(3, 5)}, ${stat.color.slice(5, 7)}, 0.2)`,
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(90deg, transparent, rgba(${stat.color.slice(1, 3)}, ${stat.color.slice(3, 5)}, ${stat.color.slice(5, 7)}, 0.1), transparent)`,
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          color: stat.color,
                          mb: 2,
                          filter: `drop-shadow(0 0 20px ${stat.color}40)`,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="h3"
                        fontWeight={900}
                        sx={{
                          color: 'white',
                          mb: 1,
                          textShadow: `0 0 20px ${stat.color}60`,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontWeight: 500,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        ref={featuresRef}
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight={900}
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Fonctionnalités Révolutionnaires
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                mb: 8,
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              Découvrez les outils qui feront de votre collecte de données une expérience futuriste
            </Typography>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${feature.color}30`,
                        borderRadius: 4,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                        },
                        '&:hover': {
                          borderColor: feature.color,
                          boxShadow: `0 20px 40px ${feature.glowColor}`,
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box
                          sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            color: feature.color,
                            filter: `drop-shadow(0 0 20px ${feature.color}40)`,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {feature.icon}
                        </Box>

                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{
                            mb: 2,
                            color: 'white',
                            fontSize: '1.25rem',
                          }}
                        >
                          {feature.title}
                        </Typography>

                        <Typography
                          variant="body1"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: 1.6,
                            fontSize: '1rem',
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        ref={testimonialsRef}
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(26, 26, 46, 0.9))',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight={900}
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Ils nous font confiance
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{
                mb: 8,
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Découvrez les témoignages de nos utilisateurs satisfaits
            </Typography>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${testimonial.color}30`,
                        borderRadius: 4,
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${testimonial.color}, ${testimonial.color}80)`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', mb: 3, gap: 0.5 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 * i, duration: 0.3 }}
                            >
                              <Star
                                size={20}
                                fill="#fbbf24"
                                color="#fbbf24"
                                style={{
                                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))',
                                }}
                              />
                            </motion.div>
                          ))}
                        </Box>

                        <Typography
                          variant="body1"
                          sx={{
                            mb: 4,
                            fontStyle: 'italic',
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1rem',
                          }}
                        >
                          "{testimonial.content}"
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                              background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}80)`,
                              fontWeight: 700,
                              fontSize: '1.2rem',
                              boxShadow: `0 0 20px ${testimonial.color}40`,
                            }}
                          >
                            {testimonial.avatar}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              fontWeight={700}
                              sx={{ color: 'white', mb: 0.5 }}
                            >
                              {testimonial.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            >
                              {testimonial.role} • {testimonial.company}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.8))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                }}
              >
                📊
              </Box>
              <Typography variant="h6" fontWeight={700}>
                CallBoxData
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              © 2024 CallBoxData. Tous droits réservés. Révolutionnez votre collecte de données.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Politique de confidentialité
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Conditions d'utilisation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Support
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;