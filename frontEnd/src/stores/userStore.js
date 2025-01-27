import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore('userStore',{ 
actions : {
    async updateUserDetails(updateUserData) {
        try {
            const response = await axios.put('http://localhost:4000/api/v1/user/updateUser', updateUserData);
            return response.data;
            //this.users = response.data;
        } catch (error) {
            console.error('Error at updating user details',error);
            throw error.response.data;
        } 
      
    }
},

});