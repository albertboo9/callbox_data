import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Rating,
  Alert,
  LinearProgress,
  Snackbar
} from '@mui/material';
import axios from 'axios';

const SurveyTaker = () => {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurvey();

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingResponses();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [id]);

  const fetchSurvey = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurvey(response.data);

      // Initialize answers
      const initialAnswers = {};
      response.data.questions.forEach((question, index) => {
        if (question.type === 'checkbox') {
          initialAnswers[index] = [];
        } else {
          initialAnswers[index] = '';
        }
      });
      setAnswers(initialAnswers);
    } catch (error) {
      setError('Failed to fetch survey');
    }
  };

  const syncPendingResponses = async () => {
    const pendingResponses = JSON.parse(localStorage.getItem('pendingResponses') || '[]');
    if (pendingResponses.length === 0) return;

    const token = localStorage.getItem('token');
    for (const response of pendingResponses) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/responses`, response, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Failed to sync response:', error);
      }
    }

    localStorage.removeItem('pendingResponses');
    setSnackbar({ open: true, message: 'Pending responses synced successfully!' });
  };

  const handleAnswerChange = (questionIndex, value, isCheckbox = false) => {
    setAnswers(prev => {
      if (isCheckbox) {
        const currentAnswers = prev[questionIndex] || [];
        if (currentAnswers.includes(value)) {
          return {
            ...prev,
            [questionIndex]: currentAnswers.filter(v => v !== value)
          };
        } else {
          return {
            ...prev,
            [questionIndex]: [...currentAnswers, value]
          };
        }
      }
      return {
        ...prev,
        [questionIndex]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedAnswers = Object.keys(answers).map(index => ({
      questionIndex: parseInt(index),
      answer: answers[index]
    }));

    const responseData = {
      surveyId: id,
      answers: formattedAnswers
    };

    if (!isOnline) {
      // Save locally when offline
      const pendingResponses = JSON.parse(localStorage.getItem('pendingResponses') || '[]');
      pendingResponses.push(responseData);
      localStorage.setItem('pendingResponses', JSON.stringify(pendingResponses));

      setSubmitted(true);
      setSnackbar({ open: true, message: 'Response saved locally. Will sync when online.' });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/responses`, responseData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmitted(true);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit survey');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label="Your answer"
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            label="Your answer"
            multiline
            rows={4}
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required={question.required}
          />
        );

      case 'multiple-choice':
        return (
          <RadioGroup
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          >
            {question.options.map((option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <Box>
            {question.options.map((option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                control={
                  <Checkbox
                    checked={(answers[index] || []).includes(option)}
                    onChange={() => handleAnswerChange(index, option, true)}
                  />
                }
                label={option}
              />
            ))}
          </Box>
        );

      case 'rating':
        return (
          <Box>
            <Typography component="legend">Rate from 1 to 5</Typography>
            <Rating
              value={parseInt(answers[index]) || 0}
              onChange={(e, value) => handleAnswerChange(index, value.toString())}
              max={5}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  if (!survey) return <LinearProgress />;

  if (submitted) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" color="success.main" gutterBottom>
            Thank you!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Your survey response has been submitted successfully.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/surveys')}>
            Back to Surveys
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {survey.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {survey.description}
          </Typography>

          {!isOnline && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              You are currently offline. Responses will be saved locally and synced when connection is restored.
            </Alert>
          )}

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            {survey.questions.map((question, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  {index + 1}. {question.question}
                  {question.required && <span style={{ color: 'red' }}> *</span>}
                </Typography>
                {renderQuestion(question, index)}
              </Box>
            ))}

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                size="large"
              >
                {loading ? 'Submitting...' : 'Submit Survey'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/surveys')}
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default SurveyTaker;