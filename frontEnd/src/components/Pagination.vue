<template>
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end">
    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
      <a class="page-link" :click="handleClick" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item" :class="{ 'disabled' : currentPage === totalPages}">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true
            },        
        },
        // computed: {
        //     pages() {
        //         return Math.ceil(this.total / this.perPage);
        //     }
        // },
        // methods: {
        //     changePage(page) {
        //         this.$emit('page-changed', page);
        //     }
        // }
    }
</script>

<style lang="scss" scoped>

</style>