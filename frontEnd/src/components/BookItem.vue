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
                <p style="background-color: var(--primary-color);" class="py-1 px-2 text-white badge mb-0">{{ book.updatedAt }}</p>
            </div>
        </div>
        <span
        :class="ratingBadgeClass"
            class="position-absolute top-0 start-100 translate-middle p-2 text-light rounded-circle border border-2 border-light">{{ formattedRating}}</span>
    </div>
</template>

<script>
// import books from '@/db';

export default {
    name: "BookItem",
    props : {
        book : {
            type : Object,
            default : () => ({})
        }
    },
    computed : {
        ratingBadgeClass() {
            if(this.book.rating > 7) {
                return 'bg-success';
            }
            else if(this.book.rating > 4) {
                return 'bg-warning';
            }
            else {
                return 'bg-danger';

            }
        },
        formattedRating() {
      // Eğer rating tam sayıysa ondalıklı hale getiriyoruz
      return Number.isInteger(this.book.rating) ? this.book.rating.toFixed(1) : this.book.rating;
    },
       truncatedDescription() {
          if(this.book.description.length > 80) {
                return this.book.description.slice(0, 80) + '...';
            }
            else {
                return this.book.description;
          }
       }
    }
}
</script>

<style scoped>
.card-text {
   min-height: 70px;
}
</style>