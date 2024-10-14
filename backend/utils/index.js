import mongoose from "mongoose";

//geçerli bir id var mı yok mı kontrol ediyoruz.
const isValidObjectId = (id,res) => {
    if(!mongoose.Types.ObjectId.isValid(id)){ //gelen id veritabanındaki objectId mi ve geçerli bir id mi kontrol ediyoruz.
     
        return res.status(400).json({
            error : "Object id is not valid"
        })
    }
}

//id ye göre döküman var mı yok mu kontrol ediyoruz.
const findDocumentById = async (model, id, res) => {
    
    try {
        const document = await model.findById(id); //id si gelen dökümanı veritabanından çektik.Id ye göre tek kitap getirişini sağladık.
        if(!document) {
            res.status(404).json({
                error: `The ${model.modelName} does not exist` //modelName ile modelin adını alıyoruz.
            })
            return null;
        }
        return document;
    } catch (error) {
        console.error(`Error while finding ${model.modelName} by Id`, error);
        return res.status(500).json(
            {
                error: "Internal Server Error"
            }
        )
    }
}

const checkValidationErrors = (error,res) => {
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

export {
    isValidObjectId, //isValidObjectId fonksiyonunu export ettik.
    findDocumentById, //findDocumentById fonksiyonunu export ettik.
    checkValidationErrors //checkValidationErrors fonksiyonunu export ettik.
}; 

