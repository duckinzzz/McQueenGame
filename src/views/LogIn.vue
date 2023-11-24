<template>
  <div class="log-in-page">
    <h1>Log in</h1>
    <form @submit.prevent="submitForm">
      <label>Username:</label>
      <input type="email" name="username" v-model="username"><br><br>
      <label>Password:</label>
      <input type="password" name="password" v-model="password"><br><br>
      <button type="sumbit">Log in</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "LogIn",
  data(){
    return{
      username: '',
      password: ''
    }
  },
  methods:{
    submitForm(e){
      axios.defaults.headers.common['Authorization']= ''
      localStorage.removeItem("access")
      const formData = {
        username: this.username,
        password: this.password
      }
      axios
          .post('api/v1/jwt/create/',formData)
          .then(response =>{
            console.log(response)
          })
          .catch(error =>{
            console.log(error)
          })
    }
  }
}

</script>