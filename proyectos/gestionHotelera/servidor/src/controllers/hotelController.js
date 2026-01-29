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
  },

  async getHotelById(req, res) {
    try {
      const { idHotel } = req.params;
      
      if (!idHotel) {
        return res.status(400).json({
          success: false,
          message: 'ID del hotel es requerido'
        });
      }

      const hotel = await hotelDAO.getHotelById(idHotel);
      
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: 'Hotel no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: hotel,
        message: 'Hotel obtenido exitosamente'
      });
    } catch (error) {
      console.error('Error en controlador getHotelById:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el hotel',
        error: error.message
      });
    }
  },

  async getHabitacionesByHotel(req, res) {
    try {
      const { idHotel } = req.params;
      
      if (!idHotel) {
        return res.status(400).json({
          success: false,
          message: 'ID del hotel es requerido'
        });
      }

      const habitaciones = await hotelDAO.getHabitacionesByHotel(idHotel);

      res.status(200).json({
        success: true,
        data: habitaciones,
        message: 'Habitaciones obtenidas exitosamente'
      });
    } catch (error) {
      console.error('Error en controlador getHabitacionesByHotel:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las habitaciones',
        error: error.message
      });
    }
  }
};

export default hotelController;
