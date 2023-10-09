<script setup>
import MessagePopup from '../components/MessagePopup.vue'
defineProps({
  text: String,
  timestamp: Number
})
</script>
<template>
  <li @click="popup()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  </li>
  <MessagePopup :text="textHolder" @update="onUpdate($event)"/>
</template>
<style scoped>
.cards li {
  width: 30%;
  height: 6rem;
  background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
  float: left;
  position: relative;
  overflow: hidden;
  margin: 1.5%;
  border-radius: 15px;
  box-shadow:
    0px 4px 6px 0px rgba(50, 50, 93, 0.11),
    0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  display: grid;
  place-items: center;
}
li svg {
  height: 3.8rem;
  width: 3.8rem;
  stroke: var(--background);
}
</style>
<script>
export default {
  data() {
    return {
      textHolder: ''
    }
  },
  methods: {
    popup() {
      this.textHolder = this.text;
    }, 
    onUpdate(data) {
      if(data.hide) {
         this.textHolder = '';
      }
    }
  }
}
</script>
