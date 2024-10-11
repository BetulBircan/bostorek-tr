<template>
    <section>
        <div class="container">
            <!-- <SectionHeader title = "Books" text="Books Text"/> -->
            <!-- Burada datada tanımlanan sectiontitle ı SectionHeader a prop olarak gönderebilmek için v-bind:title olarak kullanırız.
            Bu şekilde SectionHeader componentine title propu olarak sectionTitle ı göndermiş oluruz. :title olarak da kullanılır.-->
            <!-- <SectionHeader :title="sectionTitle" text="Books Text"/> -->
            <SectionHeader title="Books"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, beatae cumque nisi laborum harum ipsam!" />
            <!-- <BookList :books="books"/> -->
            <BookList :books="paginetedBooks"/>    <!-- sayfa bazlı kitap sayısını gönderiyoruz -->
            <!-- @page-changed yazmamızın sebebi child component e emit ile bilgi aktarmak için kullanılır child dakie mit in adı kullanıldı -->
            <PaginationWidget :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage"/>

        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import BookList from '@/components/BookList.vue';
import PaginationWidget from '@/components/widgets/PaginationWidget.vue';
import { useBookStore } from '@/stores/bookStore';
import { mapState } from 'pinia';

export default {
    //hata ayıklamada derleyici tarafında hangi componenetin hata verdiğini anlamak için kullanılır.
    name: 'BooksView',
    components: {
        SectionHeader,
        BookList,
        PaginationWidget
    },
    data() {
        return {
            // sectionTitle : "Kitaplar",
            currentPage : 1,
            itemsPerPage : 8,
            //bookStore : useBookStore(),

        }
    },
    //computed : var olan verilerden ya da component özelliklerinden bize birşeyler hesaplaması gerekir . hesaplanmış veriler olmasını sağlar 
     computed: {
        ...mapState(useBookStore, ['books','isLoading']), //store dan books state ini çekiyoruz  
        totalPages() {
            //computed değeri buradaki bağlı değişkenlerin değerleir değiştiğinde hesaplanır.
            return Math.ceil(this.books.length / this.itemsPerPage); //math.ceil:ondalıklı bir sayıyı kendine en yakın olan bir fazlası tamsayıya dönüştürür.
        },
        //sayfalara göre kitapların dönmesini sağlar
        paginetedBooks() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage; //4 - 8 currenTpAGE = 2
            const endIndex = startIndex + this.itemsPerPage;
            return this.books.slice(startIndex, endIndex);
        }
        
    },
    methods: {
        updatePage(page) {
            this.currentPage = page;
        },

        //backend e istek atıp kitapları çekecek
    },
}
</script>

<style scoped>
.auth-box {
    margin-top: -30px;
}
</style>