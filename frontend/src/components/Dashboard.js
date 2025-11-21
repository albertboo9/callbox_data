import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Eye,
  Settings,
  Target,
  Award,
  Zap,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';
import Button from './ui/Button';
import { showToast } from './ui/Toast';
import { CardSkeleton, LoadingSpinner } from './ui/Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Redirect merchants directly to surveys page
      if (user.role === 'merchant') {
        navigate('/surveys');
        return;
      }
    }
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async (showRefreshToast = false) => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        navigate('/login');
        return;
      }

      setUser(JSON.parse(userData));

      // Load surveys for companies/admins
      if (JSON.parse(userData).role !== 'merchant') {
        const surveysResponse = await axios.get('http://localhost:5000/api/surveys', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSurveys(surveysResponse.data);
      }

      // Mock stats - in real app, this would come from an API
      setStats({
        totalSurveys: 12,
        activeSurveys: 8,
        totalResponses: 245,
        completionRate: 78,
        recentActivity: [
          { type: 'survey_created', message: 'Nouveau sondage créé', time: '2h' },
          { type: 'response_received', message: 'Réponse reçue', time: '4h' },
          { type: 'survey_completed', message: 'Sondage terminé', time: '1j' },
        ]
      });

      if (showRefreshToast) {
        showToast.success('Données actualisées avec succès');
      }
    } catch (error) {
      showToast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    showToast.success('Déconnexion réussie');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} md={6} lg={4} key={i}>
                <CardSkeleton />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  if (!user) return <LoadingSpinner />;

  // Chart data
  const chartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Réponses',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.light,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Réponses par mois',
      },
    },
  };

  const doughnutData = {
    labels: ['Terminé', 'En cours', 'Non commencé'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.grey[400],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Container maxWidth="xl" ref={ref}>
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={800}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Bonjour, {user.name} ! 👋
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Bienvenue sur votre tableau de bord CallBoxData
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{
                  animation: refreshing ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <RefreshCw size={20} />
              </IconButton>

              <Chip
                label={user.role === 'admin' ? 'Administrateur' :
                       user.role === 'company' ? 'Entreprise' : 'Marchand'}
                color={user.role === 'admin' ? 'error' :
                       user.role === 'company' ? 'primary' : 'secondary'}
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats && [
              {
                title: 'Total Sondages',
                value: stats.totalSurveys,
                icon: <FileText size={24} />,
                color: theme.palette.primary.main,
                change: '+12%',
                changeType: 'positive'
              },
              {
                title: 'Sondages Actifs',
                value: stats.activeSurveys,
                icon: <Activity size={24} />,
                color: theme.palette.success.main,
                change: '+8%',
                changeType: 'positive'
              },
              {
                title: 'Total Réponses',
                value: stats.totalResponses,
                icon: <Users size={24} />,
                color: theme.palette.secondary.main,
                change: '+23%',
                changeType: 'positive'
              },
              {
                title: 'Taux Completion',
                value: `${stats.completionRate}%`,
                icon: <Target size={24} />,
                color: theme.palette.info.main,
                change: '+5%',
                changeType: 'positive'
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 100,
                        height: 100,
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        borderRadius: '50%',
                        transform: 'translate(30px, -30px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}10)`,
                            color: stat.color,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: stat.changeType === 'positive' ? 'success.main' : 'error.main',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <TrendingUp size={14} />
                          {stat.change}
                        </Typography>
                      </Box>

                      <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                        {stat.value}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Charts Section */}
          {(user.role === 'company' || user.role === 'admin') && (
            <>
              <Grid item xs={12} lg={8}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6" fontWeight={600}>
                          Évolution des réponses
                        </Typography>
                        <Chip
                          label="Ce mois"
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ height: 300 }}>
                        <Bar data={chartData} options={chartOptions} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={12} lg={4}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                        Répartition des statuts
                      </Typography>
                      <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                        <Doughnut data={doughnutData} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </>
          )}

          {/* Recent Surveys */}
          {(user.role === 'company' || user.role === 'admin') && (
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6" fontWeight={600}>
                        Sondages récents
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => navigate('/surveys')}
                        icon={<Eye size={16} />}
                      >
                        Voir tout
                      </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {surveys.slice(0, 3).map((survey, index) => (
                        <Box
                          key={survey.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: 'background.alt',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                              transform: 'translateX(4px)',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: survey.isActive ? 'success.main' : 'grey.400',
                              }}
                            >
                              <FileText size={16} />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {survey.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {survey.questions?.length || 0} questions
                              </Typography>
                            </Box>
                          </Box>

                          <Chip
                            label={survey.isActive ? 'Actif' : 'Inactif'}
                            size="small"
                            color={survey.isActive ? 'success' : 'default'}
                            variant="outlined"
                          />
                        </Box>
                      ))}

                      {surveys.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                          <FileText size={48} color={theme.palette.text.disabled} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Aucun sondage créé
                          </Typography>
                          <Button
                            variant="gradient"
                            size="small"
                            onClick={() => navigate('/survey-builder')}
                            sx={{ mt: 2 }}
                          >
                            Créer le premier
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          )}

          {/* Recent Activity */}
          <Grid item xs={12} lg={user.role === 'merchant' ? 12 : 6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                    Activité récente
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {stats?.recentActivity?.map((activity, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: 'background.alt',
                        }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor:
                              activity.type === 'survey_created' ? 'success.main' :
                              activity.type === 'response_received' ? 'primary.main' :
                              'warning.main',
                            color: 'white',
                          }}
                        >
                          {activity.type === 'survey_created' && <Plus size={16} />}
                          {activity.type === 'response_received' && <CheckCircle size={16} />}
                          {activity.type === 'survey_completed' && <Award size={16} />}
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {activity.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Box sx={{ mt: 4, p: 3, borderRadius: 3, backgroundColor: 'background.alt' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              Actions rapides
            </Typography>

            <Grid container spacing={2}>
              {(user.role === 'company' || user.role === 'admin') && (
                <>
                  <Grid item xs={6} sm={3}>
                    <Button
                      variant="gradient"
                      size="large"
                      onClick={() => navigate('/survey-builder')}
                      icon={<Plus size={20} />}
                      fullWidth
                    >
                      Nouveau Sondage
                    </Button>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/surveys')}
                      icon={<Eye size={20} />}
                      fullWidth
                    >
                      Voir Sondages
                    </Button>
                  </Grid>
                </>
              )}

              {user.role === 'merchant' && (
                <Grid item xs={6} sm={3}>
                  <Button
                    variant="gradient"
                    size="large"
                    onClick={() => navigate('/surveys')}
                    icon={<FileText size={20} />}
                    fullWidth
                  >
                    Sondages Disponibles
                  </Button>
                </Grid>
              )}

              <Grid item xs={6} sm={3}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLogout}
                  icon={<Settings size={20} />}
                  fullWidth
                >
                  Déconnexion
                </Button>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Dashboard;