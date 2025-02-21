<template>
    <section>
        <CarouselWidget :items="carouselItems" height="400px"></CarouselWidget>
    </section>
    <section class="my-5">
        <div class="container">
            <SectionHeader title="Featured Books"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, beatae cumque nisi laborum harum ipsam!" />
            <div class="row">
                <!-- List Group -->
                <div class="col-md-4">
                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action"
                            :class="{ active: selectedFilter === 'latest' }" @click="selectFilter('latest')">
                            Latest Books
                        </button>
                        <button type="button" class="list-group-item list-group-item-action"
                            :class="{ active: selectedFilter === 'best' }" @click="selectFilter('best')">
                            Best Ratings
                        </button>
                    </div>
                </div>
                <!-- Accordion -->
                <div class="col-md-8">
                    <div v-if="isLoading" class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else class="accordion">
                        <p style="display: none;">Açık olan indeks: {{ openAccordionIndex }}</p>
                        <!-- <p>Açık olan indeks: {{ openAccordionIndex }}</p> -->
                        <div class="accordion-item" v-for="(book, index) in filteredBooks" :key="index">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button"
                                    :class="{ collapsed: openAccordionIndex !== index }"
                                    @click="toggleAccordion(index)">
                                    <strong>{{ book.title }} - {{ book.author }}</strong>
                                </button>
                            </h2>
                            <div class="accordion-collapse collapse"
                                :class="{ show: openAccordionIndex === index }">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <img src="../assets/images/b1.jpg" class="img-fluid">
                                        </div>
                                        <div class="col-md-8 d-flex flex-column justify-content-center">
                                            <p>{{ book.description }}</p>
                                            <div class="badge align-self-start"
                                                style="background-color: var(--secondary-color);">
                                                {{ formattedRating(book.rating) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5" style="background-color: #f5f6f9;">
        <div class="container">
            <SectionHeader title="Latest Comments"
                text="We declare long prop names using camelCase bexause tihis awoids" />
            <div class="row flex justify-content-center">
                <div class="col-md-6" v-for="(comment) in prepared4Comments" :key="comment._id">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex flex-start align-items-center">
                                <img class="rounded-circle shadow-1-strong me-3" src="../assets/images/c1.jpg"
                                    alt="avatar" width="60" height="60" />
                                <div>
                                    <h6 class="fw-6 text-primary mb-1">{{ comment.title }}</h6>
                                    <p class="text-muted small mb-0">{{ comment.postedBy.username }} - {{ formatDate(comment.createdAt) }}</p>
                                </div>
                            </div>

                            <p class="mt-3 mb-4 pb-2">
                                {{ comment.content }}
                            </p>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </section>
    <!-- directive örneği -->
    <!-- <img :src="imageSrc" :alt="imageAlt"> -->

    <!-- <RouterLink :to="url" :style="{fontSize : size + 'px'}">Books</RouterLink>  -->
    <!-- JAVASCRİPT ŞEKLİNDE TANIMLARKEN STYLE KISMINDA CAMEL CASE TANIMLANIR. -->
</template>

<script setup>
import hero_1 from '@/assets/images/hero_1.jpg';
import hero_2 from '@/assets/images/hero_2.jpg';
import hero_3 from '@/assets/images/hero_3.jpg';
import SectionHeader from '@/components/SectionHeader.vue';
import { useBookStore } from '@/stores/bookStore';
import { useCommentStore } from '@/stores/commentStore';
import CarouselWidget from '@/components/widgets/CarouselWidget.vue';
import { computed, ref, nextTick  } from 'vue';

const carouselItems = [
    { imageUrl: hero_1, subtitle: 'Liberte', title: 'Lorem Ipsum Dolor Sit Amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { imageUrl: hero_2, subtitle: 'Egalite', title: 'Excepteur Sint Occaecat Cupidatat', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { imageUrl: hero_3, subtitle: 'Fraternite', title: 'Neque Porro Quisquam Est', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' }
];

const bookStore = useBookStore();
const commentStore = useCommentStore();
const selectedFilter = ref('latest');
const openAccordionIndex = ref(0); // Başlangıçta kapalı

const selectFilter = (filter) => {
    selectedFilter.value = filter;
}

const toggleAccordion = async (index) => {
    openAccordionIndex.value = openAccordionIndex.value === index ? -1 : index;
    await nextTick(); // DOM'un güncellenmesini bekle
    console.log('Toggled accordion index:', openAccordionIndex.value);
};

const formattedRating = (rating) => {
    return Number.isInteger(rating) ? rating.toFixed(1) : rating;
}

const filteredBooks = computed(() => {
    if (selectedFilter.value === 'latest') {
        return bookStore.latest4Books;
    } else if (selectedFilter.value === 'best') {
        return bookStore.bestRatings4Books;
    }
});

const prepared4Comments = computed(() => {
    const latest4Comments = commentStore.comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

    return latest4Comments.map(comment => {
        const correspondingBook = bookStore.books.find((book) => book._id === comment.book);
        if (correspondingBook) {
            return { ...comment, title: correspondingBook.title };
        }
        return comment;
    });
});

const isLoading = computed(() => bookStore.isLoading);

const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = padZero(dateObj.getDate());
  const month = padZero(dateObj.getMonth() + 1);
  const year = dateObj.getFullYear();
  
  return `${day}.${month}.${year} `;
};
const padZero = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

</script>
<!-- <script>

//import CarouselWidget from '@/components/widgets/CarouselWidget.vue';
import hero_1 from '@/assets/images/hero_1.jpg';
import hero_2 from '@/assets/images/hero_2.jpg';
import hero_3 from '@/assets/images/hero_3.jpg';
import SectionHeader from '@/components/SectionHeader.vue';
import { useBookStore } from '@/stores/bookStore';
import { useCommentStore } from '@/stores/commentStore';
import { mapState, mapActions } from 'pinia';
import LoadingSpinner from '@/components/widgets/SpinnerWidget.vue';
import CarouselWidget from '@/components/widgets/CarouselWidget.vue';
//import books from '@/db';

export default {
    name: 'HomeView',
    components: {
        CarouselWidget,
        SectionHeader,
        LoadingSpinner
    },
    data() {
        return {
            carouselItems: [
                { imageUrl: hero_1, subtitle: 'Liberte', title: 'Lorem Ipsum Dolor Sit Amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { imageUrl: hero_2, subtitle: 'Egalite', title: 'Excepteur Sint Occaecat Cupidatat', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { imageUrl: hero_3, subtitle: 'Fraternite', title: 'Neque Porro Quisquam Est', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' }
            ],
            // books: [],
            bookStore: useBookStore(),
            selectedFilter: 'latest',
            openAccordionIndex: 0,
            //    imageSrc : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Tn86tojVvJkJ5f7vRa16CTtrSaMUgBBbYQ&s" ,
            //    imageAlt : "DUMAN",
            //    url : "/books",
            //    size : 50

        }
    },

    //nain.js de uygulama başlamadan önce veriler gelsiği için gerek kalmadı
    // created() {
    //     this.fetchBooks();
    // },

    methods: {
        // ...mapActions(useBookStore, ['fetchBooks']), //store dan books state ini çekiyoruz fakat mainçjs de yapıypruz zaten bunu
        selectFilter(filter) {
            this.selectedFilter = filter;
        },

        toggleAccordion(index) {
            if (this.openAccordionIndex === index) {
                this.openAccordionIndex = -1;
            } else {
                this.openAccordionIndex = index;
            }
        },
        formattedRating(rating) {
            // Eğer rating tam sayıysa ondalıklı hale getiriyoruz
            return Number.isInteger(rating) ? rating.toFixed(1) : rating;
        },
    },
    computed: {
        ...mapState(useBookStore, ['books', 'isLoading', 'latest4Books', 'bestRatings4Books']), //store dan books state ini çekiyoruz  
        ...mapState(useCommentStore, ['comments']), //store dan comments state ini çekiyoruz
        filteredBooks() {
            //const copiedBooks = [...this.books];
            if (this.selectedFilter === 'latest') {
                return this.latest4Books //en yeni kitaplar en başta olacak şekilde sıralıyoruz
            } else if (this.selectedFilter === 'best') {
                return this.bestRatings4Books //en yüksek ratinge sahip kitaplar en başta olacak şekilde sıralıyoruz
                
            }
        },

        prepared4Comments() {
            const latest4Comments = this.comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4);

            return latest4Comments.map(comment => {
                const correspondingBook = this.books.find((book) => book._id === comment.book);
                if(correspondingBook) {
                    return {
                    ...comment,
                    title : correspondingBook.title
                    
                    }   
                }

                return comment;
               
            });
        }

    }
}
</script> -->

<style scoped>
.list-group-item.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.accordion-button {
    color: var(--primary-color);
}

.accordion-button:not(.collapsed) {
    background-color: var(--secondary-color);
    color: #ffffff;
}

.accordion-button:focus {
    outline: none;
    box-shadow: none;
}
</style>