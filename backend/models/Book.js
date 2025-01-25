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
        //kitabı ekleyen kullanıcı, kullanıcı ve kitap rasında ilişki kurulacak
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
   {timestamps : true} //bu opsiyon her dökümanımımızda iki adet ekleyecek otomatik olarak. bu iki alan da createdAtve updatedAt
);

const Book = mongoose.model('Book',bookSchema); //model oluşturduk ve Book adında bir model oluşturduk.mongodb collection ile etkileşim kurmamızı sağlar

export default Book;

/*contention issue : ortak olaraak kullanılan bir kaynaktaki veri çakışmasına denk gelir.Farklı kullanıcılar tarafından bir
kitaba aynı anda yorumlar yapıldığında güncellenecek olan collection sırasında problemler çıkabilir.

*/