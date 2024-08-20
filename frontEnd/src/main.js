import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/style.css';

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faArrowLeft, faThumbsUp)

const app = createApp(App);
app.use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
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
