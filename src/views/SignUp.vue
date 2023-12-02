<template>
  <div class="sign-up-page">
    <h1>Регистрация</h1>
    <form @submit.prevent="submitForm" class="signup-form">
      <label for="username">Username:</label>
      <input type="username" name="username" v-model="username" id="username"><br><br>
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" id="password"><br><br>
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import router from "@/router";

export default {
  name: "SignUp",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      const formData = {
        username: this.username,
        password: this.password,
      };

      axios
          .post('api/v1/users/', formData)
          .then(response => {
            console.log(response);
            this.loginUserAfterSignUp(formData);
          })
          .catch(error => {
            console.log(error);
          });
    },
    loginUserAfterSignUp(formData) {
      axios.post('api/v1/jwt/create/', formData)
          .then(response => {
            console.log(response);
            const access = response.data.access;
            const refresh = response.data.refresh;

            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);


            axios.defaults.headers.common['Authorization'] = "JWT " + access;

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
.sign-up-page {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-bottom: 100px;

}

.signup-form {
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