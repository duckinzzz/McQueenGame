<template>
  <div class="sign-up-page">
    <h1>Регистрация</h1>
    <form @submit.prevent="submitForm" class="signup-form">
      <label for="username">Имя пользователя:</label>
      <input type="username" name="username" v-model="username" id="username"><br><br>
      <label for="password">Пароль:</label>
      <input type="password" name="password" v-model="password" id="password"><br><br>
      <label for="confirmPassword">Подтвердите пароль:</label>
      <input type="password" name="confirmPassword" v-model="confirmPassword" id="confirmPassword"><br><br>
      <p v-if="unconfirmedPassword" style="color: red; font-family: 'Montserrat', sans-serif; font-size: 80%">{{ unconfirmedPassword }}</p>
      <button class="double-border-button" type="submit">Зарегистрироваться</button>
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
      password: '',
      confirmPassword: '',
      unconfirmedPassword: ''
    }
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        this.unconfirmedPassword = 'Пароли не cовпадают';
        return;
      }
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
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin-bottom: 100px;

}

.signup-form {
  display: inline-block;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 2px;
  background-color: #f9f9f9;
  margin-top: 20px;
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

.double-border-button {
  justify-content: center;
  width: auto;
  text-decoration: none;
  display: inline-flex;
  margin: 5px 10px;
  padding: 10px 30px;
  border-radius: 2px;
  position: relative;
  border: 3px solid #dac892;
  color: rgba(14, 13, 8, 0.97);
  background-color: #f1e6be;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  transition: .2s;

}

.double-border-button:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: .4s;
}

.double-border-button:hover:after {
  border-color: #dac892;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
}
</style>
