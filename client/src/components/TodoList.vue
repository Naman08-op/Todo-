<template>
  <div id="list">
    <button class="button is-link" @click="logout">logout</button>

    <!-- <form @submit.prevent="handleSubmit"> -->
    <!-- <div>
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
            </div> -->
    <!-- </form> -->
    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input is-success"
          type="text"
          placeholder="Enter todos"
          required
          v-model="inputtodo"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
    </div>
    <div class="field is-grouped">
      <p class="control">
        <button class="button is-link" @click="handleSubmit()">
          Submit
        </button>
      </p>

      <p class="control">
        <button class="button is-danger" @click="clearTodos">
          Clear
        </button>
      </p>
    </div>
    <div>
      <h1>Hello {{ username }}</h1>
      <h2>Your id is:{{ id }}</h2>

      <div class="notification" v-for="(item, i) in items" :key="item._id">
        <div class="columns">
          <input
            class="column input"
            v-if="isSelected(item)"
            v-model="editedDescription"
          />
          <p v-else class="column">
            <span class="tag is-primary">{{ i + 1 }}</span>
            {{ item.todo }}
          </p>
          <div class="column is-narrow">
            <span
              class="icon has-text-info"
              @click="
                isSelected(item) ? updateTodo(item, i) : removeTodo(item, i)
              "
            >
              <i class="material-icons">{{
                isSelected(item) ? "save" : "delete"
              }}</i>
            </span>
            <span
              class="icon has-text-primary"
              @click="isSelected(item) ? unselect() : select(item)"
            >
              <i class="material-icons">{{
                isSelected(item) ? "close" : "edit"
              }}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TodoList",
  data() {
    return {
      items: [],
      inputtodo: "",
      editedDescription: "",
      selected: {},
    };
  },
  created() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  async mounted() {
    axios
      .get("http://localhost:9000/todo/usertodos", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        this.username = res.data.user.username;
        this.items = res.data.user.todos;
        this.id = res.data.user.token;
      });
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async handleSubmit() {
      console.log("Todo Added");
      console.log("Todo:", this.inputtodo);
      console.log(todoBody);
      let todoBody = JSON.stringify({
        _id: this.id,
        todos: [{ todo: this.inputtodo }],
      });
      console.log(todoBody);
      axios
        .post("http://localhost:9000/todo/addTodo", todoBody, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          window.location.reload();
          this.items = res.data.user.todos;
          (this.addedTodo = res.data.result), console.log(this.addedTodo);
          this.inputtodo = " ";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeTodo(item, i) {
      axios.delete("http://localhost:9000/todo/" + this.id + "/" + item._id);

      //window.location.reload();
      console.log(this.id);
      console.log(item._id);
      this.items.splice(i, 1);
    },
    async clearTodos() {
      axios.delete("http://localhost:9000/todo/" + this.id);
      this.items = [];
    },
    async updateTodo(item) {
      axios.put(
        "http://localhost:9000/todo/" +
          this.id +
          "/" +
          item._id +
          "/" +
          this.editedDescription
      );
      window.location.reload();
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.todo;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
  },
};
</script>

<style>
#list {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
