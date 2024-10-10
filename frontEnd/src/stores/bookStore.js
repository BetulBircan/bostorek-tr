import { defineStore } from "pinia";

export const useBookStore = defineStore('bookStore',{
    //state, action, getters buraya yazılacak
    state : () => ({
        books : [
            {
                "_id": "66d810a95a3a166981633bfb",
                "title": "Islak Balık",
                "author": "Volker Kutscher",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 490,
                "rating": 9.9,
                "createdAt": "2024-09-04T07:47:53.802Z",
                "updatedAt": "2024-09-04T07:47:53.802Z",
                "__v": 0
            },
            {
                "_id": "66d810de5a3a166981633bfe",
                "title": "Sultanın Korsanları",
                "author": "Emrah Safa Gürkan",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 432,
                "rating": 7.2,
                "createdAt": "2024-09-04T07:48:46.601Z",
                "updatedAt": "2024-09-04T07:48:46.601Z",
                "__v": 0
            },
            {
                "_id": "66d8114f5a3a166981633c01",
                "title": "Ateşböceği Yolu",
                "author": "Kristin Hannah",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 650,
                "rating": 7.9,
                "createdAt": "2024-09-04T07:50:39.961Z",
                "updatedAt": "2024-09-04T07:50:39.961Z",
                "__v": 0
            },
            {
                "_id": "66d811c75a3a166981633c04",
                "title": "Simru",
                "author": "Kahraman Tazeoğlu",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 256,
                "rating": 8,
                "createdAt": "2024-09-04T07:52:39.255Z",
                "updatedAt": "2024-09-04T07:52:39.255Z",
                "__v": 0
            },
            {
                "_id": "66d812155a3a166981633c07",
                "title": "Kendine Hoş Geldin",
                "author": "Miraç Çağrı Aktaş",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 160,
                "rating": 7.5,
                "createdAt": "2024-09-04T07:53:57.099Z",
                "updatedAt": "2024-09-04T07:53:57.099Z",
                "__v": 0
            },
            {
                "_id": "66d812a35a3a166981633c0a",
                "title": "Fısıltı",
                "author": "Becca Fitzpatrick",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 416,
                "rating": 7.8,
                "createdAt": "2024-09-04T07:56:19.577Z",
                "updatedAt": "2024-09-04T07:56:19.577Z",
                "__v": 0
            },
            {
                "_id": "66d812b95a3a166981633c0d",
                "title": "Çığlık",
                "author": "Becca Fitzpatrick",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 407,
                "rating": 7.8,
                "createdAt": "2024-09-04T07:56:41.035Z",
                "updatedAt": "2024-09-04T07:56:41.035Z",
                "__v": 0
            },
            {
                "_id": "66d812d95a3a166981633c10",
                "title": "Sessizlik",
                "author": "Becca Fitzpatrick",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 416,
                "rating": 7.8,
                "createdAt": "2024-09-04T07:57:13.043Z",
                "updatedAt": "2024-09-04T07:57:13.043Z",
                "__v": 0
            },
            {
                "_id": "66d812ed5a3a166981633c13",
                "title": "Final",
                "author": "Becca Fitzpatrick",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 416,
                "rating": 7.8,
                "createdAt": "2024-09-04T07:57:33.402Z",
                "updatedAt": "2024-09-04T07:57:33.402Z",
                "__v": 0
            },
            {
                "_id": "66d813995a3a166981633c16",
                "title": "3391 Kilometre",
                "author": "Beyza Alkoç",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis in harum iusto rem commodi voluptas dolorum earum modi maiores neque.",
                "pageNumber": 472,
                "rating": 8,
                "createdAt": "2024-09-04T08:00:25.790Z",
                "updatedAt": "2024-09-04T08:00:25.790Z",
                "__v": 0
            }
        ],
    }),

})

 //backend e istek atıp kitapları çekecek
        //  async fetchBooks() {
        //     try {
        //         const response = await fetch('http://localhost:4000/api/v1/books');
        //         const data = await response.json(); //json formatında veri döner
        //         this.books = data;
        //         console.log(this.books, 'books');
                
                
        //     } catch (error) {
        //         console.error(error);
        //     } 
        // },