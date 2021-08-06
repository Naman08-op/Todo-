<template>
  <div id="app">
    <div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Enter your username" required v-model="username"/>
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p>{{username}}</p>
  </div>
  <div class="field is-grouped">
  <div class="control">
    <button class="button is-link" @click=handleSubmit()>Submit</button>
    
  </div>
  
  </div>
  <p class="help is-danger">{{error}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name:'Login',
  data() {
    return {
      username: ""
    };
  },

  methods:{
    handleSubmit(){
      console.log("Form Submitted")
      console.log("username:",this.username)

      let user={
        username: this.username
      }
      axios.post('http://localhost:9000/todo/login',user)
      .then(res=>{
        if(res.status===200){
          
         // window.localstorage.setItem('token',res.data.token);
          //document.cookie=res.data.token;
          sessionStorage.setItem('token',res.data.token);
          this.$router.push('/todolist');
        } 
      },err=>{
        console.log(err.response);
        this.username=''
        this.error=err.response.data.error
      })
    }, 
  }
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>