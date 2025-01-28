import Comment from "../models/Comment.js";

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

export { createAComment, getCommentsForBook };