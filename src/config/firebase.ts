import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDmxabf7TVu4ZvgNb_QU4PcurtwlcR9nEY",
  authDomain: "ambassador-academy-website.firebaseapp.com",
  projectId: "ambassador-academy-website",
  storageBucket: "ambassador-academy-website.firebasestorage.app",
  messagingSenderId:"815610525674",
  appId: "1:815610525674:web:95bc41d0c0709fa6332493",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

export default app; 