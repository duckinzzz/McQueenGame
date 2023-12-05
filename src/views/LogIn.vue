<template>
  <div class="log-in-page">
    <h1>Авторизация</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <label for="username">Username:</label>
      <input type="username" name="username" v-model="username" id="username"><br><br>
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" id="password"><br><br>
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  name: "LogIn",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem("access")
      const formData = {
        username: this.username,
        password: this.password
      };
      axios.post('api/v1/jwt/create/', formData)
          .then(response => {
            console.log(response);
            const access = response.data.access;
            const refresh = response.data.refresh;
            const username = this.username
            console.log(username)
            this.$store.commit("setUserName", username);
            this.$store.commit("setAccess", access);
            this.$store.commit("setRefresh", refresh);
            axios.defaults.headers.common['Authorization'] = "JWT " + access;
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);


            router.push('/');
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

<style scoped>
.log-in-page {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-bottom: 100px;

}

.login-form {
  display: inline-block;
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

label {
  font-weight: bold;
}

input[type="username"],
input[type="password"],
button {
  display: block;
  margin: 10px auto;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
}

button {
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
