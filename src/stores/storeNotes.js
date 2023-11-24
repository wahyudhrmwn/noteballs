// stores/counter.js
import { defineStore } from 'pinia';
import { 
  collection, onSnapshot, 
  doc, setDoc, deleteDoc, updateDoc, addDoc,
  query, orderBy, limit 
} from "firebase/firestore";
import { db } from '../js/firebase.js';
import { useStoreAuth } from './storeAuth.js';

let notesCollectionRef
let notesQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes: [
            // {
            //     id: 'id1',
            //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sed nulla corrupti illum provident in obcaecati. Maiores numquam exercitationem, aperiam perferendis, culpa sequi impedit, voluptas dicta eum odit optio cupiditate!',
            //   },
            //   {
            //     id: 'id2',
            //     content: 'This is shorter note, woo!!'
            //   },
            //   {
            //     id: 'id3',
            //     content: 'DATA WITH STORE!!'
            //   }
        ],
        notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()
  
      // initialize our database refs
      // notesCollectionRef = collection(db, "users",'m1mKUpZYW1fO1A6GRm3uXGUvJoe2', "notes");
      notesCollectionRef = collection(db, "users",storeAuth.user.id, "notes");
      notesQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false;

      getNotesSnapshot = onSnapshot(notesQuery, (querySnapshot) => {
        let notes = [];
  
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
  
          notes.push(note)
        });

        this.notes = notes;
        this.notesLoaded = true;
        
      }, error => {
        console.log("Error Message : ", error.message)
      })


      // const querySnapshot = await getDocs(collection(db, "notes"));
      // querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());

      // let note = {
      //   id: doc.id,
      //   content: doc.data().content
      // }

      // this.notes.push(note)

    },
    clearNotes() {
      this.notes = [];
      if(getNotesSnapshot) getNotesSnapshot() // unsubcribe from any active listener
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime();
      let date = currentDate.toString();
      
      // await setDoc(doc(notesCollectionRef, id), {
      //   content: newNoteContent,
      //   id
      // });

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      });

      // let note = {
      //   id,
      //   content: newNoteContent
      // }

      // this.notes.unshift(note);

      // Add a new document in collection "notes"

    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
      
      // console.log('id delete : ', id );
      // this.notes = this.notes.filter(note => note.id !== id)

    },
    async editNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
      
      // console.log('id edit : ', id );
      // console.log('content edit : ', content );
      // let index = this.notes.findIndex(note => note.id === id)
      // this.notes[index].content = content;

      // Set the "capital" field of the city 'DC'

    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => { return note.id === id })[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharacterCount: (state) => {
      let count = 0;

      state.notes.forEach(note => {
        count += note.content.length;
      })

      return count
    }
  }
})