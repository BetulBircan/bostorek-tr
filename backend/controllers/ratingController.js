import Rating from "../models/Rating.js";

const createARate = async (req, res) => {
    try {

        const { rate, bookId, userId } = req.body;

        const newRate = await Rating.create({
            rate : rate,
            book: bookId,
            ratedBy: userId
        });

        return res.status(201).json({
            message: 'The rate added successfully',
            rating: newRate
        });
        
    } catch (error) {
        console.error("Error at createRating", error);

        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

const getRatingsForBook = async (req, res) => {
    try {

        const { id } = req.params;        

        const ratings = await Rating.find({book: id}).populate('ratedBy');

        return res.status(201).json({
            message: 'Ratings for book fetched',
            ratings
        });
        
    } catch (error) {
        console.error("Error at getRatingsForBook", error);

        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export { createARate, getRatingsForBook };