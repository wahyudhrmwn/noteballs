import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqJBLaP26BVQY22wcTm5LI3KcnzjdkKxs",
  authDomain: "noteballs-97a48.firebaseapp.com",
  projectId: "noteballs-97a48",
  storageBucket: "noteballs-97a48.appspot.com",
  messagingSenderId: "363943595929",
  appId: "1:363943595929:web:f4a0db2cd93a4507794d08"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export {
    db,
    auth
}