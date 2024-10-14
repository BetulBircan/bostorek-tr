import User from '../models/User.js';
import { checkValidationErrors } from '../utils/index.js';

const register = async (req, res) => {
    try {
        const { email } = req.body
        //email kontrolü yapılacak veritabanında var mı yok mu diye
         const existingEmail = await User.findOne({ email });
        // console.log(req.body,"req.body");

        if (existingEmail) {
            return res.status(400).json(
                {
                    error: "This email is already exists"
                }
            )
        }

        //Kullanıcı Oluşturma
        const newUser = await User.create(req.body);

        return res
        .status(201)
        .json({ message: 'User created succesfully', user: newUser });
        
        
    } catch (error) {
        if (error.name === "ValidationError") {
            if(checkValidationErrors(error,res)) return
        }

        else {
            console.error("Error at register", error);
            return res.status(500).json(
                {
                    error: "Internal Server Error"
                }
            )
        }
        
    }
}

export { register } //register fonksiyonunu dışarıya export ettik. ve bu fonksiyonu authRoute.js dosyasında kullanacağız.