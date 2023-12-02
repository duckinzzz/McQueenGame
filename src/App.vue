<template>
  <div>
    <nav v-if="showNav">
      <router-link to="/">Начать</router-link> |
      <router-link to="/log-in">Вход</router-link> |
      <router-link to="/sign-up">Регистрация</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  computed: {
    showNav() {
      return this.$route.path !== '/game';
    }
  },
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
    },1000*60*4)

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
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #bd5454; /* Цвет фона панели навигации */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px 20px;
  left: 0;
  right: 0;
  a {
    font-weight: bold;
    color: #fff; /* Цвет текста */
    text-decoration: none;
    margin: 0 10px;
    padding: 6px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>