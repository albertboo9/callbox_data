import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const Analytics = () => {
  const [responses, setResponses] = useState([]);
  const [survey, setSurvey] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [error, setError] = useState('');
  const { surveyId } = useParams();

  useEffect(() => {
    if (surveyId) {
      fetchSurveyData(surveyId);
    }
  }, [surveyId]);

  const fetchSurveyData = async (id) => {
    try {
      const token = localStorage.getItem('token');

      // Fetch survey details
      const surveyResponse = await axios.get(`http://localhost:5000/api/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurvey(surveyResponse.data);

      // Fetch responses
      const responsesResponse = await axios.get(`http://localhost:5000/api/responses/survey/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResponses(responsesResponse.data);
    } catch (error) {
      setError('Failed to fetch analytics data');
    }
  };

  const processQuestionData = (questionIndex) => {
    if (!survey || !responses.length) return [];

    const question = survey.questions[questionIndex];
    const data = {};

    responses.forEach(response => {
      const answer = response.answers.find(a => a.questionIndex === questionIndex);
      if (answer) {
        if (question.type === 'checkbox') {
          // Handle multiple selections
          if (Array.isArray(answer.answer)) {
            answer.answer.forEach(option => {
              data[option] = (data[option] || 0) + 1;
            });
          }
        } else if (question.type === 'rating') {
          const rating = parseInt(answer.answer);
          data[rating] = (data[rating] || 0) + 1;
        } else {
          data[answer.answer] = (data[answer.answer] || 0) + 1;
        }
      }
    });

    return Object.entries(data).map(([key, value]) => ({
      name: key,
      value: value,
      percentage: ((value / responses.length) * 100).toFixed(1)
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (!survey) return <div>Loading...</div>;

  const questionData = processQuestionData(selectedQuestion);
  const currentQuestion = survey.questions[selectedQuestion];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Survey Analytics: {survey.title}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Responses</Typography>
                <Typography variant="h4">{responses.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Questions</Typography>
                <Typography variant="h4">{survey.questions.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Response Rate</Typography>
                <Typography variant="h4">100%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper sx={{ p: 3, mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Question</InputLabel>
            <Select
              value={selectedQuestion}
              label="Select Question"
              onChange={(e) => setSelectedQuestion(e.target.value)}
            >
              {survey.questions.map((question, index) => (
                <MenuItem key={index} value={index}>
                  {question.question}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            {currentQuestion.question}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Bar Chart
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={questionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Pie Chart
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={questionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {questionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Responses
          </Typography>
          {responses.map((response, index) => (
            <Box key={response.id} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Typography variant="subtitle2">
                Response #{index + 1} - {new Date(response.submittedAt.seconds * 1000).toLocaleDateString()}
              </Typography>
              {response.answers.map((answer, answerIndex) => {
                const question = survey.questions[answer.questionIndex];
                return (
                  <Typography key={answerIndex} variant="body2" sx={{ mt: 1 }}>
                    <strong>{question.question}:</strong> {
                      Array.isArray(answer.answer) ? answer.answer.join(', ') : answer.answer
                    }
                  </Typography>
                );
              })}
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default Analytics;