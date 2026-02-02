import reservaDAO from '../daos/reservaDAO.js';

const reservaController = {
  crearReserva: async (req, res) => {
    try {
      const { habitacionID, fechaInicio, fechaSalida, cantPersonas, vehiculo } = req.body;
      const identificacion = req.user?.identificacion || req.body.identificacion;

      if (!identificacion) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const resultado = await reservaDAO.crearReserva({
        identificacion,
        habitacionID,
        fechaInicio,
        fechaSalida,
        cantPersonas,
        vehiculo
      });

      // SOLO responder JSON
      return res.json({
        success: true,
        numReservacion: resultado.numReservacion
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

export default reservaController;
