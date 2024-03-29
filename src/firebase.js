// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcM7e17MFGmEQc7FMDrRgbyUaIhv_6V4Q",
  authDomain: "capstone-b971d.firebaseapp.com",
  projectId: "capstone-b971d",
  storageBucket: "capstone-b971d.appspot.com",
  messagingSenderId: "551375447711",
  appId: "1:551375447711:web:46d0e3f2113a6cc57da4aa",
  measurementId: "G-98N8H6C3D8"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)