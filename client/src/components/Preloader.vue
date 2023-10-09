<template>
  <div :class="props.isLoading == 'true' ? 'preloader' : 'hide'">
    <div class="spinner"></div>
    <h1 class="loading-text">Loading</h1>
    <h1 class="loading-text">{{ data.typedText }}</h1>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'

let props = defineProps({
  isLoading: String
})

const data = reactive({
  typedText: ''
})

watchEffect(() => {
  if (props.isLoading === 'true') {
    startTypewriterAnimation()
  }
})

function startTypewriterAnimation() {
  const textToType = '••••••••'
  let currentIndex = 0

  const typingInterval = setInterval(() => {
    if (currentIndex < textToType.length) {
      data.typedText += textToType[currentIndex]
      currentIndex++
    } else {
      // Clear the text and reset index when animation completes
      data.typedText = ''
      currentIndex = 0
    }
  }, 900)
}
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  transition: 2s;
  visibility: visible;
  opacity: 1;
  display: flex;
  flex-direction: column;
}
.preloader .hide {
  visibility: hidden;
  opacity: 0;
}
.preloader .spinner {
  width: 60px;
  height: 60px;
  border: 6px solid var(--foreground);
  border-top-color: var(--color-a);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.loading-text {
  margin-top: 1rem;
  font-family: var(--font-normal);
  font-weight: 600;
  font-size: 19px;
  animation: pulse 1s ease-in-out infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
