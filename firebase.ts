
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCk4QXGyAdOoaQT3vw9bkWzmWsbFXy15rc",
  authDomain: "vbm-sports.firebaseapp.com",
  projectId: "vbm-sports",
  storageBucket: "vbm-sports.appspot.com",
  messagingSenderId: "67876292587",
  appId: "1:67876292587:web:5117c517214f3175cc7bae",
  measurementId: "G-PR2N0NQEDL"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db =getFirestore(app)