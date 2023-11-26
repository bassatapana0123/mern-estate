// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIERBASE_API_KEY,
  authDomain: "mern-estate-288a2.firebaseapp.com",
  projectId: "mern-estate-288a2",
  storageBucket: "mern-estate-288a2.appspot.com",
  messagingSenderId: "507144026742",
  appId: "1:507144026742:web:d1b1c4eb295e045f72fd57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);