import express from 'express';
import reservationController from '../controllers/reservationController.js';

const router = express.Router();

// Obtener reservas por usuario
router.get(
  '/user/:identificacion',
  reservationController.getReservationsByUser
);

// Realizar checkout de una reserva
router.patch(
  '/:numReservacion/checkout',
  reservationController.checkoutReservation
);

// Obtener detalles de una reserva específica
router.get(
  '/:numReservacion',
  reservationController.getReservationDetails
);

export default router;