<template>
    <!-- html şablon kısmı -->
   <NavBar/>
    <!-- <nav-bar /> -->
    <!-- <NavBar></NavBar> -->
    <!-- <nav-bar></nav-bar> şekilde kullanılabilir -->
    
     <!-- RouterView ı import etmemize gerek yok çünkü main.js de app.use(router) diyerek global olarak tanımlamış olduk heryerden erişebiliriz. url ler için yer tutucu -->
   <RouterView />
    <TheFooter/>
  
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import TheFooter from "@/components/TheFooter.vue";
</script>

<!-- <script>
    // javascript kısmı

    //reactivity özelliği : bir şeye tepki vermek
    import NavBar from "@/components/NavBar.vue"
    import TheFooter from "@/components/TheFooter.vue";

    //options api 
    export default {
        // component içeriği
        name : 'App',
        components : {
            // eklenecek componentlar
            NavBar,
            TheFooter
        },
        data() {
            return {
                // data içeriği : verilerin değişkenlerin başlangıç değerleri
               
            }
        },
       
    }
</script> -->

<style>
  
</style>