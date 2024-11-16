import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCWxZ7YzkiUW40MoHCk3b5kdcfhOhI1jAw",
  authDomain: "saloon-app-36f76.firebaseapp.com",
  projectId: "saloon-app-36f76",
  storageBucket: "saloon-app-36f76.appspot.com",
  messagingSenderId: "2559723464",
  appId: "1:2559723464:web:d0f8e301ef9f6e4b4462fd",
  measurementId: "G-CGXTNX4YL5",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Analytics (only if supported)
let analytics = null;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch((error) => {
    console.error("Error checking analytics support:", error);
  });

const db = getFirestore(app);
export { db };

export { app, auth, analytics };
