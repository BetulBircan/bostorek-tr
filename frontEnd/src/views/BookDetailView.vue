<template>
    <section>
        <div class="container" v-if="!loading">
            <SectionHeader :title="book.title" :text="book.author" />
            <div class="d-flex">
                <font-awesome-icon icon="arrow-left" size="xl" class="mb-2" style="cursor:pointer;color:var(--secondary-color)" @click="goToBackBooks" />
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="image-box">
                        <img class="img-fluid" src="../../template/images/b_detail.jpg" alt="">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="d-flex flex-column h-100 justify-content-between">
                        <div class="mb-3">
                            <p>{{ book.description }}</p>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6"><strong>Page</strong></div>
                                <div class="col-lg-6">{{ book.pageNumber }}</div>
                            </div>
                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6"><strong>Rating</strong></div>
                                <div class="col-lg-6">8.2 - (23 rates)</div>
                            </div>
                            <div class="row border-bottom pb-2">
                                <div class="col-lg-6"><strong>Upload Date</strong></div>
                                <div class="col-lg-6">{{ book.updatedAt }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="box">
                        <h3 style="color:var(--primary-color)">Rate The Book</h3>
                        <form>
                            <!-- Rating Input -->
                             <div class="mb-3">
                                <input type="number" id="rating" class="form-control w-50" min="1" max="10" placeholder="Rate (1-10)" required/>
                             </div>

                             <!-- Submit Button -->
                              <button type="submit" class="btn btn-primary">Rate</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="box">
                        <h3 style="color:var(--primary-color)">Comment The Book</h3>
                        <form>
                            <!-- Comment Text Area -->
                             <div class="mb-3">
                                <textarea id="comment" class="form-control" rows="4" placeholder="Enter your comment" required></textarea>
                             </div>
                             <!-- Submit Button -->
                              <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row my-3">
                <div class="col-md-12">
                    <div class="box">
                        <h3 style="color:var(--primary-color)">Comments</h3>
                        <div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui ea eveniet dolores cumque asperiores placeat sunt in quasi delectus odio, nobis quod ullam corporis sit quisquam quaerat quidem, quia odit?
                                    Autem quaerat nesciunt, minima similique earum quasi tenetur blanditiis, asperiores officiis rem itaque deserunt et ea, fuga suscipit accusamus aut quis aperiam molestias ab aliquam quos totam culpa! Consectetur, nihil!
                                    Recusandae magni doloremque repellendus harum cupiditate, error non molestiae possimus ipsam deserunt doloribus beatae tempora pariatur quae reprehenderit odit facilis? Unde quas, distinctio est vitae dolor aliquid illum hic exercitationem.
                                    Hic beatae obcaecati illo aperiam necessitatibus nobis, quaerat voluptate, voluptates at perspiciatis ratione exercitationem voluptatum harum consequuntur quam repudiandae! Animi deleniti officiis sequi culpa commodi doloribus blanditiis, quisquam dicta nisi.
                                    Modi, atque? Itaque fugiat eius quod pariatur quam exercitationem repellat? Deserunt vitae minima numquam perspiciatis? Earum quae dolores ipsam eaque aspernatur, quia aut, iusto ipsum, dicta eum nisi nam quasi.</p>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <p class="small mb-0 ms-2">Username</p>
                                        </div>
                                        <div class="d-flex flex-row align-items-center" style="gap:10px">
                                            <p class="small text-muted mb-0">Upvote?</p>
                                            <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                            <p class="small text-muted mb-0">3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card mb-4">
                                <div class="card-body">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum blanditiis nihil quibusdam quos voluptates, ipsum earum. Laudantium mollitia culpa nemo dolor labore laboriosam iste velit ullam autem rerum, placeat necessitatibus.
                                    Dicta, dolorum neque ipsum soluta placeat quas est alias, velit expedita eveniet nostrum quos id nulla fugiat eum excepturi. Voluptates temporibus, odio laborum perspiciatis natus aspernatur provident earum at et?
                                    Voluptas obcaecati dolore dignissimos ipsum ullam asperiores modi quisquam eveniet dolores dolorum in repellendus recusandae nostrum, cupiditate assumenda aliquid ipsam tempore vitae quia? Sit sequi inventore earum, facilis nesciunt magnam.
                                    Hic reprehenderit officia ab animi pariatur veniam necessitatibus perferendis nemo sit rerum, quod repellat laborum. Quaerat laboriosam fuga iste maxime architecto excepturi fugit? Necessitatibus hic numquam voluptatem ex suscipit quae.
                                    Veritatis quod odit consequatur deserunt nemo! Facere eum odio sed laudantium, voluptate rem velit necessitatibus aperiam porro voluptatem harum totam dolores quia consequatur, cumque unde a praesentium ipsam alias quis.</p>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex justify-content-between">
                                            <p class="small mb-0 ms-2">Username</p>
                                        </div>
                                        <div class="d-flex justify-content-between" style="gap:10px">
                                            <p class="small text-muted mb-0">Upvote?</p>
                                            <font-awesome-icon :icon="['fas', 'thumbs-up']" style="color: var(--secondary-color)"/>
                                            <p class="small text-muted mb-0">4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="row mb-4">
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
            </div> -->
        </div>
        <div class="container" v-else>
            <SpinnerWidget />
        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import SpinnerWidget from '@/components/widgets/SpinnerWidget.vue';
import { useBookStore } from '@/stores/bookStore';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { mapState } from 'pinia';
export default {
    name: "BookDetailView",
    components: {
        SectionHeader,
        SpinnerWidget
    },
    data() {
        return {
            book: null,
            loading : true
        }
    },
    //created :metodu içerisinden routuerdaki id ye göre kitap bilgilerini alıp yansıtıyoruz.
    created() {
        this.selectBook();
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
        selectBook() {
            const bookId = this.$route.params.id;
            this.book = this.selectedBooks(bookId);
            this.loading = false;
        },
        // async fetchABook() {
        //     const bookId = this.$route.params.id;
        //     const response = await fetch(`http://localhost:4000/api/v1/books/${bookId}`);
        //     const data = await response.json();
        //     this.book = data;
        //     this.loading = false;
        // }
    },
    computed: {
        ...mapState(useBookStore, ['selectedBooks']),
    },
}
</script>

<style scoped>
.image-box {
    height: 300px;
    overflow: hidden;
}

.image-box img {
    width: 100% !important;
}

.btn-primary {
    height: 36px;
    min-width: 120px;
    border-radius: 16px;
}

.box {
    border:1px solid #e2e3e5;
    border-radius: 10px;
    padding: 20px;
}
</style>