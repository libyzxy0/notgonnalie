<script setup>
  defineProps({
    isLoading: String
  })
</script>
<template>
  <div :class="isLoading == 'true' ? 'preloader' : 'hide'">
    <div class="spinner"></div>
    <h1>Loading...</h1>
  </div>
</template>
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
  animation: spin 0.6s ease-in-out infinite;
    }
  h1 {
    margin-top: 1rem;
    font-family: var(--font-normal);
    font-weight: 600;
    font-size: 19px;
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