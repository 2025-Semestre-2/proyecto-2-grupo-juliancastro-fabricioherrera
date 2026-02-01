import sql from 'mssql';

const activityDAO = {
  async insertActivity(activityData) {
    try {
      console.log('Iniciando inserción de actividad:', {
        cedulaJuridica: activityData.cedulaJuridica,
        titulo: activityData.titulo,
        tipoActividad: activityData.tipoActividadNombre
      });

      const pool = await sql.connect();
      console.log('Conexión al pool establecida');

      const request = pool.request();
      console.log('Configurando parámetros del SP...');

      request.input('cedulaJuridica', sql.VarChar(10), activityData.cedulaJuridica);
      request.input('tipoActividadNombre', sql.VarChar(50), activityData.tipoActividadNombre);
      request.input('titulo', sql.VarChar(50), activityData.titulo);
      request.input('descripcion', sql.VarChar(sql.MAX), activityData.descripcion);
      request.input('precio', sql.Money, activityData.precio);
      request.input('fotoTitulo', sql.VarChar(50), activityData.fotoTitulo);
      request.input('fotoUrl', sql.VarChar(150), activityData.fotoUrl);

      console.log('Ejecutando stored procedure: sp_InsertarEmpresaActividad');
      const result = await request.execute('sp_InsertarEmpresaActividad');

      console.log('SP ejecutado exitosamente');

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const responseData = result.recordset[0];
      console.log(`Actividad insertada para empresa: ${responseData.cedulaJuridica}`);

      return {
        success: true,
        data: {
          cedulaJuridica: responseData.cedulaJuridica,
          tipoActividadID: responseData.tipoActividadID,
          fotoID: responseData.fotoID,
          message: responseData.mensaje || 'Actividad insertada exitosamente'
        }
      };
    } catch (error) {
      console.error('Error detallado en activityDAO.insertActivity:', error);
      console.error('Error completo:', {
        name: error.name,
        message: error.message,
        number: error.number,
        code: error.code,
        state: error.state
      });

      if (error.number === 50001) {
        throw new Error('La cédula jurídica no existe en el sistema');
      } else if (error.number === 50002) {
        throw new Error('El tipo de actividad no existe en el sistema');
      } else if (error.number === 50003) {
        throw new Error('Ya existe una actividad de este tipo para esta empresa');
      } else if (error.number === 2627 || error.number === 2601) {
        throw new Error('Ya existe una actividad con estos datos');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos');
      } else {
        throw new Error(`Error al insertar la actividad: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  async updateActivity(empresaActividadID, activityData) {
    try {
      console.log('Iniciando actualización de actividad:', {
        empresaActividadID,
        titulo: activityData.titulo,
        tipoActividad: activityData.tipoActividadNombre
      });

      const pool = await sql.connect();
      console.log('Conexión al pool establecida');

      const request = pool.request();
      console.log('Configurando parámetros del SP...');

      request.input('empresaActividadID', sql.Int, empresaActividadID);
      request.input('tipoActividadNombre', sql.VarChar(50), activityData.tipoActividadNombre);
      request.input('titulo', sql.VarChar(50), activityData.titulo);
      request.input('descripcion', sql.VarChar(sql.MAX), activityData.descripcion);
      request.input('precio', sql.Money, activityData.precio);
      
      // Solo enviar foto si se proporcionó una nueva
      if (activityData.fotoTitulo && activityData.fotoUrl) {
        request.input('fotoTitulo', sql.VarChar(50), activityData.fotoTitulo);
        request.input('fotoUrl', sql.VarChar(150), activityData.fotoUrl);
      }

      console.log('Ejecutando stored procedure: sp_ActualizarEmpresaActividad');
      const result = await request.execute('sp_ActualizarEmpresaActividad');

      console.log('SP ejecutado exitosamente');

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const responseData = result.recordset[0];
      console.log(`Actividad actualizada ID: ${responseData.empresaActividadID}`);

      return {
        success: true,
        data: {
          empresaActividadID: responseData.empresaActividadID,
          cedulaJuridica: responseData.cedulaJuridica,
          tipoActividadID: responseData.tipoActividadID,
          fotoID: responseData.fotoID,
          message: responseData.mensaje || 'Actividad actualizada exitosamente'
        }
      };
    } catch (error) {
      console.error('Error detallado en activityDAO.updateActivity:', error);
      console.error('Error completo:', {
        name: error.name,
        message: error.message,
        number: error.number,
        code: error.code,
        state: error.state
      });

      if (error.number === 50001) {
        throw new Error('La actividad no existe o está inactiva');
      } else if (error.number === 50002) {
        throw new Error('El tipo de actividad no existe en el sistema');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos');
      } else {
        throw new Error(`Error al actualizar la actividad: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  async getActivitiesByCompany(cedulaJuridica) {
    try {
      console.log(`Obteniendo actividades para empresa: ${cedulaJuridica}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT 
            empresaActividadID,
            cuentaID,
            cedulaJuridica,
            activo,
            precio,
            titulo,
            descripcion,
            foto,
            url,
            nombre
          FROM vw_actividades
          WHERE cedulaJuridica = @cedulaJuridica
          AND activo = 1
          ORDER BY titulo
        `);

      console.log(`Actividades encontradas: ${result.recordset.length}`);

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset
      };
    } catch (error) {
      console.error('Error en activityDAO.getActivitiesByCompany:', error);
      throw new Error(`Error al obtener actividades: ${error.message}`);
    }
  },

  async deleteActivity(empresaActividadID) {
    try {
      console.log(`Eliminando actividad ID: ${empresaActividadID}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('empresaActividadID', sql.Int, empresaActividadID)
        .query(`
          UPDATE EmpresaActividad
          SET activo = 0
          WHERE empresaActividadID = @empresaActividadID
        `);

      return {
        success: true,
        rowsAffected: result.rowsAffected[0],
        message: 'Actividad desactivada exitosamente'
      };
    } catch (error) {
      console.error('Error en activityDAO.deleteActivity:', error);
      throw new Error(`Error al eliminar la actividad: ${error.message}`);
    }
  },
    async getActivitiesByCompany(cedulaJuridica) {
    try {
      console.log(`Obteniendo actividades para empresa: ${cedulaJuridica}`);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT 
            empresaActividadID,
            cuentaID,
            cedulaJuridica,
            activo,
            precio,
            titulo,
            descripcion,
            foto,
            url,
            nombre
          FROM vw_actividades
          WHERE cedulaJuridica = @cedulaJuridica
          AND activo = 1
          ORDER BY titulo
        `);

      console.log(`Actividades encontradas: ${result.recordset.length}`);

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset
      };
    } catch (error) {
      console.error('Error en activityDAO.getActivitiesByCompany:', error);
      throw new Error(`Error al obtener actividades: ${error.message}`);
    }
  },
    async getAllActivities() {
    try {
      console.log('Obteniendo todas las actividades activas');

      const pool = await sql.connect();
      const result = await pool.request()
        .query(`
          SELECT 
            empresaActividadID,
            cuentaID,
            cedulaJuridica,
            activo,
            precio,
            titulo,
            descripcion,
            foto,
            url,
            nombre
          FROM vw_actividades
          WHERE activo = 1
          ORDER BY empresaActividadID DESC
        `);

      console.log(`Actividades encontradas: ${result.recordset.length}`);

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset
      };
    } catch (error) {
      console.error('Error en activityDAO.getAllActivities:', error);
      throw new Error(`Error al obtener actividades: ${error.message}`);
    }
  }
};

export default activityDAO;