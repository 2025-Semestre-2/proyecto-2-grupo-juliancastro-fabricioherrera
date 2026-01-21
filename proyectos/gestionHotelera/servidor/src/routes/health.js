import express from 'express';
import { getDatabaseStatus } from '../config/database.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbStatus = getDatabaseStatus();
  const isHealthy = dbStatus === 'connected';

  const healthInfo = {
    success: true,
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus
  };
  const statusCode = isHealthy ? 200 : 503;
  res.status(statusCode).json(healthInfo);
});

export default router;
