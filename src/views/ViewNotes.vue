<template>
  <div class="notes">
    <AddEditNote
      v-model:text="newNote"
      :bgColor="'primary'"
      :placeholder="'Add a new Note!'"
      :label="'Add Note'"
    >
      <template #buttons>
        <button
          class="button is-link has-background-dark"
          @click="addNote"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-medium is-success"
      max="100"
    />

    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />

      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monoscape py-6"
      >
        No notes here yet..
      </div>
    </template>
  </div>
</template>

<script setup>
/*
imports
*/
import { ref } from "vue";
import Note from "@/components/notes/Note.vue";
import { useStoreNotes } from "../stores/storeNotes.js";
import AddEditNote from "@/components/notes/AddEditNote.vue";
import { useWatchCharacters } from "../use/useWatchCharacters.js";

/*
notes
*/

const storeNotes = useStoreNotes();

const newNote = ref("");

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
};

// function deleteNote(id) {
//   // notes.value = notes.value.filter(note => {return note.id !== id})
//   storeNotes.deleteNote(id);
// }

/* watch composable */
useWatchCharacters(newNote, 100);

// /* on Mounted */
// onMounted(() => {
//   storeNotes.init();
// })
</script>
