//express.js ile sunucu ayağa kaldırma

//Common JS(ES5)
// const express = require('express');

//ES6
import express from 'express';
import bookRoute from './routes/bookRoute.js';
import connectDB from './config/db.js';

const app = express();
const port = 4000;

//Burada express.js in bize sağladığı en büyük kolaylık gelen bir isteğe(request) karşı kolaylıkla cevap verebilmemizdir.(response)

//Middleware
app.use(express.json()); //express.json() ile gelen requestin body kısmını json a çeviririz.

//GET request
app.use('/api/v1/books',bookRoute);

try {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is listening port : ${port}`);
    });
    
} catch (error) {
    process.exit(1); //process.exit(1) ile uygulamayı bir hata ile karşılaştığında durdurur.
}




