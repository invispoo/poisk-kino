import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(Antd).use(router).use(pinia).mount("#app");