import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(router)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
