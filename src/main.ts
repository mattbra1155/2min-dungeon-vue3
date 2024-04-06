import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import '@/assets/styles/main.sass'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
