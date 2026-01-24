import express from 'express';
import healthRouter from './health.js';
import locationRoutes from './locationRoutes.js';  

const router = express.Router();

router.use('/health', healthRouter);
router.use('/locations', locationRoutes);  

export default router;