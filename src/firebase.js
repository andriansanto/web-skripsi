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
    apiKey: "AIzaSyCC8R2gju17eYDpkYsqs91zu3WtLX7KfL8",
    authDomain: "skripsi-01-97646.firebaseapp.com",
    databaseURL: "https://skripsi-01-97646-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "skripsi-01-97646",
    storageBucket: "skripsi-01-97646.appspot.com",
    messagingSenderId: "150037912656",
    appId: "1:150037912656:web:f3b6277c5193cf7b6ec555",
    measurementId: "G-YYWMGCHZHY"
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
    console.error(err);
    alert(err.message);
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