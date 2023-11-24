<template>
  <div class="home">
    <h1>Home</h1>
    <span v-if="userIsLoggedIn" >{{ user_data }}</span>
    <button v-if="userIsLoggedIn" @click="logout">Log out</button>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  props: {
    store: Object
  },
  data(){
    return{
      user_data: '' as string
    }
  },
  computed: {
    userIsLoggedIn(): boolean {
      return !!localStorage.getItem('access');
    }
  },
  mounted() {
    this.getMe()
  },
  methods:{
    getMe(): void {
      axios
          .get("api/v1/users/me")
          .then(response => {
            console.log(response)
            this.user_data = response.data.username
          })
          .catch(error => {
            console.log(error)
          })
    },
    logout(): void {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      if (this.$props.store) {
        this.$props.store.commit('clearAccess');
        this.$props.store.commit('clearRefresh');
      }
      this.user_data = '';
      this.$router.push('/log-in');
    }
  }
});
</script>
