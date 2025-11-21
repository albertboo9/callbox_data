const express = require('express');
const { db, firebaseInitialized } = require('../firebase.config');
const mockDb = require('../mockDatabase');
const { verifyToken, requireMerchantOrAdmin } = require('../middleware/auth');

const router = express.Router();

// Submit survey response (Merchant only)
router.post('/', verifyToken, requireMerchantOrAdmin, async (req, res) => {
  try {
    const { surveyId, answers } = req.body;
    const merchantId = req.user.uid;

    // Verify survey exists and is active
    let surveyData;
    if (firebaseInitialized) {
      const surveyDoc = await db.collection('surveys').doc(surveyId).get();
      if (!surveyDoc.exists) {
        return res.status(404).json({ error: 'Survey not found' });
      }
      surveyData = surveyDoc.data();
    } else {
      surveyData = mockDb.getSurveyById(surveyId);
      if (!surveyData) {
        return res.status(404).json({ error: 'Survey not found' });
      }
    }

    if (!surveyData.isActive) {
      return res.status(400).json({ error: 'Survey is not active' });
    }

    // Check if merchant already responded
    let hasResponded;
    if (firebaseInitialized) {
      const existingResponse = await db.collection('responses')
        .where('surveyId', '==', surveyId)
        .where('merchantId', '==', merchantId)
        .get();
      hasResponded = !existingResponse.empty;
    } else {
      hasResponded = mockDb.hasMerchantResponded(surveyId, merchantId);
    }

    if (hasResponded) {
      return res.status(400).json({ error: 'You have already responded to this survey' });
    }

    const responseData = {
      surveyId,
      merchantId,
      answers, // Array of answer objects
      submittedAt: new Date()
    };

    let result;
    if (firebaseInitialized) {
      const docRef = await db.collection('responses').add(responseData);
      result = { id: docRef.id, ...responseData };
    } else {
      result = mockDb.createResponse(responseData);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit response' });
  }
});

// Get responses for a survey (Company/Admin only)
router.get('/survey/:surveyId', verifyToken, async (req, res) => {
  try {
    const surveyId = req.params.surveyId;

    // Check if user has access to this survey
    let surveyData;
    if (firebaseInitialized) {
      const surveyDoc = await db.collection('surveys').doc(surveyId).get();
      if (!surveyDoc.exists) {
        return res.status(404).json({ error: 'Survey not found' });
      }
      surveyData = surveyDoc.data();
    } else {
      surveyData = mockDb.getSurveyById(surveyId);
      if (!surveyData) {
        return res.status(404).json({ error: 'Survey not found' });
      }
    }

    if (req.user.role !== 'admin' && surveyData.companyId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    let responses;
    if (firebaseInitialized) {
      const responsesSnapshot = await db.collection('responses')
        .where('surveyId', '==', surveyId)
        .orderBy('submittedAt', 'desc')
        .get();

      responses = [];
      responsesSnapshot.forEach(doc => {
        responses.push({ id: doc.id, ...doc.data() });
      });
    } else {
      responses = mockDb.getResponsesBySurvey(surveyId);
    }

    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

// Get merchant's responses
router.get('/my-responses', verifyToken, requireMerchantOrAdmin, async (req, res) => {
  try {
    const merchantId = req.user.uid;

    let responses;
    if (firebaseInitialized) {
      const responsesSnapshot = await db.collection('responses')
        .where('merchantId', '==', merchantId)
        .orderBy('submittedAt', 'desc')
        .get();

      responses = [];
      responsesSnapshot.forEach(doc => {
        responses.push({ id: doc.id, ...doc.data() });
      });
    } else {
      responses = mockDb.getResponsesByMerchant(merchantId) || [];
    }

    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
});

module.exports = router;