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
,

  async getHotelById(idHotel) {
    try {
      const result = await pool.request()
        .input('idHotel', idHotel)
        .query('SELECT * FROM dbo.vw_HotelesCard WHERE cedulaJuridica = @idHotel');
        console.log(result.recordset);

      if (!result.recordset || result.recordset.length === 0) {
        return null;
      }

      return result.recordset[0];
    } catch (error) {
      console.error('Error en DAO getHotelById:', error);
      throw new Error('Error al obtener el hotel de la base de datos');
    }
  }
};

export default hotelDAO;
