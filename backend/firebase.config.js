// Firebase configuration
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Note: You need to download the service account key from Firebase Console
// and place it as 'firebase-service-account.json' in this directory
let serviceAccount;
let firebaseInitialized = false;

try {
  serviceAccount = require('../backend/serviceAccountKey.json');
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Add your Firebase project config here
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://your-project-id.firebaseio.com',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'your-project-id.appspot.com'
    });
    firebaseInitialized = true;
    console.log('Firebase initialized successfully');
  }
} catch (error) {
  console.warn('Firebase service account key not found. Running in development mode without Firebase.');
  console.warn('To enable Firebase features, add firebase-service-account.json');
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