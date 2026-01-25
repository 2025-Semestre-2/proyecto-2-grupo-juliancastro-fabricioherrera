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
  }
};

export default registerController;