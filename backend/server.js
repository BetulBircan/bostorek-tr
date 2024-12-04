//express.js ile sunucu ayağa kaldırma

//Common JS(ES5)
// const express = require('express');

//ES6
import express from 'express';
import bookRoute from './routes/bookRoute.js';
import authRoute from './routes/authRoute.js';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
const port = 4000;

//CORS
const corsOptions = {
    //origin : ['http://localhost:5174'],
    origin : ['http://localhost:5173'],
    credentials : true, //cookie,authorization header gibi bözelliklere izin vermemizi sağlar
}

//Burada express.js in bize sağladığı en büyük kolaylık gelen bir isteğe(request) karşı kolaylıkla cevap verebilmemizdir.(response)

//Middleware

//CORS Middleware
app.use(cors(corsOptions));

app.use(express.json()); //express.json() ile gelen requestin body kısmını json a çeviririz.

//GET request
app.use('/api/v1/books',bookRoute);
app.use('/api/v1/auth', authRoute);

try {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is listening port : ${port}`);
    });
    
} catch (error) {
    process.exit(1); //process.exit(1) ile uygulamayı bir hata ile karşılaştığında durdurur.
}




