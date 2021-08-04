import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import TodoList from './components/TodoList.vue';

Vue.use(VueRouter);

const routes=[
    {path:'/login', component: Login},
    {path:'/todolist', component: TodoList}
];

const router = new VueRouter({
    mode: 'history',
    routes
});


new Vue({
    el: '#app',
    router,
    render: h => {
      return h(App)
    }
  });

