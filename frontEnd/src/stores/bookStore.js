import { defineStore } from "pinia";
import axios from "axios";

export const useBookStore = defineStore('bookStore',{
    //state, action, getters buraya yazılacak
    state : () => ({
        books : [],
        isLoading : false,
        userUploadedBooks : []
    }),

    //getters : store üzerindeki state i okuyup işleyip başka bir değer döndüren fonksiyonlardır.
    getters : {
        selectedBooks(state) {
            return (id) => state.books.find(book => book._id === id);
        }
    },

    //actions : store üzerinde state i manipüle edecek şekilde değiştirebilecek fonksiyonlardır. asenkron işlemler yapılabilir.
    //VERİTABANINDA VERİ OKUMA, VERİ YAZMAK, DEĞİŞTİRMEK GİBİ İŞLEMLERDE KULLANILIR.
    actions : {
        //veri tabanına istek atarken axios servislerini kullanacağız.
        async fetchBooks() {
            this.isLoading = true;
            try {
                //await new Promise((resolve) => setTimeout(resolve, 3000)); //3 saniye bekletme
                const response = await axios.get('http://localhost:4000/api/v1/books');
                console.log(response.data, 'response');
                
                this.books = response.data;
                //this.isLoading = false;

            } catch (error) {
                console.error('Error at fetching books',error);
            } 
            finally {
                this.isLoading = false;
            }
        },

        async fetchBooksByUploader() {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/books/uploader'); 
                console.log(response.data, 'response');
                
                this.userUploadedBooks = response.data;
            } catch (error) {
                console.error('Error at fetching user uploaded books',error);
                
            }
        },

        async addNewBook(newBook) { 
            try {
                const response = await axios.post('http://localhost:4000/api/v1/books', newBook);
                console.log(response.data, 'response');
                this.books.push(response.data.book);
                await this.fetchBooksByUploader();
            } catch (error) {
               throw error.response.data;
            }
        },

        async deleteTheBook(bookId) {
            try {
                await axios.delete(`http://localhost:4000/api/v1/books/${bookId}`);
                this.books = this.books.filter(book => book._id !== bookId);
            } catch (error) {
                throw error.response.data;
            }
        },

        async editTheBook(bookId, bookData) {
            try {
                const response = await axios.put(`http://localhost:4000/api/v1/books/${bookId}`, bookData);

                const updatedBookData = response.data.book;

                //kitabın indexini bulup güncel veri ile değiştirme
                const bookIndex = this.books.findIndex(book => book._id === bookId);
                //ğer index bulunmazsa -1 döner
                if(bookIndex !== -1) {
                    this.books.splice(bookIndex, 1, updatedBookData);
                }

            } catch (error) {
                throw error.response.data;
                
            }
        },
    }
})

 //backend e istek atıp kitapları çekecek fetch kullanılmış hali
        //  async fetchBooks() {
        //     try {
        //         const response = await fetch('http://localhost:4000/api/v1/books');
        //         const data = await response.json(); //json formatında veri döner
                    //axiosta parse lamamıza gerekkalmaz parse lanmış şekilde veri döner
        //         this.books = data;
        //         console.log(this.books, 'books');
                
                
        //     } catch (error) {
        //         console.error(error);
        //     } 
        // },