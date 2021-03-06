import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import Login from "@/views/Login.vue"



const routes = [
    {
        path: "/",
        name : "Random",
        component: Home
    },
    {
        path: "/connexion",
        name: "Login",
        component : Login
    },
    {
        path: "/about",
        name: "About",
        component : About
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router