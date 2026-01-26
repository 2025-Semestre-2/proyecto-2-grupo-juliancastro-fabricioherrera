import typesDAO from '../daos/typesDAO.js';

const typesController = {
  async getHotelTypes(req, res) {
    try {

      const types = await typesDAO.getHotelTypes();
      const values = types.map(obj => obj.nombre);

      res.status(200).json({
        success: true,
        data: values,
        message: 'Tipos de hospedaje obtenidos exitosamente'
      });
    } catch (error) {
      console.error('Error en controlador getHotelTypes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los tipos de hospedajes',
        error: error.message
      });
    }
  }
};

export default typesController;