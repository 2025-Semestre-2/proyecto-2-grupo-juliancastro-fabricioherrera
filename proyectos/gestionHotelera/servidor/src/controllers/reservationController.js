import reservationDAO from '../daos/reservationDAO.js';

const reservationController = {
  async getReservationsByUser(req, res) {
    try {
      const { identificacion } = req.params;

      if (!identificacion) {
        return res.status(400).json({
          success: false,
          message: 'La identificación es requerida'
        });
      }

      const result = await reservationDAO.getReservationsByUser(identificacion);

      res.status(200).json({
        success: true,
        count: result.count,
        data: result.data
      });

    } catch (error) {
      console.error('Error en reservationController.getReservationsByUser:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las reservas'
      });
    }
  },

  async checkoutReservation(req, res) {
    try {
      const { numReservacion } = req.params;

      if (!numReservacion) {
        return res.status(400).json({
          success: false,
          message: 'El número de reservación es requerido'
        });
      }

      const result = await reservationDAO.checkoutReservation(parseInt(numReservacion));

      res.status(200).json({
        success: true,
        message: result.message,
        rowsAffected: result.rowsAffected
      });

    } catch (error) {
      console.error('Error en reservationController.checkoutReservation:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error al realizar el checkout'
      });
    }
  },

  async getReservationDetails(req, res) {
    try {
      const { numReservacion } = req.params;

      if (!numReservacion) {
        return res.status(400).json({
          success: false,
          message: 'El número de reservación es requerido'
        });
      }

      const result = await reservationDAO.getReservationDetails(parseInt(numReservacion));

      res.status(200).json({
        success: true,
        data: result.data
      });

    } catch (error) {
      console.error('Error en reservationController.getReservationDetails:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener detalles de la reserva'
      });
    }
  }
};

export default reservationController;