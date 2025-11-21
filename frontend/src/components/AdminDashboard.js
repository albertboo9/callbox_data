import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import AnimatedCard from './AnimatedCard';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState('');
  const [createUserDialog, setCreateUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'merchant'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Pour un vrai backoffice, il faudrait des endpoints admin spécifiques
      // Ici on utilise les endpoints existants pour la démonstration
      const [usersRes, surveysRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/surveys', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      // Simulation de données admin (dans un vrai système, ces données viendraient d'endpoints dédiés)
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'merchant', phone: '+1234567890', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'company', phone: '+1234567891', status: 'active' },
        { id: 3, name: usersRes.data.name, email: usersRes.data.email, role: usersRes.data.role, phone: usersRes.data.phone, status: 'active' }
      ]);

      setSurveys(surveysRes.data);
      setStats({
        totalUsers: 3,
        totalSurveys: surveysRes.data.length,
        totalResponses: 0,
        activeSurveys: surveysRes.data.filter(s => s.isActive).length
      });

    } catch (error) {
      setError('Erreur lors du chargement des données admin');
      console.error(error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/register', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCreateUserDialog(false);
      setNewUser({ email: '', password: '', name: '', phone: '', role: 'merchant' });
      fetchAdminData(); // Refresh data
    } catch (error) {
      setError('Erreur lors de la création de l\'utilisateur');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      // Dans un vrai système, il faudrait un endpoint admin pour supprimer les utilisateurs
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError('Erreur lors de la suppression de l\'utilisateur');
    }
  };

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
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
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
            mb: 4,
          }}
        >
          CallBoxData - Backoffice Administrateur
        </Typography>

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

        {/* Statistics Cards */}
        <Grid
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          container
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Grid item xs={12} md={3}>
            <AnimatedCard>
              <Typography variant="h6" color="primary">Utilisateurs Totaux</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {stats.totalUsers}
              </Typography>
            </AnimatedCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <AnimatedCard>
              <Typography variant="h6" color="secondary">Sondages Totaux</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {stats.totalSurveys}
              </Typography>
            </AnimatedCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <AnimatedCard>
              <Typography variant="h6" color="success.main">Sondages Actifs</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                {stats.activeSurveys}
              </Typography>
            </AnimatedCard>
          </Grid>

          <Grid item xs={12} md={3}>
            <AnimatedCard>
              <Typography variant="h6" color="warning.main">Réponses Totales</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {stats.totalResponses}
              </Typography>
            </AnimatedCard>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="primary"
            onClick={() => setCreateUserDialog(true)}
          >
            Créer un Utilisateur
          </Button>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outlined"
            onClick={() => navigate('/survey-builder')}
          >
            Créer un Sondage
          </Button>
        </Box>

        {/* Users Management */}
        <AnimatedCard sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Gestion des Utilisateurs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Rôle</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={
                          user.role === 'admin' ? 'error' :
                          user.role === 'company' ? 'primary' : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AnimatedCard>

        {/* Surveys Overview */}
        <AnimatedCard>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Aperçu des Sondages
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titre</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Questions</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell>{survey.title}</TableCell>
                    <TableCell>{survey.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={survey.isActive ? 'Actif' : 'Inactif'}
                        color={survey.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{survey.questions?.length || 0}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => navigate(`/analytics/${survey.id}`)}
                      >
                        Analyses
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AnimatedCard>

        {/* Create User Dialog */}
        <Dialog open={createUserDialog} onClose={() => setCreateUserDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Créer un Nouvel Utilisateur</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nom complet"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Téléphone"
              fullWidth
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Mot de passe"
              type="password"
              fullWidth
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Rôle</InputLabel>
              <Select
                value={newUser.role}
                label="Rôle"
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="merchant">Marchand</MenuItem>
                <MenuItem value="company">Entreprise</MenuItem>
                <MenuItem value="admin">Administrateur</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateUserDialog(false)}>Annuler</Button>
            <Button onClick={handleCreateUser} variant="contained">Créer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminDashboard;