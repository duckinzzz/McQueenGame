<template>
  <nav>
    <router-link to="/">Начать</router-link>
    |
    <router-link to="/about">Об игре</router-link>
    |
    <router-link to="/log-in">Вход</router-link>
    |
    <router-link to="/sign-up">Регистрация</router-link>
  </nav>
  <router-view/>
</template>
<script>
import axios from "axios";

export default {
  name: 'App',
  beforeCreate() {
    console.log(this.$store)
    this.$store.commit("initializeStore")
    const access = this.$store.state.access
    if (access) {
      axios.defaults.headers.common['Authorization'] = "JWT " + access
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }

  },
  mounted() {
    setInterval(()=>{
      this.getAccess()
    },1000*3500)

  },
  methods: {
    getAccess(e) {
      const accessData = {
        refresh: this.$store.state.refresh
      }
      axios
          .post('api/v1/jwt/refresh/', accessData)
          .then(response => {
            const access = response.data.access
            console.log(access)
            localStorage.setItem("access", access)
            this.$store.commit("setAccess", access)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script setup lang="ts">
</script>