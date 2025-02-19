import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/style.css';

import { createApp } from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from 'pinia';
import { useBookStore } from '@/stores/bookStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { useCommentStore } from '@/stores/commentStore.js';
import axios from 'axios';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faThumbsUp,faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp, faPenToSquare } from '@fortawesome/free-regular-svg-icons'



import { useToast } from 'vue-toastification';
const toast = useToast();

/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash, farThumbsUp)

const pinia = createPinia();
const authStore = useAuthStore(pinia);

//axios Interceptor. Axios içerisinde bir middleware arayazılım. Request ve response lara kaydedebileceğimiz işlevsellikler oluşturmaya yarar. 
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        
        if(error.response && error.response.status === 401 && error.response.data.error === 'Token has expired') {
            //Display Toast Message
            toast.error('Your token has expired, forwarding login page', {
                position : 'top-right',
                timeout: 3000,
                closeButton : 'button',
                icon : true,
                rtl : false,
            });

            setTimeout(() => {
                authStore.logout();
                router.push('/login');
            }, 3000);
        }

        throw error;
    }
)

const storedUser = localStorage.getItem('user');

if(storedUser) {
    const userData = JSON.parse(storedUser); //JSON.parse ile JSON stringi JAVASCRİPT OBJESİNE çeviririz.
    useAuthStore(pinia).user = userData.user; 

    const token = userData.token;
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //axios.defaults.headers.common ile tüm axios isteklerine header ekleyebiliriz
    }
}

const bookStore = useBookStore(pinia);
const commentStore = useCommentStore(pinia);

//axios ınterceptor ---> Eğer hata varsa ve bu hatanın kodu 401 ise toast mesajı göster (token ınınz expire oldu  logine yönlendiriliyorsunuz) yaz ve login e yönlendr çıkış işlemi yap.
 
const init = async () => { 
    await Promise.all([bookStore.fetchBooks(), commentStore.fetchComments()]);
    const app = createApp(App);
    app
    .use(pinia)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Toast)
    .mount("#app")
}

init();

//uygulama başladığında kitapları çekecek ama proje büyüyünce bu kısım sağlıklı olmayabilir.
// bookStore.fetchBooks().then(() => {
//     const app = createApp(App);
//     app
//     .use(pinia)
//     .use(router)
//     .component('font-awesome-icon', FontAwesomeIcon)
//     .use(Toast)
//     .mount("#app");
// });


// app.use(router);
// app.component('font-awesome-icon', FontAwesomeIcon)
// app.mount("#app");

//Bir vue instance ı oluşturacak yani vue uygulamasının özelliklerini ve davranışlarını gösteren bir nesneyi İÇERECEK
// const app = createApp({
//     data() {
//         return {
//             name : "Betül",
//         };
//     },
//     template : `<h1>Benim adım {{name}}</h1>`,
// });

// //Vue instance ı nı belirtilen elemente monte edecek indexhtml de göstermek için
// app.mount("#app");
