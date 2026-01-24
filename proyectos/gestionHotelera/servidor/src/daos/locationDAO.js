import { pool } from '../config/database.js';

const locationDAO = {
  async getLocations() {
    try {
      const result = await pool.request()
        .query('SELECT * FROM vw_ubicaciones');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getAllCountries:', error);
      throw new Error('Error al obtener países de la base de datos');
    }
  }
};

export default locationDAO;