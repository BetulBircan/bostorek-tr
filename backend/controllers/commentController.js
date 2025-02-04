import Comment from "../models/Comment.js";
import { findDocumentById } from "../utils/index.js";

const createAComment = async (req, res) => {
    try {
        const { content, bookId, userId } = req.body;

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
        console.error("Error at createAComment", error);
        
        return res.status(500).json({
            message: 'Internal Server error'
        });
        
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate({
            path : 'postedBy', //postedBy ı populate edicek
            select : 'username', //sadece username i getirecek
        })
        res.status(200).json({
            message: 'All comments fetched', 
            comments
        })
    } catch (error) {
        console.error("Error at getAllComments", error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
        
    }
};

const getCommentsForBook = async (req, res) => {
    try {

        const {id} = req.params;

        //Populate : Comment modelindeki postedBy alanını OBJECTıD OLARAK DEĞİLDE REFERANS ALDIĞI USER MODELİNİN BİLGİLERİ İLE DOLDURMAK İÇİN KULLANILIR. yANİ COMMNEENT ALANINDA HANGİ USER A AİTSE ONUN BİLGİLERİ GELECEK
        const comments = await Comment.find({book: id}).populate('postedBy');

        return res.status(201).json({
            message: 'Comments for book fetched', comments
        })
        
    } catch (error) {
        console.error("Error at getCommentsForBook", error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};

const getCommentsByUser = async (req, res) => {
    try {
        const {id} = req.params;

    const comments = await Comment.find({postedBy: id}).populate('book');

    return res.status(201).json({
        message: 'Comments by user fetched', comments
    });
    } catch (error) {
        console.error("Error at getCommentsByUser", error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
}

const editAComment = async (req, res) => {
    try {
        console.log(req,"req");
        console.log(req.body,"req.body");
        console.log(res,"res");
        
        const {id} = req.params;
        const {content} = req.body;

        const comment = await findDocumentById(Comment, id, res);

        if(!comment) return;

        comment.content = content || comment.content;

        await comment.save();

        res.status(201).json({
            message: 'Comment edited successfully', 
            comment
        });

  
       
       
        
    } catch (error) {
        console.error("Error at editAComment", error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
        
    }
};

const deleteAComment = async (req, res) => {
    try {
        const {id} = req.params;

        const comment = await findDocumentById(Comment, id, res);

        if(!comment) return;

        await comment.deleteOne();

        return res.status(204).json({
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error("Error at deleteAComment", error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
        
    }
}

export { createAComment, getAllComments, getCommentsForBook, getCommentsByUser, editAComment, deleteAComment };