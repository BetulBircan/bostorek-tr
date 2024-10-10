<template>
    <section>
        <div class="container" v-if="!loading">
            <SectionHeader :title="book.title" :text="book.author" />
            <font-awesome-icon icon="arrow-left" size="2xl" class="mb-2 cursor-pointer" @click="goToBackBooks" />
            <!-- <font-awesome-icon icon="arrow-left" @click="$router.go(-1)" /> -->
            <!-- <button>Back</button> -->
            <div class="row mb-4">
                <div class="col-lg-6">
                    <img class="card-img-top" src="../../template/images/b_detail.jpg" alt="Book Image"></img>
                </div>
                <div class="col-lg-6 details-wrapper">
                    <p class="lead description">{{ book.description }}
                    </p>
                    <div class="mb-4">
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Page</strong></div>
                            <div class="col-lg-6">{{ book.pageNumber }}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Category</strong></div>
                            <div class="col-lg-6">Fiction</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Rating</strong></div>
                            <div class="col-lg-6">{{formattedRating }}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Upload Date</strong></div>
                            <div class="col-lg-6"> {{ book.updatedAt }}</div>
                        </div>
                    </div>

                    <div class="comments-section">
                        <h3 class="display-6 mb-2">Comments</h3>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
                                    expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
                                    expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
                                    expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
                                    expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
                                    expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error,
                                    expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <p>Book Detail Loading....</p>
        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
export default {
    name: "BookDetailView",
    components: {
        SectionHeader
    },
    data() {
        return {
            book: null,
            loading : true
        }
    },
    //created :metodu içerisinden routuerdaki id ye göre kitap bilgilerini alıp yansıtıyoruz.
    created() {
        this.fetchABook();
        /*routerdaki parametreyi alır
         {
path : '/books/:id',
//url için uniq identity yani tekil bir tanımlayıcı. detaysayfası için kullanılırç
name : "book-detail",
component : BookDetailView
},buradan gelir route.params.id
         */
        // const bookId = this.$route.params.id;
        // this.book = books.find(book => book.id === parseInt(bookId));

    },
    computed : {
        formattedRating() {
      // Eğer rating tam sayıysa ondalıklı hale getiriyoruz
      return Number.isInteger(this.book.rating) ? this.book.rating.toFixed(1) : this.book.rating;
    },
    },
    methods: {
        goToBackBooks() {
            this.$router.push({ name: "books" }); //router.push ile yönlendirme yapılır. name i books olan route a yönlendirme yapılır.


        },
        async fetchABook() {
            const bookId = this.$route.params.id;
            const response = await fetch(`http://localhost:4000/api/v1/books/${bookId}`);
            const data = await response.json();
            this.book = data;
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.details-wrapper {
    max-height: 740px;
    display: flex;
    flex-direction: column;
}

.comments-section {
    flex-grow: 1;
    overflow-y: auto;
}

.description {
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
}
</style>