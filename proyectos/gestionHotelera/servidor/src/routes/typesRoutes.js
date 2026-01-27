import express from 'express';
import typesController from '../controllers/typesController.js';

const router = express.Router();

router.get('/getHotelTypes', typesController.getHotelTypes);
router.get('/getActivityTypes', typesController.getActivityTypes);


export default router;