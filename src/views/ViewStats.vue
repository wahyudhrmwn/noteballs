<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stats</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Character (of all notes)</td>
          <td>{{ storeNotes.totalCharacterCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      class="input"
      type="text"
      placeholder="do you love noteballs??"
      v-auto-focus="vAutoFocus"
      v-model="loveNoteballs"
      maxlength="50"
    />
  </div>
</template>

<script setup>
import { useStoreNotes } from "../stores/storeNotes";
import { vAutoFocus } from "../directives/vAutoFocus.js";
import { useWatchCharacters } from "../use/useWatchCharacters.js";
import { ref } from "vue";

const storeNotes = useStoreNotes();

const loveNoteballs = ref("");

useWatchCharacters(loveNoteballs, 50);

</script>