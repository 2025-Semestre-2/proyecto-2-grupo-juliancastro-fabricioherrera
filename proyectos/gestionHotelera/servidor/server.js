import express from 'express';
import cors from 'cors';
import routes from './src/routes/router.js';
import config from './src/config/environment.js';
import connectDatabase from './src/config/database.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDatabase();
    const server = app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port} in ${config.server.nodeEnv} mode`);
      console.log(`Health check: http://localhost:${config.server.port}/api/health`);
    });

    const gracefulShutdown = () => {
      console.log('Received shutdown signal, closing server gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();