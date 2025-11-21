const express = require('express');
const { db, firebaseInitialized } = require('../firebase.config');
const mockDb = require('../mockDatabase');
const { verifyToken, requireAdminOrCompany } = require('../middleware/auth');

const router = express.Router();

// Create survey (Company only)
router.post('/', verifyToken, requireAdminOrCompany, async (req, res) => {
  try {
    const { title, description, questions, isActive = true } = req.body;
    const companyId = req.user.uid;

    const surveyData = {
      title,
      description,
      questions, // Array of question objects
      companyId,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let result;
    if (firebaseInitialized) {
      const docRef = await db.collection('surveys').add(surveyData);
      result = { id: docRef.id, ...surveyData };
    } else {
      result = mockDb.createSurvey(surveyData);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create survey' });
  }
});

// Get all surveys for company
router.get('/', verifyToken, requireAdminOrCompany, async (req, res) => {
  try {
    const companyId = req.user.uid;
    let surveys;

    if (firebaseInitialized) {
      // Get all surveys and filter by companyId in memory to avoid composite index requirement
      const surveysSnapshot = await db.collection('surveys').get();

      surveys = [];
      surveysSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.companyId === companyId) {
          surveys.push({ id: doc.id, ...data });
        }
      });

      // Sort by createdAt in descending order
      surveys.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    } else {
      surveys = mockDb.getSurveysByCompany(companyId);
    }

    res.json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
});

// Get survey by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const surveyId = req.params.id;
    let surveyData;

    if (firebaseInitialized) {
      const surveyDoc = await db.collection('surveys').doc(surveyId).get();

      if (!surveyDoc.exists) {
        return res.status(404).json({ error: 'Survey not found' });
      }

      surveyData = { id: surveyDoc.id, ...surveyDoc.data() };
    } else {
      surveyData = mockDb.getSurveyById(surveyId);
      if (!surveyData) {
        return res.status(404).json({ error: 'Survey not found' });
      }
    }

    // Check if user has access (company owns it or admin)
    if (req.user.role !== 'admin' && surveyData.companyId !== req.user.uid) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(surveyData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch survey' });
  }
});

// Update survey
router.put('/:id', verifyToken, requireAdminOrCompany, async (req, res) => {
  try {
    const surveyId = req.params.id;
    const { title, description, questions, isActive } = req.body;

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

    const updateData = {
      title,
      description,
      questions,
      isActive,
      updatedAt: new Date()
    };

    if (firebaseInitialized) {
      await db.collection('surveys').doc(surveyId).update(updateData);
    } else {
      mockDb.updateSurvey(surveyId, updateData);
    }

    res.json({ id: surveyId, ...updateData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update survey' });
  }
});

// Delete survey
router.delete('/:id', verifyToken, requireAdminOrCompany, async (req, res) => {
  try {
    const surveyId = req.params.id;

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

    if (firebaseInitialized) {
      await db.collection('surveys').doc(surveyId).delete();
    } else {
      mockDb.deleteSurvey(surveyId);
    }

    res.json({ message: 'Survey deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete survey' });
  }
});

// Get active surveys for merchants
router.get('/active/list', verifyToken, async (req, res) => {
  try {
    let surveys;

    if (firebaseInitialized) {
      // Get all surveys and filter active ones in memory to avoid composite index requirement
      const surveysSnapshot = await db.collection('surveys').get();

      surveys = [];
      surveysSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.isActive === true) {
          surveys.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            questions: data.questions,
            companyId: data.companyId
          });
        }
      });

      // Sort by createdAt in descending order
      surveys.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    } else {
      surveys = mockDb.getActiveSurveys().map(survey => ({
        id: survey.id,
        title: survey.title,
        description: survey.description,
        questions: survey.questions,
        companyId: survey.companyId
      }));
    }

    res.json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch active surveys' });
  }
});

module.exports = router;