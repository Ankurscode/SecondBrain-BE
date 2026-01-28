"use strict";
// src/config/firebase-admin.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
require("dotenv/config");
// ── Initialization logic ──
const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountStr) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT env var');
}
let serviceAccount;
try {
    serviceAccount = JSON.parse(serviceAccountStr);
}
catch (err) {
    throw new Error(`Invalid Firebase service account JSON: ${err}`);
}
if (firebase_admin_1.default.apps.length === 0) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
        // databaseURL: process.env.FIREBASE_DATABASE_URL,     // optional
        // storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // optional
    });
}
// Export the initialized admin instance as default
exports.default = firebase_admin_1.default;
