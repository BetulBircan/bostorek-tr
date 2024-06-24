<template>
    <!-- html şablon kısmı -->
   <NavBar/>
</template>

<script>
    // javascript kısmı
    import NavBar from "@/components/NavBar.vue"

    export default {
        // component içeriği
        name : 'App',
        components : {
            // eklenecek componentlar
            NavBar
        },
        data() {
            return {
                // data içeriği
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