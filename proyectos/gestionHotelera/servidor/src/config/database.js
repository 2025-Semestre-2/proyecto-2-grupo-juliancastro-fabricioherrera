import sql from 'mssql';
import config from './environment.js';

let pool = null;

const connectDatabase = async () => {
  try {
    pool = await sql.connect(config.sqlserver);

    console.log('Database connected successfully (SQL Server)');

  } catch (error) {
    console.error('Failed to connect to database:', error.message);
    process.exit(1);
  }
};

export const getDatabaseStatus = () => {
  if (!pool) return 'disconnected';

  return pool.connected ? 'connected' : 'disconnected';
};

export { sql, pool };
export default connectDatabase;
