<template>
  <div class="sign-up-page">
    <h1>Sign up</h1>
    <form @submit.prevent="submitForm">
      <label>Username:</label>
      <input type="username" name="username" v-model="username"><br><br>
      <label>Password:</label>
      <input type="password" name="password" v-model="password"><br><br>
      <button type="sumbit">Sign up</button>
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
            // Выполнение входа пользователя после успешной регистрации
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

            // Сохранение учетных данных в localStorage
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);

            // Опционально: сохранение учетных данных в хранилище Vuex
            // this.$store.commit("setAccess", access);
            // this.$store.commit("setRefresh", refresh);

            axios.defaults.headers.common['Authorization'] = "JWT " + access;

            // Переход на главную страницу
            router.push('/');
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>