// src/config/firebase-admin.ts

import admin from 'firebase-admin';
import "dotenv/config"
// ── Initialization logic ──
const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountStr) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT env var');
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountStr);
} catch (err) {
  throw new Error(`Invalid Firebase service account JSON: ${err}`);
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,     // optional
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // optional
  });
}

// Export the initialized admin instance as default
export default admin;