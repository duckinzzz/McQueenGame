<template>
  <div class="records-container">
    <div class="records">
      <h2>All Records</h2>
      <ul class="records-list">
        <li v-for="(record, index) in records" :key="index" class="record-item">
          <div class="record-info record-value">Record: {{ record.record }}</div>
          <div class="record-info user-info">{{ record.user.username }}</div>
        </li>
      </ul>
    </div>
    <router-link to="/" class="back-link">
      <span class="arrow">&larr;</span> Назад
    </router-link>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'RecordsList',
  data() {
    return {
      records: [] as any[]
    };
  },
  mounted() {
    this.getAllRecords();
  },
  methods: {
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

<style scoped>
.records-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -200px;
}

.back-link {
  text-decoration: none;
  color: #3498db;
  margin-top: 20px;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f1e6be;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #dac892;
}

.arrow {
  margin-right: 5px;
}

.records {
  font-family: 'Montserrat', sans-serif;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.records-list {
  list-style: none;
  padding: 0;
}

.record-item {
  background-color: #f1e6be;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-info {
  font-weight: bold;
}

.user-info {
  margin-left: 100px;
  text-align: right;
}

.record-value {
  margin-left: 0;
  margin-right: auto;
  text-align: left;
}
</style>
