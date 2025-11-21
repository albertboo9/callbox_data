import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SurveyBuilder from './components/SurveyBuilder';
import SurveyList from './components/SurveyList';
import SurveyTaker from './components/SurveyTaker';
import Analytics from './components/Analytics';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import { ThemeProviderWrapper } from './ThemeContext';
import { ToastContainer } from './components/ui/Toast';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 100,
    });

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/';

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {!isAuthPage && user && (
        <Navigation user={user} onLogout={handleLogout} />
      )}

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/survey-builder" element={<SurveyBuilder />} />
          <Route path="/survey-builder/:id" element={<SurveyBuilder />} />
          <Route path="/survey/:id" element={<SurveyTaker />} />
          <Route path="/analytics/:surveyId" element={<Analytics />} />
        </Routes>
      </AnimatePresence>
    </Box>
  );
}

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <Router>
        <AppContent />
        <ToastContainer />
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
