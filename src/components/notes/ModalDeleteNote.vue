<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Notes</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure to want Delete this Notes?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button class="button is-danger" @click="storeNotes.deleteNote(noteId)">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, onUnmounted, ref } from "vue";
import { useStoreNotes } from "../../stores/storeNotes";

/* Props */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  noteId: {
    type: String,
    required: true,
  },
});

/* Emits */
const emit = defineEmits(["update:modelValue"]);

/*Store */
const storeNotes = useStoreNotes();

/* Close Modal */
const closeModal = () => {
  emit("update:modelValue", false);
};

/*onclick outside*/
const modalCardRef = ref(null);

onClickOutside(modalCardRef, closeModal);

/* Keyboard controls */
const handleKeyboard = (e) => {
  if (e.key === "Escape") closeModal();
};

onMounted(() => {
  console.log("OnMounted");
  document.addEventListener("keyup", handleKeyboard);
});

onUnmounted(() => {
  console.log("OnUnmounted");
  document.removeEventListener("keyup", handleKeyboard);
});
</script>

<style lang="scss">
</style>