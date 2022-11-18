// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA81JooqyUVW26txzK_YCyWBe1q4dd3SsM",
  authDomain: "bookexchange-d2fd4.firebaseapp.com",
  projectId: "bookexchange-d2fd4",
  storageBucket: "bookexchange-d2fd4.appspot.com",
  messagingSenderId: "678813527676",
  appId: "1:678813527676:web:7f345d6287f22bcc21e3f9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);

export { firebase };
export { auth };