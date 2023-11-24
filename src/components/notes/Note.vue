<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link
        href="#"
        class="card-footer-item"
        :to="`/editNote/${note.id}`"
        >Edit
      </router-link>
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    ></ModalDeleteNote>
  </div>
</template>

<script setup>
/*
imports
*/
import { computed, reactive } from "vue";
import { useDateFormat } from '@vueuse/core';
import ModalDeleteNote from "../../components/notes/ModalDeleteNote.vue";
import { useStoreNotes } from "../../stores/storeNotes";

/*
store pinia
*/
const storeNotes = useStoreNotes();

/*Date Formatted */
const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  let FormattedDate = useDateFormat(date, 'YYYY-MM-DD @ HH:mm:ss A (dddd)')
  return FormattedDate
})


/*
props
*/
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// /*
//     emits
// */

/* modal */

const modals = reactive({
  deleteNote: false,
});

// const emit = defineEmits(['deleteClicked'])

/*
characterLength
*/
const characterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});

// /*
// Delete clicked
// */

// function handleDeleteClicked() {
//     emit('deleteClicked', props.note.id);
// }

// function handleEditClicked() {
//     console.log('handleEditClicked');
// }
</script>