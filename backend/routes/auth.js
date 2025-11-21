const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth, db, firebaseInitialized } = require('../firebase.config');
const mockDb = require('../mockDatabase');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, name, phone } = req.body;

    // Validate role
    const validRoles = ['admin', 'merchant', 'company'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if user exists
    let existingUser;
    if (firebaseInitialized) {
      const userSnapshot = await db.collection('users').where('email', '==', email).get();
      existingUser = !userSnapshot.empty;
    } else {
      existingUser = mockDb.findUserByEmail(email);
    }

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let userId;
    if (firebaseInitialized) {
      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });
      userId = userRecord.uid;

      // Save user data in Firestore
      await db.collection('users').doc(userId).set({
        email,
        name,
        phone,
        role,
        password: hashedPassword,
        createdAt: new Date(),
      });
    } else {
      // Use mock database
      const user = mockDb.createUser({
        email,
        name,
        phone,
        role,
        password: hashedPassword
      });
      userId = user.id;
    }

    // Generate JWT
    const token = jwt.sign(
      { uid: userId, email, role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { uid: userId, email, name, phone, role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user from database
    let userData;
    if (firebaseInitialized) {
      const userSnapshot = await db.collection('users').where('email', '==', email).get();
      if (userSnapshot.empty) {
        return res.status(400).json({ error: 'User not found' });
      }
      const userDoc = userSnapshot.docs[0];
      userData = { id: userDoc.id, ...userDoc.data() };
    } else {
      userData = mockDb.findUserByEmail(email);
      if (!userData) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { uid: userData.id, email: userData.email, role: userData.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token, user: { uid: userData.id, email: userData.email, name: userData.name, phone: userData.phone, role: userData.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    let userData;
    if (firebaseInitialized) {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }
      userData = { uid: userDoc.id, ...userDoc.data() };
    } else {
      userData = mockDb.getUserById(req.user.uid);
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
    }

    res.json({ uid: userData.id || userData.uid, email: userData.email, name: userData.name, phone: userData.phone, role: userData.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

module.exports = router;