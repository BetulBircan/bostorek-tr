import express from 'express';
const router = express.Router();
import * as bookController from '../controllers/bookController.js'; //burada bbokController dosyasında export ettiğimiz methodları kullanırız.

//burada bookController dosyasındaki methodları kullanarak /api/v1/books/ isteklerini yönlendiririz.
router.get('/', bookController.getAllBooks); //burada /api/v1/books/ isteği geldiğinde bookController dosyasındaki getAllBooks methodunu çalıştırırız
router.post('/', bookController.createBook); //burada /api/v1/books/ isteği geldiğinde bookController dosyasındaki createBook methodunu çalıştırırız


export default router;


