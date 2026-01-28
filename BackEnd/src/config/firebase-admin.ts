import * as admin from 'firebase-admin';
import "dotenv/config";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountString) {
  throw new Error('Missing FIREBASE_SERVICE_ACCOUNT env var');
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountString);
} catch (err) {
  throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT JSON format');
}

if (admin.apps.length === 0) {  // avoid re-initializing in serverless env
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://your-project.firebaseio.com',  // add if using Realtime DB
    // storageBucket: 'your-project.appspot.com',           // add if using Storage
  });
}

export const db = admin.firestore();  // or auth(), storage(), etc.
export const auth = admin.auth();
// ... export what you need