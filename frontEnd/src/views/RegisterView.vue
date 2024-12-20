<template>
   <section class="full-section-height">
    <div class="container" >
      <div class="d-flex justify-content-center ">
        <h1 class="display-3">Register</h1>
      </div>
        <!-- <form class="mt-5" @submit="submitForm"> -->
            <form  @submit.prevent="submitForm">   <!-- submit.prevent diyerek submit edildiğinde sayfa yenilenme işlemi yapmaz. -->
              <div class="text-center">
                <span v-if="showGenericWarningMessage" class="text-danger small">
                  Something happened, please try again later!
                </span>
            </div>
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">

                <!-- for=username aynı name e sahip  field ına ait olduğunu gösterir. input elementindeki is ile
                 labeldaki for birbiryle örtüşür.-->
              <label for="username" class="form-label">Username
                <span class="text-danger">*</span>
              </label>

              <!-- 
              type="input un tipi text",
              class="form-control" bootstrapin input elementine verilen bir class
                id="username" input elementinin id'si uniq bir tanimlayici
                name=örneğin formu doldurup gönderdiğimizde hangi input alanını doldurduğumuzu gösterir.
                required=bu input alanının zorunlu  bir alan olduğunu gösterir.
                value=bu input alanının varsayılan değerini belirler.inputta gösterilecek alan
                @input eventi : input alanına herhangi bir değer girildiğinde tetiklenir.
                template kısmında kullnırken parametre almasa bile vue nun sağladığı kısayol sayesinde tarayıcıda otomatik olarak event parametresini alır.
              -->
              
              <!-- eğer input a hem event göndermek için $event olarak göndericez hem kendi parametremizi göndermek istersek  @input="updateUsername(10,$event) şeklinde kullanırız -->
              <!-- <input type="text" class="form-control" id="username" name="username" :value="formData.username" @input="updateUsername" required
                > Bu kullanıcının inputa girdiği değeri alması için uzun yol kullanılmış hali. kısaca v-model bind ını kullanabiliriz -->

              <input
              type="text" class="form-control" id="username" name="username" 
              v-model.trim="formData.username"  required autocomplete="off"
              :class="{
                'is-valid': isUsernameValid, 
                'is-invalid' : !isUsernameValid && showUsernameWarningMessage
                }"
                @focus="showUsernameWarningMessage = true"
                @blur="showUsernameWarningMessage = false"
              />
              <span v-if="showUsernameWarningMessage && !isUsernameValid" class="text-danger small">Username must be between 5 and 20 characters!</span>
            </div>
          </div>
          <div class="row justify-content-center">
            <!-- Email Field (Medium and Larger Screens) -->
            <div class="col-md-6 col-8 mb-3">
              <label for="email" class="form-label">Email
                <span class="text-danger">*</span>
              </label>
              <input
              type="email" class="form-control" id="email" name="email" 
              v-model.trim="formData.email" required autocomplete="off"
              :class="{
                'is-valid' : isEmailValid,
                'is-invalid' : !isEmailValid && showEmailWarningMessage || existingEmail === formData.email
                }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
              />
              <span v-if="showEmailWarningMessage && !isEmailValid" class="text-danger small">Please provide a valid email!</span>
              <span v-if="existingEmail === formData.email" class="text-danger small">{{ `${existingEmail} is already exist!` }}</span>
            </div>
          </div>

          <!-- Password Field -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <label for="password" class="form-label">Password
                <span class="text-danger">*</span>
              </label>
              <input
              type="password" class="form-control" id="password" name="password" 
              v-model.trim="formData.password" required autocomplete="off"
              :class="{
                'is-valid' : isPasswordValid,
                'is-invalid' : !isPasswordValid && showPasswordWarningMessage
                }"

              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
              />
              <span v-if="showEmailWarningMessage && !isPasswordValid" class="text-danger small">
                Password must be between 4 and 10 characters!
              </span>
            </div>
          </div>

          <!-- Gender Field -->
          <!-- <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <h5>Gender</h5>
              <div class="form-check"> -->
                <!--
                 checked özellği radiobutton un seçili olup olmadığına bakar 
                 changed eventi : radiobutton seçildiğinde tetiklenir. hangi radiobutton seçildiğini anlamak için value attribute kullanılır.
                 v-model le hangi gender ı seçiyorsan o gelitirilir.
                  -->
                <!-- <input class="form-check-input" type="radio" name="gender" value='male' id="male" v-model="formData.gender" >
                <label class="form-check-label" for="male">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" value='female' id="female" v-model="formData.gender">
                <label class="form-check-label" for="female">
                  Female
                </label>
              </div>
            </div>
          </div> -->

          <!-- Age Field -->
          <!-- <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <label for="age" class="form-label">Age:</label> -->
              <!-- <input type="number" class="form-control" id="age" v-model="formData.age" required> -->
              <!-- <input class="form-control" id="age" v-model.number="formData.age" required>
            </div>
          </div> -->

          <!-- Programming Field -->
          <!-- <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <h5>Which Programming Language(s) you know?</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="java" id="java" v-model="formData.languages">
                <label class="form-check-label" for="java">
                  Java
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="c++" id="c++" v-model="formData.languages">
                <label class="form-check-label" for="c++">
                  C++
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="python" id="python" v-model="formData.languages">
                <label class="form-check-label" for="python">
                  Python
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="rust" id="rust" v-model="formData.languages">
                <label class="form-check-label" for="rust">
                  Rust
                </label>
              </div>
            </div>
          </div> -->

    
          <!-- Submit Button -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <button :disabled="!isFormValid" type="submit" class="btn btn-primary w-100">Register</button>
              <span v-if="!isFormValid" class="text-danger small">* Please complete all of the required fields!</span>
            </div>
          </div>
        </form>
    </div>
   </section>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { mapActions } from 'pinia';
import { useToast } from "vue-toastification";
    export default {
        name : "RegisterView",
        data() {
            return {
                formData : {
                    username : "",
                    email : "",
                    password : "",
                    // gender : "",
                    // age : null,
                    // languages : []
                    showUsernameWarningMessage : false,
                    showEmailWarningMessage : false,
                    showPasswordWarningMessage : false,
                    existingEmail : null,
                    showGenericWarningMessage : false
                }
            }
        },
        methods : {
            //burada event parametresi alıyoruz çünkü input alanına herhangi bir değer girildiğinde tetiklenir.
            //template kısmında kullnırken parametre almasa bile vue nun sağladığı kısayol sayesinde tarayıcıda otomatik olarak event parametresini alır.
            // updateUsername(event) {
            //     this.formData.username = event.target.value;
            //     console.log(event,"EVENT");
                
            // }
            //ayrıyetten hem kendi hem de event parametresini gönderdiğimiz hali
            // updateUsername(num,event) {
            //     console.log(num,"NUM");
                
            //     console.log(event,"EVENT");
                
            // },

            // updateGender(newGender) {
            //     this.formData.gender = newGender;
            // },
            ...mapActions(useAuthStore,["register"]),
            async submitForm() {
              try {
                await this.register(this.formData);
                
                const toast = useToast();
                toast.success('You will be redirect to login page', {
                  position: "top-right",
                  timeout: 3500,
                  closeOnClick: true,
                  closeButton: "button",
                  icon: true,
                });

                setTimeout(() => {
                  this.$router.push('/login');
                }, 4000);

                //console.log("KAYIT BAŞARILI");
                
                
              } catch (data) {
                //console.log("KAYIT BAŞARISIZ",error);
                const {error} = data

                if(error === "The Email is already exist!") {
                  this.existingEmail = this.formData.email;
                }
                else {
                  this.showGenericWarningMessage = true;
                  this.formData = {
                    username : "",
                    email : "",
                    password : "",
                }
                
              }
                //submitForm(event) olarak method parametre alır
                //event.preventDefault(); //submit edildiğinde sayfanın yenilenmesini engeller.

                //console.log(this.formData,"REGİSTERFORM DATA");
            }
        },
    },
    computed :  {

isFormValid() {
  return this.isUsernameValid && this.isEmailValid && this.isPasswordValid;
},

isUsernameValid() {
  return (this.formData.username.length >= 5 && this.formData.username.length <= 20);
},
isEmailValid() {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
},
isPasswordValid() {
  return (this.formData.password.length >= 4 && this.formData.password.length <= 10);
}

}
  }
</script>

<style scoped> 

</style>