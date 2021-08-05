<template>
    <div>
         
            <button class="button is-link" @click="logout">logout</button>
              
        <form @submit.prevent="handleSubmit">
            <div>
                <label>ADD Todo:</label>
                <input type='todo' placeholder="Add todo" required v-model='inputtodo'/>
                <div>    
                    <p>Todo:{{ inputtodo }}</p>
                    
                    <div class="field is-grouped">
                        <p class="control">
                        <button class="button is-link">
                       Submit
                        </button>
                    </p>
                    
                    
                    <p class="control">
                        <button class="button is-danger">
                        Clear
                        </button>
                    </p>
                    </div>
                </div>
            </div>
        </form>
        <div>
    <h1>Hello {{username}}</h1>
    <h2>Your id is:{{id}}</h2>
    
    <div class="container">
        <h3 class="p-3 text-center">Vue.js - Display a list of items with v-for</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th> Todo ID</th>
                    <th>Todos</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{item._id}}</td>
                    <td>{{item.todo}}</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
  </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'TodoList',
        data(){
            return{
                items:[],
                inputtodo:'',
            }
        },
        created(){
        if(sessionStorage.getItem('token')===null){
            this.$router.push('/login');
        }
    },
    mounted(){
      axios.get('http://localhost:9000/todo/usertodos',{headers:{ token: sessionStorage.getItem('token')}})
       .then(res=>{

           this.username=res.data.user.username;
           this.items=res.data.user.todos;
           this.id=res.data.user.token;
            
       })
   },
   methods:{
       

       logout(){
           window.sessionStorage.clear();
           this.$router.push('/login');
       },
    handleSubmit(){
           console.log("Todo Added")
           console.log("Todo:",this.inputtodo)
            console.log(todoBody)
            let todoBody=JSON.stringify({
               _id:this.id,
               todos:[{todo: this.inputtodo}]
           });
           console.log(todoBody)
           axios.post('http://localhost:9000/todo/addTodo',todoBody,{
               "headers":{
                   "content-type":"application/json",
               }
           })
           .then(res=>{
               window.location.reload();
               this.items=res.data.user.todos;
               this.addedTodo=res.data.result,
               console.log(this.addedTodo)
               this.inputtodo=" "

           })
           .catch(error =>{
               console.log(error)
           })
           
           
           }
   }
    }
</script>

<style>
    
</style>