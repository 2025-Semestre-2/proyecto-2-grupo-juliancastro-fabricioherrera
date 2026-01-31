import sql from 'mssql';
import crypto from 'crypto';

const loginDAO = {

  async authenticateUser(email, password) {
    try {
      console.log(`Intentando autenticar usuario: ${email}`);

      const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest();

      console.log('Contraseña encriptada para comparación');

      const pool = await sql.connect();

      console.log('Buscando cuenta en vw_cuentas...');
      const accountResult = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .input('contrasenia', sql.VarBinary(256), hashedPassword)
        .query(`
          SELECT 
            cuentaID, 
            correo, 
            rol
          FROM vw_cuentas
          WHERE correo = @correo 
            AND contrasenia = @contrasenia
        `);

      if (accountResult.recordset.length === 0) {
        console.log('Credenciales inválidas');
        throw new Error('INVALID_CREDENTIALS');
      }

      const account = accountResult.recordset[0];
      console.log(`Cuenta encontrada - ID: ${account.cuentaID}, Rol: ${account.rol}`);

      let userData = {
        cuentaID: account.cuentaID,
        correo: account.correo,
        rol: account.rol
      };

      switch (account.rol.toLowerCase()) {
        case 'user':
          console.log('Obteniendo datos de cliente desde vw_clientes...');
          const clientData = await this.getClientData(pool, email);
          // NEW: preserve cuentaID and normalize rol to "User"
          userData = { ...clientData, cuentaID: account.cuentaID, rol: 'User' };
          break;

        case 'hadmin':
          console.log('Obteniendo datos de hoteles');
          const hotelData = await this.getHotelData(pool, email);
          userData = { ...hotelData, cuentaID: account.cuentaID };
          break;

        case 'eadmin':
          console.log('Obteniendo datos de empresas');
          // userData = await this.getAdministradorData(pool, email);
          break;

        default:
          console.log(`Rol desconocido: ${account.rol}`);
          break;
      }

      console.log('Autenticación exitosa');
      return {
        success: true,
        data: userData
      };

    } catch (error) {
      console.error('Error en loginDAO.authenticateUser:', error);
      
      if (error.message === 'INVALID_CREDENTIALS') {
        throw new Error('Correo o contraseña incorrectos');
      }
      
      throw new Error(`Error al autenticar usuario: ${error.message}`);
    }
  },

  async getClientData(pool, email) {
    try {
      const result = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .query(`
          SELECT 
            identificacion,
            nombre,
            primerApellido,
            segundoApellido,
            fechaNacimiento,
            pais,
            codigoTelefonico,
            distrito,
            telefono1,
            telefono2,
            correo
          FROM vw_clientes
          WHERE correo = @correo
        `);

      if (result.recordset.length === 0) {
        throw new Error('No se encontraron datos del cliente');
      }
      const cliente = result.recordset[0];
      return {
        // NEW: normalize role to "User" for consistency with client checks
        rol: 'User',
        correo: cliente.correo,
        identificacion: cliente.identificacion,
        nombre: cliente.nombre,
        primerApellido: cliente.primerApellido,
        segundoApellido: cliente.segundoApellido || '',
        nombreCompleto: `${cliente.nombre} ${cliente.primerApellido} ${cliente.segundoApellido || ''}`.trim(),
        fechaNacimiento: cliente.fechaNacimiento,
        pais: cliente.pais,
        codigoTelefonico: cliente.codigoTelefonico,
        distrito: cliente.distrito,
        telefono1: cliente.telefono1,
        telefono2: cliente.telefono2
      };
    } catch (error) {
      console.error('Error al obtener datos del cliente:', error);
      throw error;
    }
  },

  async emailExists(email) {
    try {
      console.log(`Verificando existencia del email: ${email}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .query('SELECT COUNT(*) as count FROM vw_cuentas WHERE correo = @correo');
      
      const exists = result.recordset[0].count > 0;
      console.log(`Email ${email} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('Error en loginDAO.emailExists:', error);
      throw new Error(`Error al verificar el correo: ${error.message}`);
    }
  },
  async getHotelData(pool, email) {
    try {
      console.log(`Obteniendo datos del hospedaje con email: ${email}`);
      
      const result = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .query(`
          SELECT 
            nombre,
            provincia,
            tipo,
            distrito,
            cedulaJuridica,
            nombreHospedaje,
            correo,
            webURL,
            barrio,
            referencias,
            telefono1,
            telefono2,
            pais,
            codigoTelefonico
          FROM vw_hospedajes
          WHERE correo = @correo
        `);

      if (result.recordset.length === 0) {
        throw new Error('No se encontraron datos del hospedaje');
      }

      const hospedaje = result.recordset[0];
      console.log('Datos del hospedaje obtenidos exitosamente');

      return {
        rol: 'HAdmin',
        correo: hospedaje.correo,
        cedulaJuridica: hospedaje.cedulaJuridica,
        nombreHospedaje: hospedaje.nombreHospedaje,
        nombre: hospedaje.nombre,
        tipo: hospedaje.tipo,
        pais: hospedaje.pais,
        provincia: hospedaje.provincia,
        distrito: hospedaje.distrito,
        barrio: hospedaje.barrio,
        referencias: hospedaje.referencias,
        codigoTelefonico: hospedaje.codigoTelefonico,
        telefono1: hospedaje.telefono1,
        telefono2: hospedaje.telefono2,
        webURL: hospedaje.webURL
      };
    } catch (error) {
      console.error('Error al obtener datos del hospedaje:', error);
      throw error;
    }
  }
};

export default loginDAO;