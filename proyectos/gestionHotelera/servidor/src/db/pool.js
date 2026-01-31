// Create ONE shared pool for the whole app
import sql from 'mssql';

// ... load your config from env or a config file ...
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // e.g. 'localhost'
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 30000
  }
};


let poolPromise = null;

export function getPool() {
  if (!poolPromise) {
    const pool = new sql.ConnectionPool(config);
    pool.on('error', (err) => {
      console.error('SQL pool error:', err);
    });
    poolPromise = pool.connect();
  }
  return poolPromise; // returns Promise<sql.ConnectionPool>
}

// Close only on process shutdown
export async function closePool() {
  try {
    const pool = await poolPromise;
    if (pool) await pool.close();
  } catch {}
  poolPromise = null;
}

// Hook for graceful shutdown (optional; call this in your server entry)
process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});