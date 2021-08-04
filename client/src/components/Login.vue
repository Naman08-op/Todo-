<template>
  <div>
    <form @submit.prevent= "handleSubmit">
    <div>
    
      <label>Username:</label>
      <input type="username" placeholder="Username" required v-model="username" />
    
    <div>    
        <p>Username:{{ username }}</p>
        
    </div>
    <div class="control">
    <button class="button is-link">Submit</button>
    
  </div>
  <p> {{error}}</p>

  </div>
  </form>
  
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
form {
  max-width: 420px;
  margin: 30px auto;
  background: rgb(226, 219, 219);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px dolid #ddd;
  color: #555;
}
button{
  background: cadetblue;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: azure;
  border-radius: 20px;
}
</style>