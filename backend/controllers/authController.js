import User from '../models/User.js';
import { checkValidationErrors } from '../utils/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

        newUser.password = undefined; //şifreyi response da göstermek istemiyoruz. Bu yüzden undefined yaptık.frontend e giden kısım için ama veritabanında şifreli olarak PASSWORD alanı saklanır.

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

         //Check user if exists
        if(!user) {
            return res.status(404).json({
                error : "User not found!"
            })
        }

        //Check if password correct
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json({
                error : "Your password is not true!"
            })
        }

        user.password = undefined;

        const expirationTime = 60 * 60 * 24; //1 week

        //generate token
        const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET_KEY, {
            //expiresIn: process.env.JWT_EXPIRE_TIME,
            expiresIn: process.env.JWT_EXPIRE_TIME
        });


        return res.status(200).json({
            message: "User logged in successfully!", user,token
        })
        
    } catch (error) {
        console.error("Error at login", error);
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
    

export { register, login } //register fonksiyonunu dışarıya export ettik. ve bu fonksiyonu authRoute.js dosyasında kullanacağız.