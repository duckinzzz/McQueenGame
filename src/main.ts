

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from "@/store";

axios.defaults.baseURL = 'http://127.0.0.1:8000'

const app:any = createApp(App)
app.use(store)

app.use(router, axios)

app.mount('#app')
