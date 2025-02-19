<template>
    <div class="card border-0 shadow position-relative">
        <img src="../../template/images/b1.jpg" class="card-img-top">
        <div class="card-body">
            <div class="auth-box">
                <span style="background-color: var(--primary-color)" class="py-1 px-3 text-white rounded-pill">{{ book.author }}</span>
            </div>
            <h5 class="card-title mt-3 fw-semibold">{{ book.title }}</h5>
            <p class="card-text">{{ truncatedDescription }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <a href="#" class="card-link">Read More</a>
                <p style="background-color: var(--primary-color);" class="py-1 px-2 text-white badge mb-0">{{ book.createdAt }}</p>
            </div>
        </div>
        <span
        :class="ratingBadgeClass"
            class="position-absolute top-0 start-100 translate-middle p-2 text-light rounded-circle border border-2 border-light custom-center">{{ averageRating}}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    book: {
        type: Object,
        default: () => ({})
    }
})

const averageRating = computed(() => {
    if (props.book.ratings && props.book.ratings.length > 0) {
        const totalRating = props.book.ratings.reduce((sum, rating) => sum + rating.rate, 0);

        return (totalRating / props.book.ratings.length).toFixed(1);
    } else {
        return '-';
    }
})

const ratingBadgeClass = computed(() => {
    if (averageRating.value > 7) {
        return 'bg-success';
    } else if (averageRating.value > 4 || averageRating.value === '-') {
        return 'bg-warning';
    } else {
        return 'bg-danger';
    }
})

const truncatedDescription = computed(() => {
    if (props.book.description.length > 80) {
        return props.book.description.slice(0, 80) + '...';
    } else {
        return props.book.description;
    }
})
</script>



<style scoped>
.card-text {
   min-height: 70px;
}

.custom-center {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>