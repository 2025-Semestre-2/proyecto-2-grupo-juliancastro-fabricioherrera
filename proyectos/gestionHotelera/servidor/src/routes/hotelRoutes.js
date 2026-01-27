import express from 'express';
import hotelController from '../controllers/hotelController.js';

const router = express.Router();

router.get('/getHoteles', hotelController.getHoteles);

export default router;
