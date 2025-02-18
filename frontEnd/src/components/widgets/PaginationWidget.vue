<template>
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end">
    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
      <a class="page-link" @click="goToPage(currentPage - 1)"  aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="page in totalPages" :class="{'active': currentPage === page}" :key="page" class="page-item cursor-pointer"><a class="page-link" @click="goToPage(page)">{{ page }}</a></li>
    <li class="page-item" :class="{ 'disabled' : currentPage === totalPages}">
      <!-- <a class="page-link" v-on:click="handleClick" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a> -->
      <!-- Parametreli fonksiyon
       <a class="page-link" v-on:click="handleClick('Betül')" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
        -->
        <a class="page-link" @click="goToPage(currentPage + 1)"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
      
    </li>
  </ul>
</nav>
</template>

<script setup>

//defineProps u import etmemize gerek yok
const props = defineProps({
  currentPage : {
    type : Number,
    required : true
  },
  totalPages : {
    type : Number,
    required : true
  }
})

//defineEmits i import etmemize gerek
const emits = defineEmits(['page-changed'])

const goToPage = (page) => {
  emits('page-changed', page)
}

</script>



<style lang="scss" scoped>

</style>