import { createApp } from "vue";
import App from "@/App.vue";

const app = createApp(App);
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
