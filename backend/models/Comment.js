import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        //istenilen validationlar yapılabilir
        content : {
            type: String,
            required: true,
        },
        book : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        postedBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }

    },
    {timestamps : true} //createdAt ve updatedAt alanlarını otomatik olarak ekler
);

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;