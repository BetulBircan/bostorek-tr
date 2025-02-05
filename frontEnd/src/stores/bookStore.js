import { defineStore } from "pinia";
import axios from "axios";
import { useRatingStore } from "./ratingStore";

export const useBookStore = defineStore('bookStore',{
    //state, action, getters buraya yazılacak
    state : () => ({
        books : [],
        isLoading : false,
        userUploadedBooks : []
    }),

    //getters : store üzerindeki state i okuyup işleyip başka bir değer döndüren fonksiyonlardır.
    getters : {
        selectedBooks : (state) => {
            return (id) => state.books.find(book => book._id === id);
        },

        latest4Books : (state) => {
            return state.books.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,4)
        },
        bestRatings4Books : (state) => {
            const sortedBooks =  state.books.sort((a,b) => {
            const averageRatingA = a.ratings.reduce((sum, rating) => sum + rating.rate, 0) / (a.ratings.length || 1);
            const averageRatingB = b.ratings.reduce((sum, rating) => sum + rating.rate, 0) / (b.ratings.length || 1);
            return averageRatingB - averageRatingA;
            })
            return sortedBooks.slice(0,4);
        },
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
                
                this.books = response.data;

                await this.fetchRatingsForBooks();
                
                //this.isLoading = false;

            } catch (error) {
                console.error('Error at fetching books',error);
            } 
            finally {
                this.isLoading = false;
            }
        },

        async fetchRatingsForBooks() {
            const ratingStore = useRatingStore();
            
           await Promise.all(
            this.books.map( async ( book) => {
                try {
                    await ratingStore.fetchRatingsForBook(book._id);

                    book.ratings = ratingStore.ratingsForBook;
                } catch (error) {
                    console.error("Error at fetcRatingsForBooks", error)
                }
            })
           )
        },

        async fetchBooksByUploader() {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/books/uploader'); 
                
                this.userUploadedBooks = response.data;
            } catch (error) {
                console.error('Error at fetching user uploaded books',error);
                
            }
        },

        async addNewBook(newBook) { 
            try {
                const response = await axios.post('http://localhost:4000/api/v1/books', newBook);
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