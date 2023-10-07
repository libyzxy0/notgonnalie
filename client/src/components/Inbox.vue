<script setup>
  import Box from '../components/Box.vue';
</script>
<template>
  <div id="inbox">
    <h1>Inbox - {{ messages.length }}</h1>
    <ul class="cards">
      <Box v-for="(message, index) in messages"
      :key="index" :text="message.message" :timestamp="message.timestamp" />
    </ul>
  </div>
</template>
<style scoped>
  #inbox {
    font-family: var(--font-normal);
    margin: 1rem;
  }
  .cards {
    margin-top: 1rem;
    padding: 0;
    width: 100%;
    max-width: 1000px;
    list-style-type: none;
  }
</style>
<script>
import { state, fetchMessages } from '../services/messagingService';

export default {
  data() {
    return {
      messages: []
    }
  }, 
  async created() {
    try {
      await fetchMessages(this.$cookie.getCookie('token'));
      this.messages = state.messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },
  watch: {
    'state.messages': function(newMessages) {
      this.messages = newMessages;
    }
  }
}
</script>

