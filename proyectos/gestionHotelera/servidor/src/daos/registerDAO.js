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

      console.log('Ejecutando stored procedure: sp_RegistrarClienteConCuenta');
      const result = await request.execute('sp_RegistrarClienteConCuenta');
      
      console.log('SP ejecutado exitosamente');

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const cuentaID = result.recordset[0].cuentaID;
      console.log(`Usuario registrado con cuentaID: ${cuentaID}`);

      return {
        success: true,
        data: {
          cuentaID: cuentaID,
          message: 'Usuario registrado exitosamente'
        }
      };
    } catch (error) {
      console.error('Error detallado en registerDAO.registerUser:', error);
      
      if (error.number === 50001) {
        throw new Error('Rol no válido');
      } else if (error.number === 50002) {
        throw new Error('País no válido');
      } else if (error.number === 50003) {
        throw new Error('Distrito, Cantón o Provincia no válidos');
      } else if (error.number === 2627 || error.number === 2601) {
        if (error.message.includes('correo') || error.message.includes('Cuenta')) {
          throw new Error('El correo electrónico ya está registrado');
        } else if (error.message.includes('identificacion') || error.message.includes('Cliente')) {
          throw new Error('La identificación ya está registrada');
        }
        throw new Error('El correo electrónico o identificación ya están registrados');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos');
      } else {
        throw new Error(`Error al registrar el usuario: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  async registerHotel(hotelData) {
    try {
      console.log('Iniciando registro de hospedaje:', {
        name: hotelData.name,
        idNumber: hotelData.idNumber,
        email: hotelData.email,
        adminMail: hotelData.adminMail
      });

      const hashedPassword = crypto
        .createHash('sha256')
        .update(hotelData.password)
        .digest();
      console.log('Contraseña encriptada correctamente');

      const socialMediaJSON = hotelData.socialMedia 
        ? JSON.stringify(hotelData.socialMedia) 
        : null;

      const servicesJSON = hotelData.services 
        ? JSON.stringify(hotelData.services) 
        : null;

      console.log('Datos preparados:', {
        socialMedia: socialMediaJSON,
        services: servicesJSON
      });

      const pool = await sql.connect();
      console.log('Conexión al pool establecida');

      const request = pool.request();
      console.log('Configurando parámetros del SP para hospedaje...');

      request.input('nombre', sql.VarChar(50), hotelData.name);
      request.input('cedulaJuridica', sql.VarChar(10), hotelData.idNumber);
      request.input('tipoHospedaje', sql.VarChar(20), hotelData.type);
      request.input('correo', sql.VarChar(30), hotelData.email);
      request.input('webURL', sql.VarChar(150), hotelData.webURL || null);
      request.input('provincia', sql.VarChar(50), hotelData.province || null);
      request.input('canton', sql.VarChar(50), hotelData.city || null);
      request.input('distrito', sql.VarChar(50), hotelData.district || null);
      request.input('barrio', sql.VarChar(50), hotelData.town || null);
      request.input('referencias', sql.VarChar(sql.MAX), hotelData.references);
      request.input('mapsLink', sql.VarChar(150), hotelData.mapsLink || null);
      request.input('telefono1', sql.VarChar(8), hotelData.phone1);
      request.input('telefono2', sql.VarChar(8), hotelData.phone2 || null);
      request.input('correoAdmin', sql.VarChar(30), hotelData.adminMail);
      request.input('contrasenia', sql.VarBinary(sql.MAX), hashedPassword);
      request.input('redesSociales', sql.NVarChar(sql.MAX), socialMediaJSON);
      request.input('servicios', sql.NVarChar(sql.MAX), servicesJSON);

      console.log('Parámetros configurados. Ejecutando SP...');
      const result = await request.execute('sp_RegistrarHospedaje');
      
      console.log('SP ejecutado exitosamente');
      console.log('Resultado del SP:', result);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const responseData = result.recordset[0];
      console.log(`Hospedaje registrado con cuentaID: ${responseData.cuentaID}`);

      return {
        success: true,
        data: {
          cuentaID: responseData.cuentaID,
          cedulaJuridica: responseData.cedulaJuridica,
          message: responseData.mensaje || 'Hospedaje registrado exitosamente'
        }
      };
    } catch (error) {
      console.error('Error detallado en registerDAO.registerHotel:', error);
      console.error('Error completo:', {
        name: error.name,
        message: error.message,
        number: error.number,
        code: error.code,
        state: error.state
      });

      if (error.number === 50003) {
        throw new Error('Distrito, Cantón o Provincia no válidos');
      } else if (error.number === 50004) {
        throw new Error('Tipo de hospedaje no válido');
      } else if (error.number === 2627 || error.number === 2601) {
        if (error.message.includes('correo') || error.message.includes('Cuenta')) {
          throw new Error('El correo electrónico ya está registrado');
        } else if (error.message.includes('cedulaJuridica') || error.message.includes('Hospedaje')) {
          throw new Error('La cédula jurídica ya está registrada');
        }
        throw new Error('El correo electrónico o cédula jurídica ya están registrados');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos');
      } else {
        throw new Error(`Error al registrar el hospedaje: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  async registerActivity(activityData) {
    try {
      console.log('Iniciando registro de empresa/actividad:', {
        name: activityData.name,
        idNumber: activityData.idNumber,
        email: activityData.email,
        adminMail: activityData.adminMail
      });

      const hashedPassword = crypto
        .createHash('sha256')
        .update(activityData.password)
        .digest();
      console.log('Contraseña encriptada correctamente');

      const servicesJSON = activityData.services 
        ? JSON.stringify(activityData.services) 
        : null;

      const activityTypesJSON = activityData.activityTypes 
        ? JSON.stringify(activityData.activityTypes) 
        : null;

      console.log('Datos preparados:', {
        services: servicesJSON,
        activityTypes: activityTypesJSON
      });

      const pool = await sql.connect();
      console.log('Conexión al pool establecida');

      const request = pool.request();
      console.log('Configurando parámetros del SP para empresa/actividad...');

      request.input('nombre', sql.VarChar(25), activityData.name);
      request.input('cedulaJuridica', sql.VarChar(10), activityData.idNumber);
      request.input('nombreContacto', sql.VarChar(25), activityData.contactName);
      request.input('correo', sql.VarChar(50), activityData.email);
      request.input('telefono', sql.VarChar(8), activityData.phone);
      request.input('provincia', sql.VarChar(50), activityData.province);
      request.input('canton', sql.VarChar(50), activityData.city);
      request.input('distrito', sql.VarChar(50), activityData.district);
      request.input('referencias', sql.VarChar(sql.MAX), activityData.references);
      request.input('descripcion', sql.VarChar(sql.MAX), activityData.description);
      request.input('correoAdmin', sql.VarChar(30), activityData.adminMail);
      request.input('contrasenia', sql.VarBinary(sql.MAX), hashedPassword);
      request.input('servicios', sql.NVarChar(sql.MAX), servicesJSON);
      request.input('tiposActividad', sql.NVarChar(sql.MAX), activityTypesJSON);

      console.log('Parámetros configurados. Ejecutando SP...');
      const result = await request.execute('sp_RegistrarEmpresa');
      
      console.log('SP ejecutado exitosamente');
      console.log('Resultado del SP:', result);

      if (!result.recordset || result.recordset.length === 0) {
        throw new Error('El stored procedure no retornó ningún resultado');
      }

      const responseData = result.recordset[0];
      console.log(`Empresa registrada con cuentaID: ${responseData.cuentaID}`);

      return {
        success: true,
        data: {
          cuentaID: responseData.cuentaID,
          cedulaJuridica: responseData.cedulaJuridica,
          message: responseData.mensaje || 'Empresa registrada exitosamente'
        }
      };
    } catch (error) {
      console.error('Error detallado en registerDAO.registerActivity:', error);
      console.error('Error completo:', {
        name: error.name,
        message: error.message,
        number: error.number,
        code: error.code,
        state: error.state
      });

      if (error.number === 50003) {
        throw new Error('Distrito, Cantón o Provincia no válidos');
      } else if (error.number === 2627 || error.number === 2601) {
        if (error.message.includes('correo') || error.message.includes('Cuenta')) {
          throw new Error('El correo electrónico ya está registrado');
        } else if (error.message.includes('cedulaJuridica') || error.message.includes('Empresa')) {
          throw new Error('La cédula jurídica ya está registrada');
        }
        throw new Error('El correo electrónico o cédula jurídica ya están registrados');
      } else if (error.code === 'ELOGIN') {
        throw new Error('Error de autenticación con la base de datos');
      } else if (error.code === 'ETIMEOUT') {
        throw new Error('Tiempo de espera agotado al conectar con la base de datos');
      } else if (error.code === 'EREQUEST') {
        throw new Error(`Error en la petición SQL: ${error.message}`);
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a la base de datos');
      } else {
        throw new Error(`Error al registrar la empresa: ${error.message || 'Error desconocido'}`);
      }
    }
  },

  async emailExists(email) {
    try {
      console.log(`Verificando disponibilidad del email: ${email}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .query('SELECT COUNT(*) as count FROM vw_cuentas WHERE correo = @correo');
      
      const exists = result.recordset[0].count > 0;
      console.log(`Email ${email} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('Error en registerDAO.emailExists:', error);
      throw new Error(`Error al verificar el correo: ${error.message}`);
    }
  },

  async identificationExists(identification) {
    try {
      console.log(`Verificando disponibilidad de la identificación: ${identification}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('identificacion', sql.VarChar(12), identification)
        .query('SELECT COUNT(*) as count FROM vw_clientes WHERE identificacion = @identificacion');
      
      const exists = result.recordset[0].count > 0;
      console.log(`Identificación ${identification} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('Error en registerDAO.identificationExists:', error);
      throw new Error(`Error al verificar la identificación: ${error.message}`);
    }
  },

  async hotelEmailExists(email) {
    try {
      console.log(`Verificando disponibilidad del email de hospedaje: ${email}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('correo', sql.VarChar(30), email)
        .query('SELECT COUNT(*) as count FROM vw_hospedajes WHERE correo = @correo');
      
      const exists = result.recordset[0].count > 0;
      console.log(`Email de hospedaje ${email} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('Error en registerDAO.hotelEmailExists:', error);
      throw new Error(`Error al verificar el correo del hospedaje: ${error.message}`);
    }
  },

  async activityEmailExists(email) {
    try {
      console.log(`Verificando disponibilidad del email de empresa: ${email}`);
      
      const pool = await sql.connect();
      const result = await pool.request()
        .input('correo', sql.VarChar(50), email)
        .query('SELECT COUNT(*) as count FROM vw_empresas WHERE correo = @correo');
      
      const exists = result.recordset[0].count > 0;
      console.log(`Email de empresa ${email} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('Error en registerDAO.activityEmailExists:', error);
      throw new Error(`Error al verificar el correo de la empresa: ${error.message}`);
    }
  },

  async cedulaJuridicaExists(cedulaJuridica) {
    try {
      console.log(`Verificando disponibilidad de la cédula jurídica: ${cedulaJuridica}`);
      
      const pool = await sql.connect();
      
      const hotelResult = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query('SELECT COUNT(*) as count FROM vw_hospedajes WHERE cedulaJuridica = @cedulaJuridica');
      
      const empresaResult = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query('SELECT COUNT(*) as count FROM vw_empresas WHERE cedulaJuridica = @cedulaJuridica');
      
      const exists = hotelResult.recordset[0].count > 0 || empresaResult.recordset[0].count > 0;
      console.log(`Cédula jurídica ${cedulaJuridica} existe: ${exists}`);
      
      return exists;
    } catch (error) {
      console.error('Error en registerDAO.cedulaJuridicaExists:', error);
      throw new Error(`Error al verificar la cédula jurídica: ${error.message}`);
    }
  }
};

export default registerDAO;