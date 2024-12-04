import express from 'express';
const router = express.Router();
import * as bookController from '../controllers/bookController.js'; //burada bookController dosyasında export ettiğimiz methodları kullanırız.
import * as authMiddleware from '../middlewares/authMiddleware.js'; //burada authMiddleware dosyasında export ettiğimiz methodları kullanırız.

//burada bookController dosyasındaki methodları kullanarak /api/v1/books/ isteklerini yönlendiririz.
// router.get('/', bookController.getAllBooks); //burada /api/v1/books/ isteği geldiğinde bookController dosyasındaki getAllBooks methodunu çalıştırırız
// router.post('/', bookController.createABook); //burada /api/v1/books/ isteği geldiğinde bookController dosyasındaki createABook methodunu çalıştırırız
            //:id url de kullanacağımız parametre için bir yer tutucu işlevi görecek

//zincirleme şeklinde de kullanılabilir
router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createABook);

// router.get('/:id', bookController.getABook); //burada /api/v1/books/:id isteği geldiğinde bookController dosyasındaki getABook methodunu çalıştırırız
// router.put('/:id', bookController.updateABook); //burada /api/v1/books/:id isteği geldiğinde bookController dosyasındaki updateABook methodunu çalıştırırız
// router.delete('/:id', bookController.deleteABook); //burada /api/v1/books/:id isteği geldiğinde bookController dosyasındaki deleteABook methodunu çalıştırırız

router.route('/:id')
    .get(bookController.getABook)
    .put(bookController.updateABook)
    .delete(authMiddleware.authenticateUser, bookController.deleteABook);

export default router;


