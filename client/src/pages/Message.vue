<template>
  <Preloader :isLoading="isLoading" />
  <div id="main">
    <div class="card">
      <div class="header">
        <img src='https://http.cat/404' :alt="'Photo of ' + target">
        <h1>{{'@' + target }}</h1>
      </div>
        <textarea :placeholder="'Send anonymous message to ' + target +'...'" v-model="message"></textarea>
    </div>
    <button class="btn" @click="send()">{{ btn }}</button>
  </div>
</template>
<style scoped>
  #main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
  }
  .card {
    width: 90%;
    border-radius: 20px;
  }
  .header {
    height: 6rem;
    width: 100%;
    background-color: var(--foreground);
    border-radius: 20px 20px 0px 0px;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 1rem;
  }
  textarea {
    border: none;
    height: 10rem;
    width: 100%;
    padding: 1rem;
    font-size: 26px;
    border-radius: 0px 0px 20px 20px;
    background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
    font-family: var(--font-primary);
    font-weight: 600;
    color: var(--text-color-a);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  } 
  textarea::placeholder {
    color: grey;
  }
  textarea:focus {
    border: none;
    outline: none;
  }
  textarea::-webkit-resizer {
    display: none;
  }
  img {
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 50%;
  }
  .header h1 {
    font-size: 22px;
    font-family: var(--font-stylish);
    margin: 0.5rem;
  }
  .btn {
    width: 100%;
    border: none;
    height: 3.5rem;
    background-color: var(--text-color-a);
    margin-top: 3rem;
    width: 85%;
    color: var(--background);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-family: var(--font-stylish);
    box-shadow: 0px 4px 6px 0px rgba(50,50,93,0.11) , 0px 1px 3px 0px rgba(0,0,0,0.08);
  }
</style>
<script>
  import { state, sendMessage, isUserExist } from '../services/messagingService';
  export default {
    data() {
      return {
        target: this.$route.params.id, 
        message: '', 
        btn: 'Click to Send', 
        isLoading: 'true'
      }
    },
    created() {
      this.checkUser()
    }, 
    methods: {
       async checkUser() {
         let isUser = await isUserExist(this.target);
         if(!isUser) {
           this.isLoading = 'true';
           this.$router.push({ path: '/' })
         } else {
           this.isLoading = 'false';
         }
       }, 
       async send() {
         if(this.message) {
         if(state.connected) {
         await sendMessage(this.target, this.message);
         this.message = '';
           this.btn = 'Message Sent!'
           setTimeout(() => {
             this.btn = 'Click to Send!';
           }, 3000)
         } else {
           this.btn = 'Try again'
           setTimeout(() => {
             this.btn = 'Click to Send!';
           }, 3000)
         }
       } else {
           this.btn = 'Please put a message!'
           setTimeout(() => {
             this.btn = 'Click to Send!';
           }, 3000)
       } 
       }
    }, 
    watch: {
    'state.connected': function(s) {
      if(s) {
        this.btn = 'Click to Send!';
      } else {
        this.btn = 'Failed to connect';
      }
    }
  }
  }
</script>