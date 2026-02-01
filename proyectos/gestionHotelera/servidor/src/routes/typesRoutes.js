import express from 'express';
import typesController from '../controllers/typesController.js';

const router = express.Router();

router.get('/getHotelTypes', typesController.getHotelTypes);
router.get('/getActivityTypes', typesController.getActivityTypes);
router.get('/getRoomTypes', typesController.getRoomTypes);
router.get('/getAmenities', typesController.getAmenities);

export default router;