import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDBq73db3AzYPi8SqEwho-4yeahW6o5F4",
  authDomain: "soy-academy-286104.firebaseapp.com",
  databaseURL: "https://soy-academy-286104.firebaseio.com",
  projectId: "soy-academy-286104",
  storageBucket: "soy-academy-286104.appspot.com",
  messagingSenderId: "28788601269",
  appId: "1:28788601269:web:91bdd198fc76d1f9d6a9fc",
  measurementId: "G-0L6027FBNW"
  });

const messaging = initializedFirebaseApp.messaging();
export { messaging };