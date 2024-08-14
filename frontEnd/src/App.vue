<template>
    <!-- html şablon kısmı -->
   <NavBar/>
    <!-- <nav-bar /> -->
    <!-- <NavBar></NavBar> -->
    <!-- <nav-bar></nav-bar> şekilde kullanılabilir -->
    
     <!-- RouterView ı import etmemize gerek yok çünkü main.js de app.use(router) diyerek global olarak tanımlamış olduk heryerden erişebiliriz. url ler için yer tutucu -->
   <RouterView />
  
</template>

<script>
    // javascript kısmı

    //reactivity özelliği : bir şeye tepki vermek
    import NavBar from "@/components/NavBar.vue"

    //options api 
    export default {
        // component içeriği
        name : 'App',
        components : {
            // eklenecek componentlar
            NavBar
        },
        data() {
            return {
                // data içeriği : verilerin değişkenlerin başlangıç değerleri
               
            }
        },
       
    }
</script>

<style>
    /* css kısmı */
    @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@200..1000&display=swap');
    
    html, body {
        font-family: 'Mulish', sans-serif;
    }
    
    a {
        text-decoration: none;
    }
</style>