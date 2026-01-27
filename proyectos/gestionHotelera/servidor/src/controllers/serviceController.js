import serviceDAO from '../daos/serviceDAO.js';

const serviceController = {
  async getServices(req, res) {
    try {
      const services = await serviceDAO.getServices();
      const values = services.map(obj => obj.nombre);
      res.status(200).json({
        success: true,
        data: values,
        message: 'Servicios obtenidos exitosamente'
      });
    } catch (error) {
      console.error('Error en controlador getServices:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener servicios',
        error: error.message
      });
    }
  }
};

export default serviceController;