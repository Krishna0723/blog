// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9fEmMs-npQFUoBqLavhIRNXhCxMp1ieM",
  authDomain: "blog-2704a.firebaseapp.com",
  projectId: "blog-2704a",
  storageBucket: "blog-2704a.firebasestorage.app",
  messagingSenderId: "247020370481",
  appId: "1:247020370481:web:2ece714a96108a645df310",
  measurementId: "G-HE1S3DLLHL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
