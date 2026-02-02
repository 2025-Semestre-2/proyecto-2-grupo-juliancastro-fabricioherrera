import sql from 'mssql';

const reservationDAO = {
  async getReservationsByUser(identificacion) {
    try {
      console.log(`Obteniendo reservas para usuario: ${identificacion}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('identificacion', sql.VarChar(20), identificacion)
        .query(`
          SELECT 
            cedulaJuridica,
            nombre,
            identificacion,
            numReservacion,
            fechaIngreso,
            fechaSalida,
            cantPersonas,
            vehiculo,
            activa,
            numero,
            precio
          FROM vw_reservacionesCompletas
          WHERE identificacion = @identificacion
          ORDER BY fechaIngreso DESC
        `);

      console.log(`Reservas encontradas: ${result.recordset.length}`);

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset
      };
    } catch (error) {
      console.error('Error en reservationDAO.getReservationsByUser:', error);
      throw new Error(`Error al obtener reservas: ${error.message}`);
    }
  },

  async checkoutReservation(numReservacion) {
    try {
      console.log(`Realizando checkout de reserva: ${numReservacion}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('numReservacion', sql.Int, numReservacion)
        .query(`
          UPDATE Reservacion
          SET activa = 0
          WHERE numReservacion = @numReservacion
          AND activa = 1
        `);

      if (result.rowsAffected[0] === 0) {
        throw new Error('No se encontró la reserva activa o ya fue procesada');
      }

      return {
        success: true,
        rowsAffected: result.rowsAffected[0],
        message: 'Checkout realizado exitosamente'
      };
    } catch (error) {
      console.error('Error en reservationDAO.checkoutReservation:', error);
      throw new Error(`Error al realizar checkout: ${error.message}`);
    }
  },

  async getReservationDetails(numReservacion) {
    try {
      console.log(`Obteniendo detalles de reserva: ${numReservacion}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('numReservacion', sql.Int, numReservacion)
        .query(`
          SELECT 
            cedulaJuridica,
            nombre,
            identificacion,
            numReservacion,
            fechaIngreso,
            fechaSalida,
            cantPersonas,
            vehiculo,
            activa,
            numero,
            precio
          FROM vw_reservacionesCompletas
          WHERE numReservacion = @numReservacion
        `);

      if (result.recordset.length === 0) {
        throw new Error('Reserva no encontrada');
      }

      return {
        success: true,
        data: result.recordset[0]
      };
    } catch (error) {
      console.error('Error en reservationDAO.getReservationDetails:', error);
      throw new Error(`Error al obtener detalles de reserva: ${error.message}`);
    }
  }
};

export default reservationDAO;