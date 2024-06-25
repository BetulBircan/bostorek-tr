<template>
    <!-- html şablon kısmı -->
   <NavBar/>
   <!-- <nav-bar /> -->
    <!-- <NavBar></NavBar> -->
     <!-- <nav-bar></nav-bar> şekilde kullanılabilir -->
      <p>{{ message }}</p>
      <button @click="count++">Count</button>
      <p>{{count}}</p>
      <p v-if="isVisible">Burası Görünecek</p>
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
                message : "Merhaba",
                count : 0,
                // isVisible : true
                isVisible : false
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
</style>