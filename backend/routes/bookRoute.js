import express from 'express';
const router = express.Router();
import * as bookController from '../controllers/bookController.js'; //burada bbokController dosyasında export ettiğimiz methodları kullanırız.
            
                //callbabk fonksiyonu alır request response diye
router.get('/', bookController.getAllBooks); //burada /api/v1/books/ isteği geldiğinde bookController dosyasındaki getAllBooks methodunu çalıştırırız.

export default router;

