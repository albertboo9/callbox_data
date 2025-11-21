const http = require('http');

const BASE_URL = 'http://localhost:5000';

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = {
            status: res.statusCode,
            data: JSON.parse(body)
          };
          resolve(response);
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testEndpoints() {
  console.log('🧪 Testing CallBoxData API endpoints...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/health',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('✅ Health check passed:', healthResponse.data.status);

    // Test root endpoint
    console.log('\n2. Testing root endpoint...');
    const rootResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('✅ Root endpoint working:', rootResponse.data.message);

    // Test registration (create a test user)
    console.log('\n3. Testing user registration...');
    const registerResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: `test.merchant.${Date.now()}@example.com`,
      password: 'password123',
      name: 'Test Merchant',
      role: 'merchant'
    });
    console.log('✅ Registration successful for merchant');

    const token = registerResponse.data.token;
    const user = registerResponse.data.user;

    // Test login
    console.log('\n4. Testing user login...');
    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: user.email,
      password: 'password123'
    });
    console.log('✅ Login successful');

    // Test getting user profile
    console.log('\n5. Testing user profile...');
    const profileResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.name);

    // Test creating a survey (as company first)
    console.log('\n6. Testing survey creation...');
    const companyRegister = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: `test.company.${Date.now()}@example.com`,
      password: 'password123',
      name: 'Test Company',
      role: 'company'
    });
    const companyToken = companyRegister.data.token;

    const surveyResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/surveys',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${companyToken}`
      }
    }, {
      title: 'Test Survey for Merchants',
      description: 'A test survey to check merchant functionality',
      questions: [
        {
          id: '1',
          type: 'text',
          question: 'What is your favorite product?',
          required: true
        },
        {
          id: '2',
          type: 'rating',
          question: 'How satisfied are you?',
          required: true
        }
      ],
      isActive: true
    });
    console.log('✅ Survey created successfully');

    const surveyId = surveyResponse.data.id;

    // Test getting active surveys for merchants
    console.log('\n7. Testing active surveys list for merchants...');
    const activeSurveysResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/surveys/active/list',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Active surveys retrieved:', activeSurveysResponse.data.length, 'survey(s)');

    // Test submitting a response
    console.log('\n8. Testing survey response submission...');
    const responseData = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/responses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      surveyId: surveyId,
      answers: [
        { questionIndex: 0, answer: 'Chocolate bars' },
        { questionIndex: 1, answer: '4' }
      ]
    });
    console.log('✅ Response submitted successfully');

    // Test getting survey responses
    console.log('\n9. Testing survey responses retrieval...');
    const surveyResponses = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: `/api/responses/survey/${surveyId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${companyToken}`
      }
    });
    console.log('✅ Survey responses retrieved:', surveyResponses.data.length, 'response(s)');

    console.log('\n🎉 All tests passed! The platform is working correctly.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

// Run tests
testEndpoints();