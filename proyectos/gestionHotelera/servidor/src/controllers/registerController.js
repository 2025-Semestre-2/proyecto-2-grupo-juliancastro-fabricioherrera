import registerDAO from '../daos/registerDAO.js';

const registerController = {
  async registerUser(req, res) {
    try {
      const userData = req.body;
      if (!userData.email || !userData.password || !userData.name || 
          !userData.firstLastName || !userData.idNumber || !userData.birthdate ||
          !userData.country || !userData.phone1) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios'
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de correo electrónico inválido'
        });
      }
      if (userData.password.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 8 caracteres'
        });
      }
      const emailExists = await registerDAO.emailExists(userData.email);
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: 'El correo electrónico ya está registrado'
        });
      }
      const idExists = await registerDAO.identificationExists(userData.idNumber);
      if (idExists) {
        return res.status(409).json({
          success: false,
          message: 'La identificación ya está registrada'
        });
      }
      if (userData.country === 'COSTA RICA' || userData.country === 'Costa Rica') {
        if (!userData.province || !userData.city || !userData.district) {
          return res.status(400).json({
            success: false,
            message: 'Para Costa Rica debe proporcionar provincia, cantón y distrito'
          });
        }
      }
      const result = await registerDAO.registerUser(userData);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error en registerController.registerUser:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error al registrar el usuario'
      });
    }
  },

  async registerHotel(req, res) {
    try {
      const hotelData = req.body;
      console.log('Datos recibidos para registro de hospedaje:', hotelData);
      if (!hotelData.name || !hotelData.idNumber || !hotelData.type ||
          !hotelData.email || !hotelData.references || !hotelData.phone1 ||
          !hotelData.adminMail || !hotelData.password) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios'
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(hotelData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de correo electrónico del hospedaje inválido'
        });
      }

      if (!emailRegex.test(hotelData.adminMail)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de correo electrónico administrativo inválido'
        });
      }
      if (hotelData.password.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 8 caracteres'
        });
      }
      const cedulaRegex = /^3\d{9}$/;
      if (!cedulaRegex.test(hotelData.idNumber)) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica debe empezar con 3 y tener 10 dígitos'
        });
      }
      const hotelEmailExists = await registerDAO.hotelEmailExists(hotelData.email);
      if (hotelEmailExists) {
        return res.status(409).json({
          success: false,
          message: 'El correo electrónico del hospedaje ya está registrado'
        });
      }
      const adminEmailExists = await registerDAO.emailExists(hotelData.adminMail);
      if (adminEmailExists) {
        return res.status(409).json({
          success: false,
          message: 'El correo electrónico administrativo ya está registrado'
        });
      }
      const cedulaExists = await registerDAO.cedulaJuridicaExists(hotelData.idNumber);
      if (cedulaExists) {
        return res.status(409).json({
          success: false,
          message: 'La cédula jurídica ya está registrada'
        });
      }
      if (hotelData.country === 'COSTA RICA' || hotelData.country === 'Costa Rica') {
        if (!hotelData.province || !hotelData.city || !hotelData.district || !hotelData.town) {
          return res.status(400).json({
            success: false,
            message: 'Para Costa Rica debe proporcionar provincia, cantón, distrito y barrio'
          });
        }
      }

      if (hotelData.webURL || hotelData.mapsLink || hotelData.socialMedia) {
        const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        
        if (hotelData.webURL && !urlRegex.test(hotelData.webURL)) {
          return res.status(400).json({
            success: false,
            message: 'El sitio web debe ser una URL válida'
          });
        }

        if (hotelData.mapsLink && !urlRegex.test(hotelData.mapsLink)) {
          return res.status(400).json({
            success: false,
            message: 'El link de Maps debe ser una URL válida'
          });
        }
        if (hotelData.socialMedia) {
          for (const [key, url] of Object.entries(hotelData.socialMedia)) {
            if (url && !urlRegex.test(url)) {
              return res.status(400).json({
                success: false,
                message: `La URL de ${key} no es válida`
              });
            }
          }
        }
      }
      const result = await registerDAO.registerHotel(hotelData);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error en registerController.registerHotel:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error al registrar el hospedaje'
      });
    }
  },

  async registerActivity(req, res) {
    try {
      const activityData = req.body;
      console.log('Datos recibidos para registro de empresa/actividad:', activityData);
      
      if (!activityData.name || !activityData.idNumber || !activityData.contactName ||
          !activityData.email || !activityData.phone || !activityData.references ||
          !activityData.description || !activityData.adminMail || !activityData.password) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(activityData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de correo electrónico de la empresa inválido'
        });
      }

      if (!emailRegex.test(activityData.adminMail)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de correo electrónico administrativo inválido'
        });
      }

      if (activityData.password.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 8 caracteres'
        });
      }

      const cedulaRegex = /^3\d{9}$/;
      if (!cedulaRegex.test(activityData.idNumber)) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica debe empezar con 3 y tener 10 dígitos'
        });
      }

      const activityEmailExists = await registerDAO.activityEmailExists(activityData.email);
      if (activityEmailExists) {
        return res.status(409).json({
          success: false,
          message: 'El correo electrónico de la empresa ya está registrado'
        });
      }

      const adminEmailExists = await registerDAO.emailExists(activityData.adminMail);
      if (adminEmailExists) {
        return res.status(409).json({
          success: false,
          message: 'El correo electrónico administrativo ya está registrado'
        });
      }

      const cedulaExists = await registerDAO.cedulaJuridicaExists(activityData.idNumber);
      if (cedulaExists) {
        return res.status(409).json({
          success: false,
          message: 'La cédula jurídica ya está registrada'
        });
      }

      if (!activityData.province || !activityData.city || !activityData.district) {
        return res.status(400).json({
          success: false,
          message: 'Debe proporcionar provincia, cantón y distrito'
        });
      }

      const result = await registerDAO.registerActivity(activityData);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error en registerController.registerActivity:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error al registrar la empresa'
      });
    }
  },

  async checkEmailAvailability(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'El correo es requerido'
        });
      }
      const exists = await registerDAO.emailExists(email);
      return res.status(200).json({
        success: true,
        available: !exists
      });
    } catch (error) {
      console.error('Error en registerController.checkEmailAvailability:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar disponibilidad del correo'
      });
    }
  },

  async checkIdAvailability(req, res) {
    try {
      const { identification } = req.query;
      if (!identification) {
        return res.status(400).json({
          success: false,
          message: 'La identificación es requerida'
        });
      }
      const exists = await registerDAO.identificationExists(identification);
      return res.status(200).json({
        success: true,
        available: !exists
      });
    } catch (error) {
      console.error('Error en registerController.checkIdAvailability:', error);

      return res.status(500).json({
        success: false,
        message: 'Error al verificar disponibilidad de la identificación'
      });
    }
  },

  async checkHotelEmailAvailability(req, res) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'El correo es requerido'
        });
      }
      const exists = await registerDAO.hotelEmailExists(email);
      return res.status(200).json({
        success: true,
        available: !exists
      });
    } catch (error) {
      console.error('Error en registerController.checkHotelEmailAvailability:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar disponibilidad del correo'
      });
    }
  },

  async checkActivityEmailAvailability(req, res) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'El correo es requerido'
        });
      }
      const exists = await registerDAO.activityEmailExists(email);
      return res.status(200).json({
        success: true,
        available: !exists
      });
    } catch (error) {
      console.error('Error en registerController.checkActivityEmailAvailability:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar disponibilidad del correo'
      });
    }
  },

  async checkCedulaAvailability(req, res) {
    try {
      const { cedula } = req.query;

      if (!cedula) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }
      const exists = await registerDAO.cedulaJuridicaExists(cedula);
      return res.status(200).json({
        success: true,
        available: !exists
      });
    } catch (error) {
      console.error('Error en registerController.checkCedulaAvailability:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar disponibilidad de la cédula jurídica'
      });
    }
  }
};

export default registerController;