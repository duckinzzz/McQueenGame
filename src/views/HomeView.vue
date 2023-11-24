<template>
  <div class="home">
    <h1>Home</h1>

    <span :src ="user_data">{{user_data}}</span>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data(){
    return{
      user_data: '' as string
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
    }
  }
});
</script>
