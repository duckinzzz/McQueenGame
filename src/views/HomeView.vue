
<template>
  <div class="home">
    <div class="username" v-if="user_data">
      <h2>{{ user_data }}</h2>
    </div>
    <div class="actions" v-if="user_data">
      <button class="action-button" @click="logout">Выйти</button>
      <router-link class="action-button" :to="{ name: 'Records' }">Рекорды</router-link>
      <router-link class="action-button" :to="{ name: 'Game' }">Играть</router-link>
    </div>
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
      user_data: '' as string,
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.username {
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

button:hover {
  background-color: #2980b9;
}

router-link {
  text-decoration: none;
  color: #3498db;
  transition: color 0.3s ease;
}

router-link:hover {
  color: #2980b9;
}
a{
  text-decoration:none
}
.action-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
  text-decoration: none;
  width: 120px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.action-button:hover {
  background-color: #2980b9;
}
</style>