// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3x8w-r7pKWiZfVQHLSyu0zOkhR_5id44",
  authDomain: "smartlogix-f5c80.firebaseapp.com",
  projectId: "smartlogix-f5c80",
  storageBucket: "smartlogix-f5c80.firebasestorage.app",
  messagingSenderId: "693416130327",
  appId: "1:693416130327:web:ad556436d5c0731649e952",
  measurementId: "G-XH1E8WW8BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
