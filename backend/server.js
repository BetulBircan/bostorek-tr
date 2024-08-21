//express.js ile sunucu ayağa kaldırma

//Common JS(ES5)
// const express = require('express');

//ES6
import express from 'express';
import bookRoute from './routes/bookRoute.js';
const app = express();
const port = 4000;

//Burada express.js in bize sağladığı en büyük kolaylık gelen bir isteğe(request) karşı kolaylıkla cevap verebilmemizdir.(response)

//GET request
app.use('/api/v1/books',bookRoute);

app.listen(port, () => {
    console.log(`Server is listening port : ${port}`);
});


