<template>
   <section>
    <div class="container">
        <form class="mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">

                <!-- for=username aynı name e sahip  field ına ait olduğunu gösterir. input elementindeki is ile
                 labeldaki for birbiryle örtüşür.-->
              <label for="username" class="form-label">Username</label>

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

              <input type="text" class="form-control" id="username" name="username" v-model="formData.username"  required>
            </div>
          </div>

          <div class="row justify-content-center">
            <!-- Email Field (Medium and Larger Screens) -->
            <div class="col-md-6 col-8 mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" name="email" v-model="formData.email" required>
            </div>
          </div>

          <!-- Password Field -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" name="password" v-model="formData.password" required>
            </div>
          </div>

          <!-- Gender Field -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <h5>Gender</h5>
              <div class="form-check">
                <!--
                 checked özellği radiobutton un seçili olup olmadığına bakar 
                 changed eventi : radiobutton seçildiğinde tetiklenir. hangi radiobutton seçildiğini anlamak için value attribute kullanılır.
                 v-model le hangi gender ı seçiyorsan o gelitirilir.
                  -->
                <input class="form-check-input" type="radio" name="gender" value='male' id="male" v-model="formData.gender" >
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
          </div>

          <!-- Age Field -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <label for="age" class="form-label">Age:</label>
              <input type="number" class="form-control" id="age" required>
            </div>
          </div>

          <!-- Programming Field -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <h5>Which Programming Language(s) you know?</h5>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="java" id="java">
                <label class="form-check-label" for="java">
                  Java
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="c++" id="c++">
                <label class="form-check-label" for="c++">
                  C++
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="python" id="python">
                <label class="form-check-label" for="python">
                  Python
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="rust" id="rust">
                <label class="form-check-label" for="rust">
                  Rust
                </label>
              </div>
            </div>
          </div>


          <!-- Submit Button -->
          <div class="row justify-content-center">
            <div class="col-md-6 col-8 mb-3">
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </div>
          </div>
        </form>
    </div>
   </section>
</template>

<script>
    export default {
        name : "RegisterView",
        data() {
            return {
                formData : {
                    username : "",
                    email : "",
                    password : "",
                    gender : ""
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

            updateGender(newGender) {
                this.formData.gender = newGender;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>