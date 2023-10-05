<template>
  <div id="main">
    <div class="card">
      <div class="header">
        <img src='https://http.cat/404' alt="Hello">
        <h1>{{'@' + $route.params.id}}</h1>
      </div>
        <textarea placeholder="Send me anonymous message..."></textarea>
    </div>
    <button class="btn">Click to Send</button>
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
    background-image: linear-gradient(120deg, var(--color-b) 0%, var(--color-c) 100%);
  }
  .card {
    width: 90%;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
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
    font-size: 25px;
    border-radius: 0px 0px 20px 20px;
    background-color: var(--color-b);
    font-family: 'Nunito', cursive;
    font-weight: 600;
    color: var(--text-color-a);
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
  }
</style>
<script>
  export default {
    data() {
      return {
        usr: this.$route.params.id
      }
    }, 
    created() {
     // alert(this.usr)
    }
  }
</script>