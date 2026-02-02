import reportsDAO from '../daos/reportsDAO.js';

const reportsController = {
  async getFacturacionReport(req, res) {
    try {
      const { cedulaJuridica } = req.params;
      const filters = {
        tipoHabitacion: req.query.tipoHabitacion,
        habitacionID: req.query.habitacionID ? parseInt(req.query.habitacionID) : undefined,
        anio: req.query.anio ? parseInt(req.query.anio) : undefined,
        mes: req.query.mes ? parseInt(req.query.mes) : undefined,
        fechaInicio: req.query.fechaInicio,
        fechaFin: req.query.fechaFin
      };

      // Limpiar filtros undefined
      Object.keys(filters).forEach(key => 
        filters[key] === undefined && delete filters[key]
      );

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      const result = await reportsDAO.getFacturacionReport(cedulaJuridica, filters);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error en reportsController.getFacturacionReport:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el reporte de facturación'
      });
    }
  },

  async getReservasPorTipoReport(req, res) {
    try {
      const { cedulaJuridica } = req.params;
      const filters = {
        tipoHabitacion: req.query.tipoHabitacion,
        temporada: req.query.temporada,
        fechaInicio: req.query.fechaInicio,
        fechaFin: req.query.fechaFin
      };

      // Limpiar filtros undefined
      Object.keys(filters).forEach(key => 
        filters[key] === undefined && delete filters[key]
      );

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      const result = await reportsDAO.getReservasPorTipoReport(cedulaJuridica, filters);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error en reportsController.getReservasPorTipoReport:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el reporte por tipo de habitación'
      });
    }
  },

  async getRangoEdadesReport(req, res) {
    try {
      const { cedulaJuridica } = req.params;
      const filters = {
        rangoEdad: req.query.rangoEdad,
        generacion: req.query.generacion,
        activa: req.query.activa !== undefined ? req.query.activa === 'true' : undefined,
        fechaInicio: req.query.fechaInicio,
        fechaFin: req.query.fechaFin
      };

      // Limpiar filtros undefined
      Object.keys(filters).forEach(key => 
        filters[key] === undefined && delete filters[key]
      );

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      const result = await reportsDAO.getRangoEdadesReport(cedulaJuridica, filters);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error en reportsController.getRangoEdadesReport:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el reporte de edades'
      });
    }
  },

  async getDashboardMetrics(req, res) {
    try {
      const { cedulaJuridica } = req.params;

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      const result = await reportsDAO.getDashboardMetrics(cedulaJuridica);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error en reportsController.getDashboardMetrics:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las métricas del dashboard'
      });
    }
  },

  async getTrendData(req, res) {
    try {
      const { cedulaJuridica } = req.params;
      const periodo = req.query.periodo || 'mes';

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      if (!['mes', 'dia'].includes(periodo)) {
        return res.status(400).json({
          success: false,
          message: 'Período inválido. Use "mes" o "dia"'
        });
      }

      const result = await reportsDAO.getTrendData(cedulaJuridica, periodo);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error en reportsController.getTrendData:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener datos de tendencias'
      });
    }
  },

  async getTopHospedajesReport(req, res) {
    try {
      const filters = {
        provincia: req.query.provincia,
        canton: req.query.canton,
        distrito: req.query.distrito,
        fechaInicio: req.query.fechaInicio,
        fechaFin: req.query.fechaFin
      };

      // Limpiar filtros undefined
      Object.keys(filters).forEach(key => 
        filters[key] === undefined && delete filters[key]
      );

      const result = await reportsDAO.getTopHospedajesReport(filters);

      res.status(200).json(result);

    } catch (error) {
      console.error('Error en reportsController.getTopHospedajesReport:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener top hospedajes'
      });
    }
  }
};

export default reportsController;