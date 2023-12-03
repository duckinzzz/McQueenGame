
<template>
  <div class="home">
    <div class="drive-to-survive">
      <h1>Drive to survive!</h1>
    </div>

    <div class="username" v-if="user_data">
      <h2>С возвращением, {{ user_data }}!</h2>
    </div>
    <div class="actions" v-if="user_data">
      <router-link class="double-border-button-start" :to="{ name: 'Game' }">Играть</router-link>
      <router-link class="double-border-button" :to="{ name: 'Records' }">Рекорды</router-link>
      <router-link class="double-border-button" to="/log-in" @click="logout">Выйти</router-link>
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
            if (response.data && response.data.username) {
              this.user_data = response.data.username;
            } else {
              this.clearLocalStorage();
            }
          })
          .catch(error => {
            console.log(error)
            this.clearLocalStorage();
          })
    },
    clearLocalStorage(): void {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      if (this.$props.store) {
        this.$props.store.commit('clearAccess');
        this.$props.store.commit('clearRefresh');
      }
    },
    logout(): void {
      this.clearLocalStorage();
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
  font-family: 'Montserrat', sans-serif;
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
  margin-bottom: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 10px;
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
.action-button-start {
  padding: 8px 16px;
  border: none;
  border-radius: 2px;
  background-color: #3498db;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
  text-decoration: none;
  width: 160px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
}

.action-button-start:hover {
  background-color: #2980b9;
}

.action-button {
  padding: 8px 16px;
  border: none;
  border-radius: 2px;
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
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 10px;
}

.action-button:hover {
  background-color: #2980b9;
}
.drive-to-survive{
  margin-top: 50px;
  margin-bottom: 20px;
}
.double-border-button-start{
  text-decoration: none;
  display: inline-flex;
  margin: 10px 20px;
  padding: 20px 60px;
  border-radius: 2px;
  position: relative;
  border: 3px solid #dac892;
  color: rgba(14, 13, 8, 0.97);
  background-color: #f1e6be;
  font-size: 24px;
  font-family: 'Montserrat', sans-serif;
  transition: .2s;
  justify-content: center;

}
.double-border-button-start:after {
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
.double-border-button-start:hover:after {
  border-color: #dac892;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
}
.double-border-button{
  justify-content: center;
  width: 50%;
  text-decoration: none;
  display: inline-flex;
  margin: 10px 20px;
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