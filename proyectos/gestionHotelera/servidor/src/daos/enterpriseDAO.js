import sql from 'mssql';

const empresaDAO = {
  async getEmpresaByCuentaID(cuentaID) {
    try {
      console.log('Obteniendo datos de empresa para cuentaID:', cuentaID);

      const pool = await sql.connect();
      const result = await pool.request()
        .input('cuentaID', sql.Int, cuentaID)
        .query(`
          SELECT 
            provincia,
            canton,
            distrito,
            cedulaJuridica,
            nombre,
            correo,
            telefono,
            nombreContacto,
            referencias,
            cuentaID,
            descripcion
          FROM vw_empresas
          WHERE cuentaID = @cuentaID
        `);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('No se encontró la empresa con el cuentaID proporcionado');
      }

      console.log('Empresa encontrada:', result.recordset[0].nombre);

      return {
        success: true,
        data: result.recordset[0]
      };
    } catch (error) {
      console.error('Error en empresaDAO.getEmpresaByCuentaID:', error);
      throw new Error(`Error al obtener datos de la empresa: ${error.message}`);
    }
  }
};

export default empresaDAO;