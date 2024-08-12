<template>
   <section>
    <div class="container">
        <SectionHeader title="Book Detail"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, beatae cumque nisi laborum harum ipsam!" />
        <button>Back</button>
        <div class="row">
            <div class="col-lg-6">
                <v-img class="card-img-top" src="../../template/images/b_detail.jpg" alt="Book Image"></v-img>
            </div>
            <div class="col-lg-6">
                <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda reiciendis aliquam minima libero adipisci itaque, architecto sed accusantium ut eum!</p>
                <div class="col-lg-6"></div>
                <div class="col-lg-6"></div>
            </div>
        </div>
        
    </div>
   </section>
</template>

<script>
    import SectionHeader from '@/components/SectionHeader.vue'
    export default {
        name : "BookDetailView",
        components : {
            SectionHeader
        }
    }
</script>

<style lang="scss" scoped>

</style>