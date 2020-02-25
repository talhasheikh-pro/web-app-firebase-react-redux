import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

// Firebase config elements
const FIREBASE_PROJECT_ID = 'parkingapp-359f8';
const FIREBASE_APP_ID = '1:138301946785:web:d4872bdc41007e7d3ba9e0';
const FIREBASE_API_KEY = 'AIzaSyBBOmmpHX8UQcYSD9Cb7ka1-viuTfEYIDg';
const FIREBASE_SENDER_ID = '138301946785';
const FIREBASE_MEASUREMENT_ID = 'G-Z0MQ7D7WD6';

// Firebase base config
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: `${FIREBASE_PROJECT_ID}`,
    storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: FIREBASE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const firebaseFunctions = firebase.functions();
export default firebase;
