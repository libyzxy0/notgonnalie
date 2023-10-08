<template>
  <div id="login" :class="isLoggedIn ? 'hidden' : ''">
    <h1>Ngl - Not Gonna Lie</h1>
    <p>Received/Send Message anonymously!</p>
    <div class="content">
      <input @input="validate()" type="text" placeholder="@libyzxy0" v-model="username">
      <p :class="isValidInput ? 'alert-green' : 'alert-red'">{{ errorMsg }}</p>
      <button @click="login()" :disabled="!isValidInput">Create My Account</button>
    </div>
    <footer>
      <p>By Continuing, You agree to our <a href="/">Terms of Use</a> and have read and agreed to our <a href="/">Privacy Policy</a></p>
    </footer>
  </div>
</template>
<style scoped>
  #login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, var(--color-c) 0%, var(--color-b) 100%);
    text-align: center;
  }
  h1 {
    font-family: var(--font-stylish);
    color: var(--text-color-a);
    margin-top: 5rem;
  }
  p {
    font-family: var(--font-primary);
    font-weight: 600;
    color: var(--text-color-b);
  }
  .alert-green {
    margin: 3px 4rem;
    color: white;
  }
  .alert-red {
    margin-top: 3px;
    color: red;
    margin: 3px 8px rem;
  }
  .content {
    margin-top: 3rem;
    width: 100%;
  }
  input {
    width: 80%;
    height: 3.5rem;
    opacity: 0.8;
    border-radius: 30px;
    border: none;
    outline: none;
    padding: 20px;
    font-size: 19px;
    font-weight: 600;
    font-family: var(--font-normal);
    box-shadow: 0px 4px 6px 0px rgba(50,50,93,0.11), 0px 1px 3px 0px rgba(0,0,0,0.08);
  }
  button {
    width: 80%;
    height: 3.5rem;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 19px;
    font-weight: 600;
    font-family: var(--font-normal);
    box-shadow: 0px 4px 6px 0px rgba(50,50,93,0.11), 0px 1px 3px 0px rgba(0,0,0,0.08);
    margin-top: 3rem;
    background-color: var(--background);
  }
  footer {
    position: fixed;
    margin: 0 2rem;
    bottom: 2rem;
  }
  footer p a {
    text-decoration: underline;
    color: var(--text-color-b)
  }
</style>
<script>
  import { makeAuth, verifyAuth } from '../services/authService.js';
  export default {
    data() {
      return {
        isLoggedIn: false, 
        username: '',
        isLoading: 'true', 
        isValidInput: false,
        errorMsg: ''
      }
    },
    created() {
      this.checkLogin()
    }, 
    methods: {
      validate() {
         let regex = /^[a-zA-Z0-9]+$/;
         if(!this.username) {
           this.isValidInput = false;
           this.errorMsg = 'Please fill up the blanks';
         } else {
           if (regex.test(this.username)) {
             this.isValidInput = true;
             this.errorMsg = 'Good dog!';
           } else {
             this.isValidInput = false;
             this.errorMsg = "You can't use that character";
           }
         }
      }, 
      async login() {
          try {
          let res = await makeAuth(this.username);
          if(res && res.code == 200) {
          this.$cookie.setCookie('token', res.token, {
          expire: '365d',
          path: '/',
          domain: '',
          secure: '',
          sameSite: ''
        })
          this.checkLogin();
           } else {
            alert('An error occurred while creating account');
           }
         } catch (err) {
            alert('An error occurred while authenticating');
         }
      }, 
      async checkLogin() {
        try {
        if(this.$cookie.getCookie('token')) {
          let res = await verifyAuth(this.$cookie.getCookie('token'));
          if(res && res.code == 200) {
          this.isLoggedIn = true;
          this.$emit('update', {
            isLoggedIn: true, 
            username: res.data.username
          });
          this.isLoading = 'false';
         } else {
            alert('An error occurred while authenticating account');
         }
        } else {
          this.isLoggedIn = false;
          this.$emit('update', {
            isLoggedIn: false, 
            username: ''
          });
        }
       } catch (error) {
           alert('An error occurred while authenticating');
       }
      }
    }
  }
</script>