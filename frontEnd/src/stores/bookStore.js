import { defineStore } from "pinia";
import axios from "axios";

export const useBookStore = defineStore('bookStore',{
    //state, action, getters buraya yazılacak
    state : () => ({
        books : [],
        isLoading : false,
    }),
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
                //this.isLoading = false;

            } catch (error) {
                console.error('Error at fetching books',error);
            } 
            finally {
                this.isLoading = false;
            }
        }
    }
})

 //backend e istek atıp kitapları çekecek
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