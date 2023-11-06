import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
const pinia = createPinia()
import DataVVue3 from '@kjgl77/datav-vue3'

createApp(App).use(router).use(pinia).use(ElementPlus).use(DataVVue3).mount('#app')
