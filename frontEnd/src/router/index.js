import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import BooksView from "@/views/BooksView.vue"
import ContactView from "@/views/ContactView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            //url için uniq identity yani tekil bir tanımlayıcı
            name : "home",
            component : HomeView
        },
        {
            path : '/books',
            //url için uniq identity yani tekil bir tanımlayıcı
            name : "books",
            component : BooksView
        },
        {
            path : '/contact',
            //url için uniq identity yani tekil bir tanımlayıcı
            name : "contact",
            component : ContactView
        },
        {
            path : '/login',
            //url için uniq identity yani tekil bir tanımlayıcı
            name : "login",
            component : LoginView
        },
        {
            path : '/register',
            //url için uniq identity yani tekil bir tanımlayıcı
            name : "register",
            component : RegisterView
        }

    ],
    linkActiveClass : "active-link", //aktif olan linkin class'ı
})

export default router;