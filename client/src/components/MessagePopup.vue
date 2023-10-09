<template>
  <div id="popup" :class="text ? '' : 'hidden'">
    <button @click="hide()"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></button>
    <div class="card">
      <div class="top">
        <h1 class="title">💙🙈</h1>
      </div>
      <div class="linear-gradient">
        <h1 class="message">{{ text }}</h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
#popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  background: var(--background);
  z-index: 4;
}
.card {
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
  height: 12rem;
  width: 80%;
  border-radius: 25px;
}
.top {
  height: 5rem;
  width: 100%;
  display: grid;
  place-items: center;
  text-align: center;
}
.linear-gradient {
  display: grid;
  place-items: center;
  text-align: center;
  min-height: 8rem;
  height: auto; /* Change fixed height to auto */
  width: 100%;
  background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
  border-radius: 0px 0px 25px 25px;
  overflow: hidden;
  padding: 1rem;
  word-wrap: break-word; /* Wrap long words */
}
.title {
  font-size: 19px;
  font-family: var(--font-primary);
}
.message {
  font-size: 24px;
  font-family: var(--font-normal);
}
button {
  position: fixed;
  top: 0;
  left: 0;
  margin: 1.4rem;
  background-color: transparent;
  border: none;
  height: 1.7rem;
  width: 1.7rem;
} 
button svg {
  transition: 0.3s;
}
button svg:hover {
  stroke: var(--color-a);
}
</style>
<script setup>
defineProps({
  text: String
})
</script>
<script>
  export default {
    methods: {
      hide() {
        this.$emit('update', {
            hide: true
        })
      }
    }
  }
</script>