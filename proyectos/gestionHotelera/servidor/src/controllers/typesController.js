import typesDAO from '../daos/typesDAO.js';

const typesController = {
  async getHotelTypes(req, res) {
    try {
      const types = await typesDAO.getHotelTypes();
      res.status(200).json({
        success: true,
        data: types
      });
    } catch (error) {
      console.error('Error en typesController.getHotelTypes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los tipos de hospedaje'
      });
    }
  },

  async getActivityTypes(req, res) {
    try {
      const types = await typesDAO.getActivityTypes();
      // Extraer solo los nombres para el autocomplete
      const typeNames = types.map(t => t.nombre);
      res.status(200).json({
        success: true,
        data: typeNames
      });
    } catch (error) {
      console.error('Error en typesController.getActivityTypes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los tipos de actividad'
      });
    }
  },

  async getRoomTypes(req, res) {
    try {
      const types = await typesDAO.getRoomTypes();
      res.status(200).json({
        success: true,
        data: types
      });
    } catch (error) {
      console.error('Error en typesController.getRoomTypes:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los tipos de habitación'
      });
    }
  },

  async getAmenities(req, res) {
    try {
      const amenities = await typesDAO.getAmenities();
      const amenityNames = amenities.map(a => a.nombre);
      res.status(200).json({
        success: true,
        data: amenityNames
      });
    } catch (error) {
      console.error('Error en typesController.getAmenities:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las comodidades'
      });
    }
  }
};

export default typesController;