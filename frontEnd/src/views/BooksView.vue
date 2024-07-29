<template>
  <section>
    <div class="container">
        <!-- <SectionHeader title = "Books" text="Books Text"/> -->
         <!-- Burada datada tanımlanan sectiontitle ı SectionHeader a prop olarak gönderebilmek için v-bind:title olarak kullanırız.
            Bu şekilde SectionHeader componentine title propu olarak sectionTitle ı göndermiş oluruz. :title olarak da kullanılır.-->
        <!-- <SectionHeader :title="sectionTitle" text="Books Text"/> -->
        <SectionHeader title="Books" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, beatae cumque nisi laborum harum ipsam!"/>
        <div class="row">
            <div class="col-sm-6 col-md-4 col-xl-3">
                <div class="card-border-0 shadow position-relative">
                    <img src="../../template/images/b1.jpg" class="card-img-top">
                    <div class="card-body">
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
    export default {
        //hata ayıklamada derleyici tarafında hangi componenetin hata verdiğini anlamak için kullanılır.
        name : 'BooksView',
        components: {
            SectionHeader
        },
        data() {
            return {
                // sectionTitle : "Kitaplar",

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>