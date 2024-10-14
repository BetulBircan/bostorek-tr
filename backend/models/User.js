import mongoose from "mongoose";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true,
            trim: true, //eğer boşluklu birşeygirilirse boşlukları kaldırır.
            maxLength: 20,
        },
        email : {
            type: String,
            required: true,
            trim: true, //eğer boşluklu birşeygirilirse boşlukları kaldırır.
            unique: true, //bir email adresi bir kere kullanılabilir.
            match : [emailRegex, 'Invalid email addresss'],
        },
        password : {
            type: String,
            required: true,
            trim: true,
            maxLength: 10,
            minLength : 4,
        },

        admin : {
            type: Boolean,
            default: false,
        }

    },
    {timestamps : true}
)

userSchema.pre('save', async function(next){
   try {
    
    const salt = await bcrypt.genSalt(10); //gelişigüzel karakterleri10 kez karışırırarak şifreyi hashlemek için kullanılan bir değer. 10 karakterli bir salt oluşturduk.

    this.password = await bcrypt.hash(this.password,salt); //şifreyi hashledik.
    next();
    
   } catch (error) {
    next(error);
   }
})

const User = mongoose.model('User',userSchema);
export default User;
