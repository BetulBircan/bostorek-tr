import mongoose from "mongoose";

//Schema : dökümanların yapısını tamamlıyoruz.
const bookSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
            
        },
        author : {
            type: String,
            required: true,
        },
        description : {
            type: String,
        },
        pageNumber : {
            type: Number,
            min:1,
        },
        rating : {
            type: Number,
            required : true,
            min : 0,
            max : 10
        }
    },
   {timestamps : true} //bu opsiyon her dökümanımımızda iki adet ekleyecek otomatik olarak. bu iki alan da createdAtve updatedAt
);

const Book = mongoose.model('Book',bookSchema); //model oluşturduk ve Book adında bir model oluşturduk.mongodb collection iel etkileş,m kurmamızı sağlar

export default Book;