import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  getFirestore,
  collection,
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_ST_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_M_ID
};

// initialize firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const otpRef = collection(db, "user-second");

const logInWithEmailAndPassword = async (secret, password) => {
  try {
    const getRef = doc(db, "user-second", secret);
    const RefSnap = await getDoc(getRef);
    const emails = RefSnap.data().email;

    await signInWithEmailAndPassword(auth, emails, password);

  } catch (err) {
    if(secret === "" || password === ""){
      alert("Please fill your Secret ID or Password first!!!");
    }else{
      alert("Please check your Secret ID or Password!!!");
    }
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  otpRef,
  logInWithEmailAndPassword,
  logout,
};