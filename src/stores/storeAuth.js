import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { useStoreNotes } from "./storeNotes";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {}
    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/');
          storeNotes.init();
        } else {
          this.user = {};
          this.router.replace('/auth');
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credentials) {
      // console.log("registerUser Action", credentials);

      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log("user register : ", user);
        })
        .catch((error) => {
          // console.log("Error message : ", error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          alert("Logout User!")
        })
        .catch((error) => {
          // console.log(error.message);
        });
    },
    async loginUser(credentials) {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Login Berhasil!")
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
