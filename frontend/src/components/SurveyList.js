import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Alert,
  Fab,
} from '@mui/material';
import { Add, Assessment, PlayArrow } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import AnimatedCard from './AnimatedCard';
import AnimatedLoader from './AnimatedLoader';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchSurveys(parsedUser);
  }, [navigate]);

  const fetchSurveys = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = userData?.role === 'merchant' ? '/active/list' : '/';
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/surveys${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurveys(response.data);
    } catch (error) {
      setError('Échec du chargement des sondages');
      console.error(error);
    }
  };

  const handleDelete = async (surveyId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce sondage ?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/surveys/${surveyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurveys(surveys.filter(survey => survey.id !== surveyId));
    } catch (error) {
      setError('Échec de la suppression du sondage');
    }
  };

  if (!user) return <AnimatedLoader />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, position: 'relative' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {user.role === 'merchant' ? 'Sondages Disponibles' : 'Mes Sondages'}
          </Typography>
        </Box>

        {(user.role === 'company' || user.role === 'admin') && (
          <Fab
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
            onClick={() => navigate('/survey-builder')}
          >
            <Add />
          </Fab>
        )}

        {error && (
          <Alert
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}

        <Grid
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          container
          spacing={3}
        >
          {surveys.map((survey, index) => (
            <Grid item xs={12} md={6} lg={4} key={survey.id}>
              <AnimatedCard delay={index}>
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                  {survey.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  {survey.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Chip
                    label={survey.isActive ? 'Actif' : 'Inactif'}
                    color={survey.isActive ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                  />
                  {survey.questions && (
                    <Typography variant="caption" color="text.secondary">
                      {survey.questions.length} question{survey.questions.length > 1 ? 's' : ''}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {user.role === 'merchant' ? (
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate(`/survey/${survey.id}`)}
                      fullWidth
                    >
                      Répondre
                    </Button>
                  ) : (
                    <>
                      <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/survey-builder/${survey.id}`)}
                      >
                        Modifier
                      </Button>
                      <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        size="small"
                        variant="outlined"
                        startIcon={<Assessment />}
                        onClick={() => navigate(`/analytics/${survey.id}`)}
                      >
                        Analyses
                      </Button>
                      <Button
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        size="small"
                        color="error"
                        onClick={() => handleDelete(survey.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  )}
                </Box>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>

        {surveys.length === 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            sx={{
              textAlign: 'center',
              mt: 8,
              py: 6,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {user.role === 'merchant'
                ? 'Aucun sondage disponible pour le moment.'
                : 'Vous n\'avez pas encore créé de sondage.'}
            </Typography>
            {(user.role === 'company' || user.role === 'admin') && (
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => navigate('/survey-builder')}
                sx={{ mt: 2 }}
              >
                Créer votre premier sondage
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SurveyList;