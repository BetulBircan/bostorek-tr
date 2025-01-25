import Comment from "../models/Comment.js";

const createAComment = async (req, res) => {
    try {
        const { content, bookId, userId } = req.body;

        console.log(content, "contentbackend");
        

        const newComment = await Comment.create({
            content : content,
            book: bookId,
            postedBy: userId
        });

        return res.status(201).json({
            message: 'The comment added successfully',
            comment: newComment
        });

    } catch (error) {
        console.log(error);
        
    }
};

export { createAComment };