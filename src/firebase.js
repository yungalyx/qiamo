// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq3LvlbLbpD1KZoayPx9lDdCUGn0VZx2Q",
  authDomain: "qiamo-84c7f.firebaseapp.com",
  databaseURL: "https://qiamo-84c7f-default-rtdb.firebaseio.com",
  projectId: "qiamo-84c7f",
  storageBucket: "qiamo-84c7f.appspot.com",
  messagingSenderId: "631260992454",
  appId: "1:631260992454:web:eafa5666f4e85e5bcc58c7",
  measurementId: "G-R51DM2XNH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const dbRef = ref(getDatabase());
get(dbRef, `projects/`).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});