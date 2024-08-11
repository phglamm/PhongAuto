// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9218_qejWql1OJuvhUyKhc6ORgg25yF0",
  authDomain: "phongautomotive-5405b.firebaseapp.com",
  projectId: "phongautomotive-5405b",
  storageBucket: "phongautomotive-5405b.appspot.com",
  messagingSenderId: "937561121768",
  appId: "1:937561121768:web:3a66f8bc01855c5a9f3a5d",
  measurementId: "G-WGNHXNX3Q2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const storage = getStorage();
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();
