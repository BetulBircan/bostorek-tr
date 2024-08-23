import Book from "../models/Book.js";

const getAllBooks = (req, res) => {
        console.log("GET ALL BOOKS");
    }

    const createBook = async (req,res) => {
        //console.log(req.body); //burada gelen requestin body kısmını yazdırırız. ama undefined alırız çünkü gönderilen json ı pars etmemiz lazım. 
        try {
            const { title, author} = req.body; //gelen json ı pars ederek title ve author değişkenlerine atadık.

            const existingBook = await Book.findOne({title, author}); //title ve author aynı olan bir döküman var mı kontrol ediyoruz.

            if(existingBook) {
                return res.status(400).json(
                    {
                        error : "This book already exists"
                    }
                )
            }

                            //Book modelini kullanarak veritabanımızda yeni bir döküman oluşturacağız.
            const newBook = await Book.create(req.body); //req.body ile gelen json ı kullanarak yeni bir döküman oluşturduk.

            return res.status(201).json(
                {
                  message : "Book created successfully",
                  book : newBook
                }
            )
            
        } catch (error) {
            //Handle mongoose validation
            if(error.name === "ValidationError") {
                const validationErrors = {}; //eğer zorunlu alanları girmezsek hata mesajını almak için bir obje oluşturduk

                //her bir zorunlu alan için onların olup olmadığını kontrol eder zorunlu alan girilmemişse hata mesajını alıyoruz.
                for(let field in error.errors) {
                  validationErrors[field] = error.errors[field].message; 
                  //eğer zorunlu alan girilmediyse hata mesajını alıyoruz. ve validationErrors objesine ekliyoruz.
                  
                }

                return res.status(400).json(
                    {
                        message : "Validation Error",
                        error : validationErrors
                    }
                )
            }

            else {
                console.error("Error at creating book", error);
                return res.status(500).json(
                    {
                        error : "Internal Server Error"
                    }
                )
            }
        }
    }

    export {
        getAllBooks,
        createBook
    }