<template>
  <div id="popup" :class="text ? '' : 'hidden'">
    <button @click="hide()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <button class="img" @click="captureScreenshot()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    </button>
    <div class="card" ref="element">
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
  background-color: var(--foreground);
  z-index: 4;
}
.card {
  background-color: var(--foreground);
  height: 18rem;
  width: 85%;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.top {
  height: 5rem;
  width: 95%;
  display: grid;
  place-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
  margin-top: 1.5rem;
  border-radius: 25px 25px 0px 0px;
  background-color: var(--background);
}
.linear-gradient {
  display: grid;
  place-items: center;
  text-align: center;
  min-height: 8rem;
  height: auto; /* Change fixed height to auto */
  width: 95%;
  background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
  border-radius: 0px 0px 25px 25px;
  overflow: hidden;
  padding: 1rem;
  word-wrap: break-word;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
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
.img {
  margin-left: 3.7rem;
}
</style>
<script setup>
defineProps({
  text: String
})
</script>
<script>
import html2canvas from 'html2canvas'
export default {
  methods: {
    hide() {
      this.$emit('update', {
        hide: true
      })
    },
    captureScreenshot() {
  const screenshotTarget = this.$refs.element;
  html2canvas(screenshotTarget).then((canvas) => {
    const base64image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = base64image;
    a.download = 'ngl.png';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
  }
}
</script>
