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
                                <div class="col-lg-6">{{ averageRating }} - ({{ ratingCount }} rates)</div>
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
                        <div v-if="isLoggedIn">
                            <div v-if="!isUserAlreadyRated">
                                <h3 style="color:var(--primary-color)">Rate The Book</h3>
                                <form @submit.prevent="addRate">
                                    <!-- Rating Input -->
                                    <div class="mb-3">
                                        <input type="number" id="rating" class="form-control w-50" min="1" max="10" placeholder="Rate (1-10)" v-model="userRate" required/>
                                    </div>

                                    <!-- Submit Button -->
                                    <button type="submit" class="btn btn-primary">Rate</button>
                                </form>
                            </div>
                            <div v-else>
                                Your rate : {{ userRating }}
                            </div>
                        </div>

                        <router-link v-else to="/login">
                            <p style="color: var(--secondary-color);">Log in to leave a rate the book</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <hr v-if="isLoggedIn" />
            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="box" >
                        <div v-if="isLoggedIn">
                            <h3 style="color:var(--primary-color)">Comment The Book</h3>
                            <form @submit.prevent = "addComment">
                                <!-- Comment Text Area -->
                                <div class="mb-3">
                                    <textarea id="comment" class="form-control" rows="4" placeholder="Enter your comment" required v-model="commentContent"></textarea>
                                </div>
                                <!-- Submit Button -->
                                <button type="submit" class="btn btn-primary">Comment</button>
                             </form>
                        </div>

                        <router-link v-else to="/login">
                            <p style="color: var(--secondary-color);">Log in to leave a comment</p>
                        </router-link>
                       
                    </div>
                </div>
            </div>
            <hr />
            <div class="row my-3">
                <div class="col-md-12">
                    <div class="box">
                        <h3 style="color:var(--primary-color)">Comments</h3>
                        <div>
                            <div class="card mb-4" v-for="comment in commentsForBook" :key="comment._id">
                                <div class="card-body">
                                    <p>{{ comment.content }}</p>
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <p class="small mb-0 ms-2">{{ comment.postedBy.username }}</p>
                                        </div>
                                        <div class="d-flex flex-row align-items-center" style="gap:10px">
                                            <div v-if="!user" class="d-flex flex-row align-items-center" style="gap : 10px">
                                                <router-link  to="/login">
                                                    <p class="small mb-0" style="color: var(--secondary-color);">Log in for upvote !</p>
                                                </router-link>
                                                <font-awesome-icon :icon="['fas', 'thumbs-up']" style="color:var(--secondary-color)"/>
                                            </div>
                                            
                                            <div v-else-if="!comment.upvotes.includes(user._id) && comment.postedBy._id !== user._id " 
                                            class="d-flex flex-row align-items-center" 
                                            style="gap:10px; cursor: pointer; " @click="upvote(comment._id)">
                                                <p class="small mb-0">Upvote?</p>
                                                <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                            </div>
                                            
                                            <div v-else-if="comment.upvotes.includes(user._id) && comment.postedBy._id !== user._id " 
                                            class="d-flex flex-row align-items-center" 
                                            style="gap:10px; cursor: pointer; " @click="downvote(comment._id)">
                                                <p class="small mb-0">Upvoted</p>
                                                <font-awesome-icon :icon="['fas', 'thumbs-up']" style="color: var(--secondary-color)"/>
                                            </div>
                                            
                                            <div v-else class="d-flex flex-row align-items-center" style="gap : 10px">
                                                <p class="small mb-0">You can't upvote for your comment</p>
                                                <font-awesome-icon :icon="['fas', 'thumbs-up']" style="color: var(--secondary-color);"/>
                                            </div>

                                            <p class="small text-muted mb-0">{{ comment.upvotes.length }}</p>

                                            <!-- 
                                            <p class="small text-muted mb-0">Upvote?</p>
                                            <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                            <p class="small text-muted mb-0">3</p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="card mb-4">
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
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            
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
import { useAuthStore } from '@/stores/authStore';
import { useCommentStore } from '@/stores/commentStore';
import { useRatingStore } from '@/stores/ratingStore';
import { mapState, mapActions } from 'pinia';
export default {
    name: "BookDetailView",
    components: {
        SectionHeader,
        SpinnerWidget
    },
    data() {
        return {
            book: null,
            loading : true,
            commentContent : "",
            userRate : null
        }
    },
    //created :metodu içerisinden routuerdaki id ye göre kitap bilgilerini alıp yansıtıyoruz.
    created() {
        this.selectBook();
        this.fetchCommentsForBook(this.$route.params.id);
        this.fetchRatingsForBook(this.$route.params.id);
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
        ...mapState(useBookStore, ['selectedBooks']),
        ...mapState(useAuthStore, ['user', 'isLoggedIn']),
        ...mapState(useCommentStore, ['commentsForBook']),
        ...mapState(useRatingStore, ['ratingsForBook']),

        //verilen oyların ortalamasını alır
        averageRating() {
            if(this.ratingsForBook && this.ratingsForBook.length > 0) {
                                                        //reduce fonksiyonu ile array içerisindeki değerleri toplarız
                const totalRating = this.ratingsForBook.reduce((sum, rating) => sum + rating.rate, 0);
                return (totalRating / this.ratingsForBook.length).toFixed(1);

            }
            else {
                return 0;
            }
        },

        ratingCount() {
            return this.ratingsForBook ?  this.ratingsForBook.length : 0;
        },

        //kullanıcı daha önce oylama yapmış mı kontrol eder
        isUserAlreadyRated() {
            if(!this.user) {
                return false;
            }

            else if(this.ratingsForBook && this.ratingsForBook.length > 0) {
                return this.ratingsForBook.some(rating => rating.ratedBy._id === this.user._id);
            }

        },

        //kullanıcının verdiği oyu alır
        userRating() {
            if(this.ratingsForBook) {
                const userRatingObj = this.ratingsForBook.find(rating => rating.ratedBy._id === this.user._id);

            return userRatingObj ? userRatingObj.rate : null;
            }
            
        }
    },
    methods: {
        ...mapActions(useCommentStore, ['addNewComment', 'fetchCommentsForBook', 'upvoteComment', 'downvoteComment']),
        ...mapActions(useRatingStore, ['addNewRate', 'fetchRatingsForBook']),

        async upvote(commentId) {
            try {
                await this.upvoteComment(commentId);

                await this.fetchCommentsForBook(this.$route.params.id);
            } catch (error) {
                
            }
        },

        async downvote(commentId) {
            try {
                await this.downvoteComment(commentId);

                await this.fetchCommentsForBook(this.$route.params.id);
            } catch (error) {
                
            }
        },

        goToBackBooks() {
            this.$router.push({ name: "books" }); //router.push ile yönlendirme yapılır. name i books olan route a yönlendirme yapılır.
        },
        selectBook() {
            const bookId = this.$route.params.id;
            this.book = this.selectedBooks(bookId);
            this.loading = false;
        },

        async addComment() {
          try {

            const bookId = this.$route.params.id;
            const content = this.commentContent;
            const userId = this.user._id;

            await this.addNewComment(
                {
                    bookId,
                    content,
                    userId,
                }
            )

            this.commentContent = "";
            await this.fetchCommentsForBook(this.$route.params.id);

          } catch (error) {
            console.log(error,"errorfront");
            
          }
        },

        async addRate() {
            try {
                const bookId = this.$route.params.id;
                const rate = this.userRate;
                const userId = this.user._id;

                await this.addNewRate(
                    {
                        rate,
                        bookId,
                        userId,
                    }
                )

                this.userRate = null;

                await this.fetchRatingsForBook(this.$route.params.id);
            } catch (error) {
                console.error(error);
            }
        }
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