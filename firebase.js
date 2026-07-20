// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBZnHJQ5sR2nrME9U4_dyum80lOBSqybqY",
    authDomain: "gameresports-b36ac.firebaseapp.com",
    databaseURL: "https://gameresports-b36ac-default-rtdb.firebaseio.com",
    projectId: "gameresports-b36ac",
    storageBucket: "gameresports-b36ac.firebasestorage.app",
    messagingSenderId: "478733206685",
    appId: "1:478733206685:web:476ee4cb69f3c717154074"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

console.log("✅ Firebase Connected");
