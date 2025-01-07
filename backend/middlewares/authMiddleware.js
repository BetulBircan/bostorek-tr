import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticateUser = async (req, res, next) => {
    const autHeader = req.headers.authorization;

    if(!autHeader) {
        //unauthorized --- 401 hatası
        return res.status(401).json({message: 'Authorization header is missing'});
    }

    const tokenParts = autHeader.split(' ');

    if(tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({message: 'Token is invalid'});
    }

    const token = tokenParts[1];

    console.log('token',token);
    

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decodedToken.userId);

        next();
        
    } catch (error) {
        console.log(error.name, 'error');
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({message: 'Token has expired!'});
        }
        else {
            return res.status(500).json({message: 'Internal Server Error!'});
        }
        
    }



    console.log('autHeader',autHeader);
    
}

export {authenticateUser};