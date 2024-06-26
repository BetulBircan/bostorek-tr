import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";

const app = createApp(App);
app.use(router);
app.mount("#app");

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
