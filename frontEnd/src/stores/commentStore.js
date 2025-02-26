import { defineStore } from "pinia";
import axios from "axios";


export const useCommentStore = defineStore('commentStore',{
    state : () => ({
        comments : [],
        commentsForBook : [],
        commentsByUser : []
       
    }),
    actions : {
        async addNewComment(newComment){ 
            try {

                await axios.post('http://localhost:4000/api/v1/comments', newComment);

                await this.fetchComments();
  
                // const response = await axios.post('http://localhost:4000/api/v1/comments', newComment);

                // this.comments.push(response.data.comment);
                
            } catch (error) {
           
              throw error.response.data;
                
            }
        },

        async fetchComments() {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/comments');

                this.comments = response.data.comments;
            } catch (error) {
                console.error(error);
            }
        },

        async fetchCommentsForBook(bookId) {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/comments/book/${bookId}`);
                this.commentsForBook = response.data.comments;
            } catch (error) {
                console.error(error);
                
            }
        },

        async fetchCommentsByUser(userId) {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/comments/user/${userId}`);
                this.commentsByUser = response.data.comments;
            } catch (error) {
                console.error(error);
            }
        },

        async editComment(commentId, commentData) {
            try {
               const response = await axios.put(`http://localhost:4000/api/v1/comments/${commentId}`, commentData);

               const updatedCommentData = response.data.comment;

               const commentIndex = this.comments.findIndex(comment => comment._id === commentId);

                if(commentIndex !== -1) {
                    this.comments.splice(commentIndex, 1, updatedCommentData);
                }
             

            } catch (error) {
                throw error.response.data;
            }

        },

        async deleteComment(commentId) {
            try {
                await axios.delete(`http://localhost:4000/api/v1/comments/${commentId}`);
                this.comments = this.comments.filter(comment => comment._id !== commentId);
            } catch (error) {
                throw error.response.data;
            }
        },

        async upvoteComment(commentId) {
            try {
                const response = await axios.post(`http://localhost:4000/api/v1/comments/${commentId}/upvote`);

                const updatedCommentData = response.data.comment;

                const commentIndex = this.comments.findIndex(comment => comment._id === updatedCommentData._id);
                if(commentIndex !== -1) {
                    
                    this.comments[commentIndex] = updatedCommentData;
                }
                
            } catch (error) {
                
            }
        },

        async downvoteComment(commentId) {
            try {
                const response = await axios.post(`http://localhost:4000/api/v1/comments/${commentId}/downvote`);

                const updatedCommentData = response.data.comment;

                const commentIndex = this.comments.findIndex(comment => comment._id === updatedCommentData._id);
                if(commentIndex !== -1) {
                    
                    this.comments[commentIndex] = updatedCommentData;
                }
                
            } catch (error) {
                
            }
        }

    }
});