<template>
    <div class="card p-4 mb-5" :class="`has-background-${ bgColor }-dark`">
      <label v-if="label" class="label has-text-white">{{ label }}</label>
        <div class="field">
        <div class="control">
          <textarea
            :value="text"
            @input="$emit('update:text', $event.target.value)"
            class="textarea"
            :placeholder="placeholder"
            v-auto-focus="vAutoFocus"
            maxlength="100"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutoFocus } from '../../directives/vAutoFocus.js';
/*
props
*/
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        default: 'success'
    },
    placeholder: {
        type: String,
        default: 'Type Something..'
    },
    label: {
        type: String
    },
})

/*
    focus text area
*/

// const textareaRef = ref(null);

// function focusTextarea() { 
//     textareaRef.value.focus();
// }

// // const focusTextarea = () => {
// //     console.log('focustextarea');
// // }


// defineExpose({
//     focusTextarea
// })



</script>