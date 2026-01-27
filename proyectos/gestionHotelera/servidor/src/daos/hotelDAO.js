import { pool } from '../config/database.js';

const hotelDAO = {
  async getHoteles() {
    try {
      const result = await pool.request()
        .query('SELECT * FROM dbo.vw_HotelesCard');
        console.log(result.recordset);

      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getHoteles:', error);
      throw new Error('Error al obtener hoteles de la base de datos');
    }
  }
};

export default hotelDAO;
