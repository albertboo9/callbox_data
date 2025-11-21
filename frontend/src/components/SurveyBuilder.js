import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const SurveyBuilder = () => {
  const [survey, setSurvey] = useState({
    title: '',
    description: '',
    questions: [],
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchSurvey(id);
    }
  }, [id]);

  const fetchSurvey = async (surveyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/surveys/${surveyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurvey(response.data);
    } catch (error) {
      setError('Failed to fetch survey');
    }
  };

  const handleSurveyChange = (field, value) => {
    setSurvey({ ...survey, [field]: value });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'text',
      question: '',
      required: false,
      options: [] // for multiple choice
    };
    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion]
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = survey.questions.filter((_, i) => i !== index);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[questionIndex].options.push('');
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const method = id ? 'put' : 'post';
      const url = id ? `http://localhost:5000/api/surveys/${id}` : 'http://localhost:5000/api/surveys';

      await axios[method](url, survey, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/surveys');
    } catch (error) {
      setError('Failed to save survey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Edit Survey' : 'Create New Survey'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Survey Title"
              value={survey.title}
              onChange={(e) => handleSurveyChange('title', e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Description"
              value={survey.description}
              onChange={(e) => handleSurveyChange('description', e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" gutterBottom>
              Questions
            </Typography>

            {survey.questions.map((question, index) => (
              <Card key={question.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Question Type</InputLabel>
                        <Select
                          value={question.type}
                          label="Question Type"
                          onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                        >
                          <MenuItem value="text">Text</MenuItem>
                          <MenuItem value="textarea">Text Area</MenuItem>
                          <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
                          <MenuItem value="checkbox">Checkbox</MenuItem>
                          <MenuItem value="rating">Rating (1-5)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Question"
                        value={question.question}
                        onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton color="error" onClick={() => deleteQuestion(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                  {(question.type === 'multiple-choice' || question.type === 'checkbox') && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Options
                      </Typography>
                      {question.options.map((option, optionIndex) => (
                        <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <TextField
                            fullWidth
                            size="small"
                            value={option}
                            onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <IconButton size="small" onClick={() => deleteOption(index, optionIndex)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                      <Button size="small" onClick={() => addOption(index)}>
                        Add Option
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addQuestion}
              sx={{ mb: 3 }}
            >
              Add Question
            </Button>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Survey'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/surveys')}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SurveyBuilder;