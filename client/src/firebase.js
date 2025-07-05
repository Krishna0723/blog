// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "ADD YOURS",
  authDomain: "ADD YOURS",
  projectId: "ADD YOURS",
  storageBucket: "ADD YOURS",
  messagingSenderId: "ADD YOURS",
  appId: "ADD YOURS",
  measurementId: "ADD YOURS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

// export const analytics = getAnalytics(app); // removed this line
