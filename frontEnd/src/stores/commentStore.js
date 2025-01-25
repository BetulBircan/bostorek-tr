import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore('commentStore',{
    state : () => ({
        comments : [],
       
    }),
    actions : {
        async addNewComment(newComment){ 
            try {
                console.log(newComment,"newComment");
                
                const response = await axios.post('http://localhost:4000/api/v1/comments', newComment);

                this.comments.push(response.data.comment);
                
            } catch (error) {
           
              throw error.response.data;
                
            }
        }
    }
});