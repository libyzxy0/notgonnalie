<script setup>
  import AccountBanner from '../components/AccountBanner.vue';
  import Inbox from '../components/Inbox.vue';
</script>
<template>
  <div id="main">
    <AccountBanner userID="libyzxy0" />
    <Inbox />
  </div>
</template>
<style scoped>
  #main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
  }
</style>
