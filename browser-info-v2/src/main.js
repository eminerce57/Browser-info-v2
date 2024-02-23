import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-dark-green/theme.css'
const app = createApp(App)
app.use(router)
app.mount('#app')
