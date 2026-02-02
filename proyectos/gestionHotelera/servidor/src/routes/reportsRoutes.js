import express from 'express';
import reportsController from '../controllers/reportsController.js';

const router = express.Router();

// Métricas del dashboard
router.get(
  '/dashboard/:cedulaJuridica',
  reportsController.getDashboardMetrics
);

// Datos de tendencias
router.get(
  '/trends/:cedulaJuridica',
  reportsController.getTrendData
);

// Reporte de facturación
router.get(
  '/facturacion/:cedulaJuridica',
  reportsController.getFacturacionReport
);

// Reporte de reservas por tipo de habitación
router.get(
  '/tipo-habitacion/:cedulaJuridica',
  reportsController.getReservasPorTipoReport
);

// Reporte de rango de edades
router.get(
  '/edades/:cedulaJuridica',
  reportsController.getRangoEdadesReport
);

// Top 5 hospedajes más demandados
router.get(
  '/top-hospedajes',
  reportsController.getTopHospedajesReport
);

export default router;