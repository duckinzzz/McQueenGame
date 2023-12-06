<template>
  <div class="modal-outer" v-if="showModal">
    <div class="modal-content">
      <h2>Счет: {{ score }}</h2>
      <div class="actions">
        <router-link @click="restartGame" to="/game" class="double-border-button-start">Повторить</router-link>
        <router-link @click="exitGame" to="/" class="double-border-button">Выйти</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

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
  background-color: #f1e6be;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.double-border-button-start,
.double-border-button {
  padding: 20px 60px;
  border-radius: 2px;
  border: 3px solid #dac892;
  color: rgba(14, 13, 8, 0.97);
  background-color: #f1e6be;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  transition: .2s;
  text-decoration: none;
  margin: 0 20px;
}

.double-border-button-start:hover,
.double-border-button:hover {
  border-color: #dac892;
  color: #2980b9;
}
</style>
