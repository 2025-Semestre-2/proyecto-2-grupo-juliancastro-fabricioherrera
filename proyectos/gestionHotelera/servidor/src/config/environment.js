import dotenv from 'dotenv';

dotenv.config();

const config = {
  sqlserver: {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      trustServerCertificate: true
    },
    authentication: {
      type: 'ntlm',
      options: {
        trustedConnection: true
      }
    }
  },

  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development'
  }
};

export default config;
