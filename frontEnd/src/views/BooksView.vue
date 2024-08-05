<template>
    <section>
        <div class="container">
            <!-- <SectionHeader title = "Books" text="Books Text"/> -->
            <!-- Burada datada tanımlanan sectiontitle ı SectionHeader a prop olarak gönderebilmek için v-bind:title olarak kullanırız.
            Bu şekilde SectionHeader componentine title propu olarak sectionTitle ı göndermiş oluruz. :title olarak da kullanılır.-->
            <!-- <SectionHeader :title="sectionTitle" text="Books Text"/> -->
            <SectionHeader title="Books"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, beatae cumque nisi laborum harum ipsam!" />
            <BookList :books="books"/>

        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import BookList from '@/components/BookList.vue';
import books from '@/db.js';
export default {
    //hata ayıklamada derleyici tarafında hangi componenetin hata verdiğini anlamak için kullanılır.
    name: 'BooksView',
    components: {
        SectionHeader,
        BookList
    },
    data() {
        return {
            // sectionTitle : "Kitaplar",
            books: books

        }
    },
}
</script>

<style scoped>
.auth-box {
    margin-top: -30px;
}
</style>