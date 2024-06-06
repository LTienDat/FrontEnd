import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routers'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).use(router).mount('#app')
