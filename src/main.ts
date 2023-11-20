import '@/style.css'
import App from "@/App.vue"
import { createApp } from 'vue'
import primeVue from "@/config/prime-vue.ts";
import {createPinia} from "pinia";
import {createRouter, createWebHistory, Router} from "vue-router";
import routes from "@/router/routes.ts";

const app = createApp(App)
const Pinia = createPinia()

const history = createWebHistory('')

const router = createRouter({
    history,
    routes,
}) as Router

app.use(primeVue)
app.use(Pinia)
app.use(router)
app.mount('#app')
