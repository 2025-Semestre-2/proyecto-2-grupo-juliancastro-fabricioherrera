import { pool } from '../config/database.js';

const typesDAO = {
  async getHotelTypes() {
    try {
      const result = await pool.request()
        .query('SELECT * FROM vw_tipoHospedajes');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getHotelTypes:', error);
      throw new Error('Error al obtener los tipos de hospedaje de la base de datos');
    }
  }
};

export default typesDAO;