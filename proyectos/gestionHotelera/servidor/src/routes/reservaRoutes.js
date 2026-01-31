import express from 'express';
import reservaController from '../controllers/reservaController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
// Crear reserva (requiere autenticación)
router.post('/', verifyToken, reservaController.crearReserva);

export default router;
