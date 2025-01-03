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

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash)

const pinia = createPinia();

const storedUser = localStorage.getItem('user');

if(storedUser) {
    const userData = JSON.parse(storedUser); //JSON.parse ile JSON stringi JAVASCRİPT OBJESİNE çeviririz.
    useAuthStore(pinia).user = userData; 
}

const bookStore = useBookStore(pinia);

//uygulama başladığında kitapları çekecek
bookStore.fetchBooks().then(() => {
    const app = createApp(App);
    app
    .use(pinia)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(Toast)
    .mount("#app");
});


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
