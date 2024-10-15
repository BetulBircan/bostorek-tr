import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController.js';

//register route
router
.route('/register')
.post(authController.register);

export default router;

//login route
router.route('/login').post(authController.login);