import reservaDAO from '../daos/reservaDAO.js';

const reservaController = {
  async crearReserva(req, res) {
    try {
      const { habitacionID, fechaInicio, fechaSalida, cantPersonas, vehiculo } = req.body;
      // La identificación del usuario logeado debe venir del token o sesión
      const identificacion = req.user?.identificacion || req.body.identificacion;
      if (!identificacion) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }
      const result = await reservaDAO.crearReserva({
        identificacion,
        habitacionID,
        fechaInicio,
        fechaSalida,
        cantPersonas,
        vehiculo
      });
      res.json({ success: true, numReservacion: result.numReservacion });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default reservaController;
