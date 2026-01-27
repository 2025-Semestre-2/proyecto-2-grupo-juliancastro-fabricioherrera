import express from 'express';
import healthRouter from './health.js';
import locationRoutes from './locationRoutes.js';
import registerRoutes from './registerRoutes.js';
import loginRoutes from './loginRoute.js';
import serviceRoutes from './serviceRoute.js';
import typesRoutes from './typesRoutes.js'

const router = express.Router();

router.use('/health', healthRouter);
router.use('/locations', locationRoutes);
router.use('/users', registerRoutes);
router.use('/auth', loginRoutes);
router.use('/services', serviceRoutes);
router.use('/types', typesRoutes);

export default router;