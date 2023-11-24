<template>
  <div class="sign-up-page">
    <h1>Sign up</h1>
    <form @submit.prevent="submitForm">
      <label>Username:</label>
      <input type="email" name="username" v-model="username"><br><br>
      <label>Password:</label>
      <input type="password" name="password" v-model="password"><br><br>
      <button type="sumbit">Sign up</button>
    </form>

  </div>
</template>
<script>
import axios from 'axios'
import router from "@/router";

export default {
  name: "SignUp",
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    submitForm(e){
      const formData = {
        username: this.username,
        password: this.password,
      }
      axios
          .post('api/v1/users/', formData)
          .then(response =>{
            console.log(response)
            router.push('/log-in')
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}

</script>