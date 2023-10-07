<script setup>
  const props = defineProps({
    userID: String
  })
</script>
<template>
  <header>
    <h1>@{{ userID }}</h1>
    <p>https://notgonnalie.vercel.app/{{ userID }}</p>
  </header>
</template>
<style scoped>
  header {
    position: relative;
    display: flex;
    top: 0;
    height: 12rem;
    width: 100%;
    background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  header h1 {
    font-family: var(--font-stylish);
  }
  header p {
    font-size: 18px;
    font-weight: 500;
    font-family: var(--font-primary);
    text-align: center;
  }
</style>