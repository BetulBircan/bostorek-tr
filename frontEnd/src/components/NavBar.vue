<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
        <RouterLink class="navbar-brand" :to="{name:'home'}">{{isUpperCase ? brandName.toUpperCase() : brandName}}</RouterLink>
        <ul class="navbar-nav">
            <li class="nav-item">
                <RouterLink class="nav-link" :to="{name : 'home'}">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" :to="{name : 'books'}">Books</RouterLink>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
                <RouterLink class="nav-link" :to="{name : 'dashboard'}">Dashboard</RouterLink>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
                <RouterLink class="nav-link" :to="{name : 'login'}">Login</RouterLink>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
                <RouterLink class="nav-link" :to="{name : 'register'}">Register</RouterLink>
            </li>
        </ul>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { mapState } from 'pinia';

    export default {
        name : 'NavBar',
        data() {
            return {
                brandName : "Bostorek",
                // isUpperCase : true,
                isUpperCase : false

            }
        },
        computed : {
            ...mapState(useAuthStore, ["isLoggedIn"])
        }
    }
</script>

<style scoped>
.custom-nav {
    background-color: var(--primary-color);
    /*sağdan soldan 15px iç boşluk yukafıdan aşağıya 0px boşluk */
    padding: 15px 0px; 
}

.navbar-brand {
    padding : 0;
    margin : 0;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

.nav-link {
    padding: 10px 15px !important;
    color: #fff;
    text-align: center;
}

.nav-link:hover {
    color: var(--secondary-color)
}

.active-link {
    color : var(--secondary-color);
}
</style>