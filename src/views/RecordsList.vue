<template>
  <router-link to="/">Назад</router-link>
  <div class="records">
    <h2>All Records</h2>
    <ul>
      <li v-for="(record, index) in records" :key="index">
        <span>Record: {{ record.record }}</span>
        <span>User: {{ record.user.username }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RecordsList',
  data(){
    return {
      records: [] as any[]
    };
  },
  mounted() {
    this.getAllRecords();
  },
  methods:{
    getAllRecords(): void {
      axios
          .get("http://127.0.0.1:8000/api/v1/records/")
          .then(response => {
            console.log(response);
            this.records = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
});
</script>