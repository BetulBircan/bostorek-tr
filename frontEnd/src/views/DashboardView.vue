<template>
  <h1>{{ user.username }}</h1>
  <h2>{{ user.email }}</h2>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';
    export default {
        name : 'DashboardView',
        computed : {
            ...mapState(useAuthStore, ["user"])
        }
    }
</script>

<style scoped>

</style>