<template>
    <section>
        <div class="container">
            <SectionHeader :title="book.name"
                :text="book.author" />
            <button>Back</button>
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
                            <div class="col-lg-6">{{ book.page}}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Category</strong></div>
                            <div class="col-lg-6">Fiction</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Rating</strong></div>
                            <div class="col-lg-6">{{ book.rating }}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Upload Date</strong></div>
                            <div class="col-lg-6"> {{ book.uploadDate }}</div>
                        </div>
                    </div>
                    
                    <div class="comments-section">
                       <h3 class="display-6 mb-2">Comments</h3>
                       <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <p>Upvote</p>
                                        <p class="ps-2" ><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <p>Upvote</p>
                                        <p class="ps-2" ><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <p>Upvote</p>
                                        <p class="ps-2" ><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <p>Upvote</p>
                                        <p class="ps-2" ><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <p>Upvote</p>
                                        <p class="ps-2" ><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div class="card mb-4">
                            <div class="card-body">
                                <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, expedita.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <p>Upvote</p>
                                        <p class="ps-2" ><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import books from '@/db.js';
export default {
    name: "BookDetailView",
    components: {
        SectionHeader
    },
    data() 
    {
        return {
            book : null
        }
    },
    //created :metodu içerisinden routuerdaki id ye göre kitap bilgilerini alıp yansıtıyoruz.
    created() {
                        /*routerdaki parametreyi alır
                         {
            path : '/books/:id',
            //url için uniq identity yani tekil bir tanımlayıcı. detaysayfası için kullanılırç
            name : "book-detail",
            component : BookDetailView
        },buradan gelir route.params.id
                         */
        const bookId = this.$route.params.id;
        this.book = books.find(book => book.id === parseInt(bookId));
        console.log(this.book,"book");
        
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
    flex-grow:1;
    overflow-y: auto;
}

.description {
    min-height: 150px;
    max-height : 250px;
    overflow-y: auto;
}
</style>