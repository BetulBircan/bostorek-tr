<template>
    <section>
        <Carousel :items="carouselItems" height="400px"></Carousel>
    </section>
    <section class="my-5">
        <div class="container">
            <SectionHeader title="Featured Books"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, beatae cumque nisi laborum harum ipsam!" />
            <div class="row">
                <!-- List Group -->
                <div class="col-md-4">
                    <div class="list-group">
                        <button type="button" 
                        class="list-group-item list-group-item-action" :class="{active: selectedFilter === 'latest'}"
                        @click="selectFilter('latest')"
                        >
                            Latest Books
                        </button>
                        <button 
                        type="button" class="list-group-item list-group-item-action" :class="{active: selectedFilter === 'best'}"
                         @click="selectFilter('best')"
                        >
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
                        <div class="accordion-item" v-for="(book,index) in filteredBooks" :key="index">
                            <h2 class="accordion-header">
                                <button 
                                    class="accordion-button" type="button"
                                    :class="{collapsed : openAccordionIndex !== index}"
                                    @click="toggleAccordion(index)"
                                    >
                                   <strong>{{ book.title }} - {{ book.author }}</strong>
                                </button>
                            </h2>
                            <div 
                            class="accordion-collapse collapse "
                            :class="{show : openAccordionIndex === index}"
                            >
                                <div class="accordion-body">
                                   <div class="row">
                                    <div class="col-md-4">
                                        <img src="../assets/images/b1.jpg" class="img-fluid">
                                    </div>
                                    <div class="col-md-8 d-flex flex-column justify-content-center">
                                        <p>{{ book.description }}</p>
                                        <div class="badge align-self-start" style="background-color: var(--secondary-color);">
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
    <!-- directive örneği -->
    <!-- <img :src="imageSrc" :alt="imageAlt"> -->

    <!-- <RouterLink :to="url" :style="{fontSize : size + 'px'}">Books</RouterLink>  -->
    <!-- JAVASCRİPT ŞEKLİNDE TANIMLARKEN STYLE KISMINDA CAMEL CASE TANIMLANIR. -->
</template>

<script>

import Carousel from '@/components/widgets/Carousel.vue';
import hero_1 from '@/assets/images/hero_1.jpg';
import hero_2 from '@/assets/images/hero_2.jpg';
import hero_3 from '@/assets/images/hero_3.jpg';
import SectionHeader from '@/components/SectionHeader.vue';
import { useBookStore } from '@/stores/bookStore';
import { mapState, mapActions } from 'pinia';
//import books from '@/db';

export default {
    name: 'HomeView',
    components: {
        Carousel,
        SectionHeader
    },
    data() {
        return {
            carouselItems: [
                { imageUrl: hero_1, subtitle: 'Liberte', title: 'Lorem Ipsum Dolor Sit Amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { imageUrl: hero_2, subtitle: 'Egalite', title: 'Excepteur Sint Occaecat Cupidatat', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { imageUrl: hero_3, subtitle: 'Fraternite', title: 'Neque Porro Quisquam Est', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.' }
            ],
            // books: [],
            bookStore : useBookStore(),
            selectedFilter: 'latest',
            openAccordionIndex : 0,
            //    imageSrc : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Tn86tojVvJkJ5f7vRa16CTtrSaMUgBBbYQ&s" ,
            //    imageAlt : "DUMAN",
            //    url : "/books",
            //    size : 50

        }
    },

    created() {
        this.fetchBooks();
    },

    methods : {
        ...mapActions(useBookStore, ['fetchBooks']),
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
    computed : {
        ...mapState(useBookStore, ['books','isLoading']), //store dan books state ini çekiyoruz  
        filteredBooks() {
            const copiedBooks = [...this.books];
            if (this.selectedFilter === 'latest') {
                return copiedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,4); //en yeni kitaplar en başta olacak şekilde sıralıyoruz
            } else if (this.selectedFilter === 'best') {
                return copiedBooks.sort((a, b) => b.rating - a.rating).slice(0,4); //en yüksek ratinge sahip kitaplar en başta olacak şekilde sıralıyoruz
            }   
        },
       
    }
}
</script>

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