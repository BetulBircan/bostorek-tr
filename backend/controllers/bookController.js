import Book from "../models/Book.js";
import { isValidObjectId, findDocumentById } from "../utils/index.js";

//Tüm kitapları getirme
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); //Book modelini kullanarak veritabanından tüm dökümanları çektik.
        res.status(200).json(books); //tüm dökümanları json formatında geri döndürdük.
    } catch (error) {
        console.error("Error at getAllBooks", error);
        return res.status(500).json(
            {
                error: "Internal Server Error"
            }
        )
    }
}

//Tek bir kitabı getirme
const getABook = async (req, res) => {

     //console.log("Params : ", req.params); //burada gelen requestin params kısmını yazdırırız. ve url deki parametreleri alırız.
     const { id } = req.params; //url deki parametreleri alırız.
        
    if(isValidObjectId(id,res)) return //gelen id veritabanındaki objectId mi ve geçerli bir id mi kontrol ediyoruz.return diyerek kodun devamına gitmesini önlüyoruz. ve utils klasöründ einde dosyasındaki değeri return ediyoruz.

    //asenkron bir fonksiyon olduğu için try-catch bloğu kullannmak best practise dir.
    try {
        const book = await findDocumentById(Book, id, res); //findDocumentById fonksiyonunu kullandık.
        if(!book) return; //eğer kitap yoksa hata mesajı döndürürüz.

        res.status(200).json(book); //kitabı json formatında geri döndürdük.
    } catch (error) {
        console.error("Error at getABook", error);
        return res.status(500).json(
            {
                error: "Internal Server Error"
            }
        )
    }
}

//Kitap oluşturma
const createABook = async (req, res) => {
    //console.log(req.body); //burada gelen requestin body kısmını yazdırırız. ama undefined alırız çünkü gönderilen json ı pars etmemiz lazım. 
    try {
        const { title, author } = req.body; //gelen json ı pars ederek title ve author değişkenlerine atadık.

        const existingBook = await Book.findOne({ title, author }); //title ve author aynı olan bir döküman var mı kontrol ediyoruz.

        if (existingBook) {
            return res.status(400).json(
                {
                    error: "This book already exists"
                }
            )
        }

        //Book modelini kullanarak veritabanımızda yeni bir döküman oluşturacağız.
        const newBook = await Book.create(req.body); //req.body ile gelen json ı kullanarak yeni bir döküman oluşturduk.

        return res.status(201).json(
            {
                message: "Book created successfully",
                book: newBook
            }
        )

    } catch (error) {
        //Handle mongoose validation
        if (error.name === "ValidationError") {
            const validationErrors = {}; //eğer zorunlu alanları girmezsek hata mesajını almak için bir obje oluşturduk

            //her bir zorunlu alan için onların olup olmadığını kontrol eder zorunlu alan girilmemişse hata mesajını alıyoruz.
            for (let field in error.errors) {
                validationErrors[field] = error.errors[field].message;
                //eğer zorunlu alan girilmediyse hata mesajını alıyoruz. ve validationErrors objesine ekliyoruz.

            }

            return res.status(400).json(
                {
                    message: "Validation Error",
                    error: validationErrors
                }
            )
        }

        else {
            console.error("Error at createABook", error);
            return res.status(500).json(
                {
                    error: "Internal Server Error"
                }
            )
        }
    }
}

//Kitap güncelleme
const updateABook = async (req, res) => {

    const { id } = req.params; //url deki parametreleri alırız.
    const { title, author, description, pageNumber, rating } = req.body; //gelen json ı pars ederek title ve author değişkenlerine atadık.

    if(isValidObjectId(id,res)) return //gelen id veritabanındaki objectId mi ve geçerli bir id mi kontrol ediyoruz.return diyerek kodun devamına gitmesini önlüyoruz. ve utils klasöründ einde dosyasındaki değeri return ediyoruz.

    try {
        const book = await findDocumentById(Book, id, res); //findDocumentById fonksiyonunu kullandık.
        if(!book) return; //eğer kitap yoksa hata mesajı döndürürüz.

        book.title = title || book.title; //gelen title varsa günceller yoksa eski title ı kullanır. 
        book.author = author || book.author;
        book.description = description || book.description;
        book.pageNumber = pageNumber || book.pageNumber;
        book.rating = rating || book.rating;

        await book.save(); //kitabı güncelledik.

        res.status(200).json({
            message: "The book updated successfully",
            
        }); //güncellenmiş kitabı json formatında geri döndürdük.
        
    } catch (error) {
        console.error("Error at updateABook", error);
        return res.status(500).json(
            {
                error: "Internal Server Error"
            }
        )
    }
}

//Kitap silme
const deleteABook = async (req, res) => {
    const { id } = req.params; //url deki parametreleri alırız.

    if(isValidObjectId(id,res)) return //gelen id veritabanındaki objectId mi ve geçerli bir id mi kontrol ediyoruz.return diyerek kodun devamına gitmesini önlüyoruz. ve utils klasöründ einde dosyasındaki değeri return ediyoruz.
        
    try {
        const book = await findDocumentById(Book, id, res); //findDocumentById fonksiyonunu kullandık.
        if(!book) return; //eğer kitap yoksa hata mesajı döndürürüz.

        await book.deleteOne(); //kitabı sildik.
        res.status(200).json({
            message: "The book deleted successfully"
        }); //silinen kitabı json formatında geri döndürdük.
        
    } catch (error) {
        console.error("Error at deleteABook", error);
        return res.status(500).json(
            {
                error: "Internal Server Error"
            }
        )
    }
}

export {
    getAllBooks,
    createABook,
    getABook,
    updateABook,
    deleteABook
}