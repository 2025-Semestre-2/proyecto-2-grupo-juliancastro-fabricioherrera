import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();


router.post('/login', loginController.login);
router.post('/logout', loginController.logout);
router.get('/verify', loginController.verifyAuth);
router.get('/check-email', loginController.checkEmail);

export default router;