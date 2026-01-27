import hotelDAO from '../daos/hotelDAO.js';

const hotelController = {
  async getHoteles(req, res) {
    try {
      const hoteles = await hotelDAO.getHoteles();
      res.status(200).json({
        success: true,
        data: hoteles,
        message: 'Hoteles obtenidos exitosamente'
      });
    } catch (error) {
      console.error('Error en controlador getHoteles:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener hoteles',
        error: error.message
      });
    }
  }
};

export default hotelController;
