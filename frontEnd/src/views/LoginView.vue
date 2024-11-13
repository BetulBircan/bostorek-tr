<template>
    <section class="full-section-height">
        <div class="container">
            <!-- <form class="mt-5" @submit="submitForm"> -->
            <form @submit.prevent="submitForm">
                <!-- submit.prevent diyerek submit edildiğinde sayfa yenilenme işlemi yapmaz. -->


                <div class="row justify-content-center">
                    <!-- Email Field (Medium and Larger Screens) -->
                    <div class="col-md-6 col-8 mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email" v-model.trim="formData.email"
                            required>
                    </div>
                </div>

                <!-- Password Field -->
                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password"
                            v-model.trim="formData.password" required>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="row justify-content-center">
                    <div class="col-md-6 col-8 mb-3">
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { mapActions } from 'pinia';
export default {
    name: 'LoginView',
    data() {
            return {
                formData : {
                    email : "",
                    password : "",
                }
            }
        },
        methods : {
            ...mapActions(useAuthStore, ["login"]),
            async submitForm() {
                try {
                    await this.login(this.formData);
                    this.$router.push('/dashboard');
                    //console.log("LOGİN SUCCESSFULL");
                } catch (error) {
                    console.log("LOGİN FAİLED : ", error);
                    
                }
                
                
                //console.log("LOGİN FORM DATA : ", this.formData,);
            }
        }
}
</script>

<style lang="scss" scoped></style>