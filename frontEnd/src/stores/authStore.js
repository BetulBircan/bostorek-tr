import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore',{
    state : () => ({
        user : null
    }),

    getters : {},

    actions : {
        async register(newUserData) {
            console.log(newUserData,"newUserData");
            
            try {
                const response = await axios.post('http://localhost:4000/api/v1/auth/register',newUserData);
                console.log(response,"response");
                return response.data;
            } catch (error) {
                console.error('Error at register',error);
            }
        }
    }
})