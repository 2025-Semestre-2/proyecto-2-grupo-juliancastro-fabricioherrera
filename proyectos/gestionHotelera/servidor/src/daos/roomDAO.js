import sql from 'mssql';

const roomDAO = {
  async insertRoom(roomData) {
    try {
      console.log('Iniciando inserción de habitación:', {
        cedulaJuridica: roomData.cedulaJuridica,
        numero: roomData.numero,
        tipoHabitacion: roomData.tipoHabitacionNombre
      });

      const pool = await sql.connect();
      console.log('Conexión al pool establecida');

      const request = pool.request();
      console.log('Configurando parámetros del SP...');

      request.input('cedulaJuridica', sql.VarChar(10), roomData.cedulaJuridica);
      request.input('tipoHabitacionNombre', sql.VarChar(10), roomData.tipoHabitacionNombre);
      request.input('numero', sql.Int, roomData.numero);
      request.input('precio', sql.Decimal(10, 2), roomData.precio);
      request.input('fotosJson', sql.NVarChar(sql.MAX), roomData.fotosJson);
      request.input('comodidadesJson', sql.NVarChar(sql.MAX), roomData.comodidadesJson);

      console.log('Ejecutando stored procedure: sp_InsertarHabitacion');
      const result = await request.execute('sp_InsertarHabitacion');

      console.log('SP ejecutado exitosamente');

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const responseData = result.recordset[0];
      console.log(`Habitación insertada ID: ${responseData.habitacionID}`);

      return {
        success: true,
        data: {
          habitacionID: responseData.habitacionID,
          cedulaJuridica: responseData.cedulaJuridica,
          tipoHabitacionID: responseData.tipoHabitacionID,
          numero: responseData.numero,
          precio: responseData.precio,
          cantidadFotos: responseData.cantidadFotos,
          cantidadComodidades: responseData.cantidadComodidades,
          message: responseData.mensaje || 'Habitación insertada exitosamente'
        }
      };
    } catch (error) {
      console.error('Error detallado en roomDAO.insertRoom:', error);
      console.error('Error completo:', {
        name: error.name,
        message: error.message,
        number: error.number,
        code: error.code,
        state: error.state
      });

      // Manejo de errores específicos del SP
      if (error.message.includes('cédula jurídica') && error.message.includes('no existe')) {
        throw new Error('La cédula jurídica no existe en el sistema');
      } else if (error.message.includes('tipo de habitación') && error.message.includes('no existe')) {
        throw new Error('El tipo de habitación no existe en el sistema');
      } else if (error.message.includes('precio debe ser mayor')) {
        throw new Error('El precio debe ser mayor a cero');
      } else if (error.message.includes('Ya existe una habitación')) {
        throw new Error('Ya existe una habitación con ese número para este hospedaje');
      } else if (error.message.includes('al menos una foto')) {
        throw new Error('Debe proporcionar al menos una foto para la habitación');
      } else if (error.message.includes('al menos una comodidad')) {
        throw new Error('Debe proporcionar al menos una comodidad para la habitación');
      } else if (error.message.includes('comodidades proporcionadas no existen')) {
        throw new Error('Una o más comodidades proporcionadas no existen en el sistema');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos');
      } else {
        throw new Error(`Error al insertar la habitación: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  async getRoomsByCompany(cedulaJuridica) {
    try {
      console.log(`Obteniendo habitaciones para empresa: ${cedulaJuridica}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT 
            nombre,
            estado,
            habitacionID,
            numero,
            cedulaJuridica,
            precio,
            Expr1 as capacidad,
            descripcion,
            url
          FROM vw_habitacionesCompletas
          WHERE cedulaJuridica = @cedulaJuridica
          AND estado = 1
          ORDER BY numero
        `);

      console.log(`Habitaciones encontradas: ${result.recordset.length}`);

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset
      };
    } catch (error) {
      console.error('Error en roomDAO.getRoomsByCompany:', error);
      throw new Error(`Error al obtener habitaciones: ${error.message}`);
    }
  },

  async deleteRoom(habitacionID) {
    try {
      console.log(`Eliminando habitación ID: ${habitacionID}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('habitacionID', sql.Int, habitacionID)
        .query(`
          UPDATE Habitacion
          SET estado = 0
          WHERE habitacionID = @habitacionID
        `);

      return {
        success: true,
        rowsAffected: result.rowsAffected[0],
        message: 'Habitación desactivada exitosamente'
      };
    } catch (error) {
      console.error('Error en roomDAO.deleteRoom:', error);
      throw new Error(`Error al eliminar la habitación: ${error.message}`);
    }
  }
};

export default roomDAO;