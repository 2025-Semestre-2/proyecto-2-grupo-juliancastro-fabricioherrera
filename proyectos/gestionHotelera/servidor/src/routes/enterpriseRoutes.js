import express from 'express';
import empresaController from '../controllers/enterpriseController.js';

const router = express.Router();

router.get(
  '/account/:cuentaID',
  empresaController.getEmpresaByAccount
);

export default router;