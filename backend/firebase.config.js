// Firebase configuration
require('dotenv').config();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let firebaseInitialized = false;

try {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    const serviceAccount = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    firebaseInitialized = true;
    console.log('Firebase initialized successfully with environment variables');
  } else {
    console.warn('Firebase environment variables not found. Running in development mode without Firebase.');
    console.warn('To enable Firebase features, set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in .env');
  }
} catch (error) {
  console.warn('Firebase initialization failed. Running in development mode without Firebase.');
  console.warn('Error:', error.message);
}

// Mock implementations for development
const mockDb = {
  collection: () => ({
    where: () => ({
      get: async () => ({ empty: true, docs: [] }),
      orderBy: () => ({ get: async () => ({ empty: true, docs: [] }) })
    }),
    add: async (data) => ({ id: Date.now().toString(), ...data }),
    doc: () => ({
      get: async () => ({ exists: false, data: () => ({}) }),
      set: async () => {},
      update: async () => {},
      delete: async () => {}
    })
  })
};

const mockAuth = {
  createUser: async (userData) => ({ uid: Date.now().toString(), ...userData })
};

const db = firebaseInitialized ? admin.firestore() : mockDb;
const auth = firebaseInitialized ? admin.auth() : mockAuth;
const storage = firebaseInitialized ? admin.storage() : null;

module.exports = { admin, db, auth, storage, firebaseInitialized };