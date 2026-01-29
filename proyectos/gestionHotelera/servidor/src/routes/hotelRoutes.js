import express from 'express';
import hotelController from '../controllers/hotelController.js';

const router = express.Router();

router.get('/getHoteles', hotelController.getHoteles);
router.get('/:idHotel', hotelController.getHotelById);
router.get('/:idHotel/habitaciones', hotelController.getHabitacionesByHotel);

export default router;
