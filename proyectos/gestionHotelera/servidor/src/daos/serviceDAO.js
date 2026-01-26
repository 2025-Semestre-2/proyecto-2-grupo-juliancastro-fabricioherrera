import { pool } from '../config/database.js';

const serviceDAO = {
  async getServices() {
    try {
      const result = await pool.request()
        .query('SELECT * FROM vw_servicios');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getServices:', error);
      throw new Error('Error al obtener servicios de la base de datos');
    }
  }
};

export default serviceDAO;