import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import BooksView from "@/views/BooksView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import BookDetailView from "@/views/BookDetailView.vue"
import DashboardView from '@/views/DashboardView.vue'

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
            path : '/books/:id',
            //url için uniq identity yani tekil bir tanımlayıcı. detaysayfası için kullanılırç
            name : "book-detail",
            component : BookDetailView
        },
        {
            path : '/dashboard',
            name : "dashboard",
            component : DashboardView,
            meta : {requiresAuth : true} //dashboard sayfasına giriş yapabilmek için giriş yapmış olmak gerekiyor
        },
        //mail gönderimi nodejs anlatım kısmında var arin yazılım kanalında ContactView ksmı kaldırıldı
        // {
        //     path : '/contact',
        //     url için uniq identity yani tekil bir tanımlayıcı
        //     name : "contact",
        //     component : ContactView
        // },
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

//router.beforeEach : herhangi bir route a gitmeden önce yapılacak işlemler bir routtan d,ğer route a geçerken yapılacak işlemler
router.beforeEach((to,from,next) => {
    const requiresAuth = to.matched.some(url => url.meta.requiresAuth); //kullanıcı yetkisi var mı yok mu kontrol eder
    //localSStorage de kullanıcı var mı yok mu varsa giriş yapmış demektir
    const isLoggedIn = localStorage.getItem('user');
    if(requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
    
    
    // const isAuthenticated = localStorage.getItem('user');
    // if(to.meta.requiresAuth && !isAuthenticated) {
    //     next('/login');
    // } else {
    //     next();
    // }
})

export default router;