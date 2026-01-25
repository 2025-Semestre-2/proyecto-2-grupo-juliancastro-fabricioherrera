import express from 'express';
import registerController from '../controllers/registerController.js';

const router = express.Router();


router.post('/register', registerController.registerUser);
router.get('/check-email', registerController.checkEmailAvailability);
router.get('/check-id', registerController.checkIdAvailability);

export default router;