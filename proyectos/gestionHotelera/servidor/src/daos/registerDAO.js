import sql from 'mssql';
import crypto from 'crypto';

const registerDAO = {
  async registerUser(userData) {
    try {
      console.log('Iniciando registro de usuario:', {
        email: userData.email,
        idNumber: userData.idNumber,
        country: userData.country
      });

      const hashedPassword = crypto
        .createHash('sha256')
        .update(userData.password)
        .digest();
      console.log('Contraseña encriptada correctamente');
      const pool = await sql.connect();
      console.log('Conexión al pool establecida');
      const request = pool.request();
      console.log('Configurando parámetros del SP...');
      request.input('correo', sql.VarChar(30), userData.email);
      request.input('contrasenia', sql.VarBinary(256), hashedPassword);
      request.input('identificacion', sql.VarChar(12), userData.idNumber);
      request.input('nombre', sql.VarChar(20), userData.name);
      request.input('primerApellido', sql.VarChar(20), userData.firstLastName);
      request.input('segundoApellido', sql.VarChar(20), userData.secLastName || null);
      request.input('fechaNacimiento', sql.Date, new Date(userData.birthdate));
      request.input('pais', sql.VarChar(20), userData.country);
      request.input('provincia', sql.VarChar(20), userData.province || null);
      request.input('canton', sql.VarChar(20), userData.city || null);
      request.input('distrito', sql.VarChar(20), userData.district || null);
      request.input('telefono1', sql.VarChar(8), userData.phone1);
      request.input('telefono2', sql.VarChar(8), userData.phone2 || null);
      console.log('Parámetros configurados:', {
        correo: userData.email,
        identificacion: userData.idNumber,
        nombre: userData.name,
        primerApellido: userData.firstLastName,
        segundoApellido: userData.secLastName || null,
        fechaNacimiento: userData.birthdate,
        pais: userData.country,
        provincia: userData.province || null,
        canton: userData.city || null,
        distrito: userData.district || null,
        telefono1: userData.phone1,
        telefono2: userData.phone2 || null
      });

      // Ejecutar el stored procedure
      console.log('🚀 Ejecutando stored procedure: sp_RegistrarClienteConCuenta');
      const result = await request.execute('sp_RegistrarClienteConCuenta');
      
      console.log('✅ SP ejecutado exitosamente');
      console.log('📊 Resultado del SP:', result);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const cuentaID = result.recordset[0].cuentaID;
      console.log(`✅ Usuario registrado con cuentaID: ${cuentaID}`);

      return {
        success: true,
        data: {
          cuentaID: cuentaID,
          message: 'Usuario registrado exitosamente'
        }
      };
    } catch (error) {
      console.error('❌ Error detallado en registerDAO.registerUser:');
      console.error('Error completo:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error number:', error.number);
      console.error('Error code:', error.code);
      console.error('Error state:', error.state);
      console.error('Error class:', error.class);
      console.error('Error lineNumber:', error.lineNumber);
      console.error('Error serverName:', error.serverName);
      console.error('Error procName:', error.procName);
      
      // Manejar errores específicos del stored procedure
      if (error.number === 50001) {
        throw new Error('Rol no válido');
      } else if (error.number === 50002) {
        throw new Error('País no válido');
      } else if (error.number === 50003) {
        throw new Error('Distrito, Cantón o Provincia no válidos');
      } else if (error.number === 2627 || error.number === 2601) {
        // Violación de clave única
        if (error.message.includes('correo') || error.message.includes('Cuenta')) {
          throw new Error('El correo electrónico ya está registrado');
        } else if (error.message.includes('identificacion') || error.message.includes('Cliente')) {
          throw new Error('La identificación ya está registrada');
        }
        throw new Error('El correo electrónico o identificación ya están registrados');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos. Verifica las credenciales.');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos. Verifica que SQL Server esté corriendo.');
      } else {
        // Error genérico con más detalles
        throw new Error(`Error al registrar el usuario: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  /**
   * Verifica si un correo ya está registrado
   * @param {string} email - Correo a verificar
   * @returns {Promise<boolean>} True si existe, false si no
   */
  async emailExists(email) {
    try {
      console.log(`🔍 Verificando disponibilidad del email: ${email}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .query('SELECT COUNT(*) as count FROM Cuenta WHERE correo = @correo');
      
      const exists = result.recordset[0].count > 0;
      console.log(`📧 Email ${email} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('❌ Error en registerDAO.emailExists:', error);
      throw new Error(`Error al verificar el correo: ${error.message}`);
    }
  },

  /**
   * Verifica si una identificación ya está registrada
   * @param {string} identification - Identificación a verificar
   * @returns {Promise<boolean>} True si existe, false si no
   */
  async identificationExists(identification) {
    try {
      console.log(`🔍 Verificando disponibilidad de la identificación: ${identification}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('identificacion', sql.VarChar(12), identification)
        .query('SELECT COUNT(*) as count FROM Cliente WHERE identificacion = @identificacion');
      
      const exists = result.recordset[0].count > 0;
      console.log(`🆔 Identificación ${identification} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('❌ Error en registerDAO.identificationExists:', error);
      throw new Error(`Error al verificar la identificación: ${error.message}`);
    }
  }
};

export default registerDAO;