// Samler Firebase-klientens konfiguration ét sted.
// Resten af appen importerer `db` herfra og kender ikke selve configen.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Værdierne kommer fra .env. Expo indsætter kun EXPO_PUBLIC_-variabler,
// og kun når de skrives helt ud som process.env.NAVN (ingen destructuring).
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Genbrug appen, hvis den allerede findes (fx efter hot reload),
// ellers fejler initializeApp med "duplicate-app".
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Auth er udskudt. Når login kommer, bruges initializeAuth med
// getReactNativePersistence(AsyncStorage), så brugeren forbliver logget ind:
// https://expo.fyi/firebase-js-auth-setup
