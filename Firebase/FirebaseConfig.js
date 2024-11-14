import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCWxZ7YzkiUW40MoHCk3b5kdcfhOhI1jAw",
  authDomain: "saloon-app-36f76.firebaseapp.com",
  projectId: "saloon-app-36f76",
  storageBucket: "saloon-app-36f76.appspot.com",
  messagingSenderId: "2559723464",
  appId: "1:2559723464:web:d0f8e301ef9f6e4b4462fd",
  measurementId: "G-CGXTNX4YL5"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Analytics only if supported
let analytics;
if (isSupported()) {
  analytics = getAnalytics(app);
}

export { auth, analytics };
