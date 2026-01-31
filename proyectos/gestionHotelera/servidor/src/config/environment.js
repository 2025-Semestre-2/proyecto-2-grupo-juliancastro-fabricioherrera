import dotenv from 'dotenv';

dotenv.config();

const config = {
  sqlserver: {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      trustServerCertificate: true,
      encrypt: false,
    }
  },

  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development'
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production'
  }
};

export default config;