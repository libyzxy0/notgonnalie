<script setup>
  import AccountBanner from '../components/AccountBanner.vue';
  import Inbox from '../components/Inbox.vue';
  import Login from '../pages/Login.vue';
</script>
<template>
  <Login @update="onUpdate($event)" />
  <div id="main" :class="isLoggedIn ? '' : 'hidden'">
    <AccountBanner :userID="isLoggedIn" />
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
<script>
  export default {
    data() {
      return {
        isLoggedIn: false
      }
    },
    methods: {
      onUpdate(data) {
         this.isLoggedIn = data;
      }
    }
  }
</script>