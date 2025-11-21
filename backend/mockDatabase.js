// Mock database for development when Firebase is not available
let users = [];
let surveys = [];
let responses = [];

const mockDb = {
  users,
  surveys,
  responses,

  // User operations
  createUser: (userData) => {
    const user = { id: Date.now().toString(), ...userData, createdAt: new Date() };
    users.push(user);
    return user;
  },

  findUserByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  getUserById: (id) => {
    return users.find(user => user.id === id);
  },

  // Survey operations
  createSurvey: (surveyData) => {
    const survey = { id: Date.now().toString(), ...surveyData };
    surveys.push(survey);
    return survey;
  },

  getSurveysByCompany: (companyId) => {
    return surveys.filter(survey => survey.companyId === companyId);
  },

  getSurveyById: (id) => {
    return surveys.find(survey => survey.id === id);
  },

  updateSurvey: (id, updateData) => {
    const index = surveys.findIndex(survey => survey.id === id);
    if (index !== -1) {
      surveys[index] = { ...surveys[index], ...updateData, updatedAt: new Date() };
      return surveys[index];
    }
    return null;
  },

  deleteSurvey: (id) => {
    const index = surveys.findIndex(survey => survey.id === id);
    if (index !== -1) {
      surveys.splice(index, 1);
      return true;
    }
    return false;
  },

  getActiveSurveys: () => {
    return surveys.filter(survey => survey.isActive);
  },

  // Response operations
  createResponse: (responseData) => {
    const response = { id: Date.now().toString(), ...responseData, submittedAt: new Date() };
    responses.push(response);
    return response;
  },

  getResponsesBySurvey: (surveyId) => {
    return responses.filter(response => response.surveyId === surveyId);
  },

  getResponsesByMerchant: (merchantId) => {
    return responses.filter(response => response.merchantId === merchantId);
  },

  hasMerchantResponded: (surveyId, merchantId) => {
    return responses.some(response =>
      response.surveyId === surveyId && response.merchantId === merchantId
    );
  }
};

module.exports = mockDb;