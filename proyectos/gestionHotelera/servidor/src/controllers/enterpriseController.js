import empresaDAO from '../daos/enterpriseDAO.js';

const empresaController = {
  async getEmpresaByAccount(req, res) {
    try {
      const { cuentaID } = req.params;

      if (!cuentaID) {
        return res.status(400).json({
          success: false,
          message: 'El cuentaID es requerido'
        });
      }

      const result = await empresaDAO.getEmpresaByCuentaID(parseInt(cuentaID));

      res.status(200).json({
        success: true,
        data: result.data
      });

    } catch (error) {
      console.error('Error en empresaController.getEmpresaByAccount:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener los datos de la empresa'
      });
    }
  }
};

export default empresaController;