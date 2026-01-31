
import express from 'express';
import healthRouter from './health.js';
import locationRoutes from './locationRoutes.js';
import registerRoutes from './registerRoutes.js';
import loginRoutes from './loginRoute.js';
import serviceRoutes from './serviceRoute.js';
import typesRoutes from './typesRoutes.js';
import hotelRoutes from './hotelRoutes.js';
import reservaRoutes from './reservaRoutes.js';
import activityRoutes from './activityRoutes.js';
import empresaRoutes from './enterpriseRoutes.js';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/locations', locationRoutes);
router.use('/users', registerRoutes);
router.use('/auth', loginRoutes);
router.use('/services', serviceRoutes);
router.use('/types', typesRoutes);
router.use('/hotels', hotelRoutes);
router.use('/reservas', reservaRoutes);
router.use('/activities', activityRoutes);
router.use('/empresas', empresaRoutes); // Nueva ruta

export default router;