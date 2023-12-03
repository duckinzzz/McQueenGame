<template>
  <div class="modal-outer" v-if="showModal">
    <div class="modal-content">
      <h2>Рекорд: {{ score }}</h2>
      <div class="buttons">
        <router-link @click="restartGame" to="/game">Повторить</router-link>
        <router-link @click="exitGame" to="/">Выйти</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    showModal: {
      type: Boolean as () => boolean,
      required: true
    },
    score: {
      type: Number as () => number,
      required: true
    }
  },
  methods: {
    restartGame(this: any) {
      this.$emit('restart');
    },
    exitGame() {
      this.$emit('exit');
    }
  }
});
</script>

<style scoped>
.modal-outer {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
}

button,
a {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease;
}

button:hover,
a:hover {
  background-color: #0056b3;
}

</style>