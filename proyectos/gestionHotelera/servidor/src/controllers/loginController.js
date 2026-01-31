import loginDAO from '../daos/loginDAO.js';
import jwt from 'jsonwebtoken';
import config from '../config/environment.js';

const JWT_SECRET = config.jwt.secret;

const loginController = {

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(`Solicitud de login recibida para: ${email}`);

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'El correo y la contraseña son requeridos'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de correo electrónico inválido'
        });
      }

      const result = await loginDAO.authenticateUser(email, password);

      console.log(`Login exitoso - Usuario: ${email}, Rol: ${result.data.rol}`);

      // Generar token JWT
      const token = jwt.sign(
        { 
          cuentaID: result.data.cuentaID,
          email: result.data.correo,
          rol: result.data.rol
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user: result.data,
          token: token
        }
      });

    } catch (error) {
      console.error('Error en loginController.login:', error);

      if (error.message === 'Correo o contraseña incorrectos') {
        return res.status(401).json({
          success: false,
          message: 'Correo o contraseña incorrectos'
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Error al procesar el inicio de sesión'
      });
    }
  },

  async logout(req, res) {
    try {
      console.log('Solicitud de logout recibida');

      return res.status(200).json({
        success: true,
        message: 'Sesión cerrada exitosamente'
      });

    } catch (error) {
      console.error('Error en loginController.logout:', error);
      
      return res.status(500).json({
        success: false,
        message: 'Error al cerrar sesión'
      });
    }
  },

  async verifyAuth(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Bearer token

      if (!token) {
        return res.status(401).json({
          success: false,
          authenticated: false,
          message: 'Token no proporcionado'
        });
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({
          success: true,
          authenticated: true,
          user: decoded,
          message: 'Token válido'
        });
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          authenticated: false,
          message: 'Token inválido o expirado'
        });
      }

    } catch (error) {
      console.error('❌ Error en loginController.verifyAuth:', error);
      
      return res.status(500).json({
        success: false,
        message: 'Error al verificar autenticación'
      });
    }
  },

  async checkEmail(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'El correo es requerido'
        });
      }

      const exists = await loginDAO.emailExists(email);

      return res.status(200).json({
        success: true,
        exists: exists
      });

    } catch (error) {
      console.error('Error en loginController.checkEmail:', error);
      
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el correo'
      });
    }
  }
};

export default loginController;