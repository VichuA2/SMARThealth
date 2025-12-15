// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgh7VbXdgKg54sq9Zfrtglsnr9ydnTDzQ",
    authDomain: "smarthealthmonitor-c3e56.firebaseapp.com",
    projectId: "smarthealthmonitor-c3e56",
    storageBucket: "smarthealthmonitor-c3e56.firebasestorage.app",
    messagingSenderId: "852764484544",
    appId: "1:852764484544:web:aae5bfb96cace1eac31e25",
    measurementId: "G-H34KK669YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
