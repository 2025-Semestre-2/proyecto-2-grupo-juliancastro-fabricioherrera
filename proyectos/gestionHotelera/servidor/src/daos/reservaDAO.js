import sql from 'mssql';
import dbConfig from '../config/database.js';

const reservaDAO = {
  async crearReserva({ identificacion, habitacionID, fechaInicio, fechaSalida, cantPersonas, vehiculo, tipoPagoID, importeTotal }) {
    let pool;
    try {
      pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('identificacion', sql.VarChar(12), identificacion)
        .input('habitacionID', sql.Int, habitacionID)
        .input('fechaInicio', sql.DateTime, fechaInicio)
        .input('fechaSalida', sql.DateTime, fechaSalida)
        .input('cantPersonas', sql.Int, cantPersonas)
        .input('vehiculo', sql.Bit, vehiculo)
        .execute('sp_CrearReserva');

      return result.recordset[0];

    } catch (error) {
      console.error('Error al crear reserva:', error);
      throw error; 
    }
  }
};

export default reservaDAO;
