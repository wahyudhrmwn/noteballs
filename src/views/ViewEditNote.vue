<template>
  <div class="edit-note">
    <AddEditNote
      :bgColor="'info'"
      :placeholder="'Edit Note!!'"
      :label="'Edit Note'"
      v-model:text="noteContent"
    >
      <template #buttons>
        <button
          class="button is-link is-light mx-2"
          @click="$router.back()"
        >
          Cancel
        </button>
        <button
          class="button is-link has-background-dark"
          :disabled="!noteContent"
          @click="saveNote()"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddEditNote from '../components/notes/AddEditNote.vue';
import { useStoreNotes } from '../stores/storeNotes.js';
import { useRoute, useRouter } from 'vue-router';

const storeNotes = useStoreNotes();
const addEditNoteRef = ref(null);
const route = useRoute();
const router = useRouter();

const noteContent = ref("");
noteContent.value = storeNotes.getNoteContent(route.params.id);

function saveNote() {
    let payload = {
        id: route.params.id,
        content: noteContent.value
    }
    
    storeNotes.editNote(payload.id, payload.content);
    noteContent.value = "";
    router.push('/');
}

</script>