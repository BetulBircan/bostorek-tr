import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore',{
    state : () => ({
        user : null
    }),

    getters : {
        isLoggedIn : (state) => {
            return !!state.user; //kullanıcı varsa true yoksa false döner !! boolean a çevir demek
        }
    },

    actions : {
        async register(newUserData) {
            try {
                const response = await axios.post('http://localhost:4000/api/v1/auth/register',newUserData);
                return response.data
            } catch (error) {
                throw error.response.data;
            }
        },

        async login(userData) {
            try {
                const response = await axios.post('http://localhost:4000/api/v1/auth/login',userData);
               this.user = response.data.user;
               localStorage.setItem('user',JSON.stringify(response.data.user)); //local storage a kullanıcı bilgilerini kaydeder. JSON.stringify ile JAVASCRİPT OBJESİNİ JSON stringe çeviririz.
               axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; //axios.defaults.headers.common ile tüm axios isteklerine header ekleyebiliriz. Bearer token ile kullanıcıyı doğrularız. login olurken default olarakmkullanıcı token ını ekleriz
            } catch (error) {
                throw error.response.data;
            }
        },

        logout() {
            this.user = null;
            localStorage.removeItem('user'); //local storage dan kullanıcı bilgilerini siler
            location.reload(); //sayfayı yeniler
        }
    }
})