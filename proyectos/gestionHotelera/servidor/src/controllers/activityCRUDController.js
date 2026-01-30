import activityDAO from '../daos/activityDAO.js';
import fs from 'fs/promises';

const activityCRUDController = {
  async createActivity(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No se ha proporcionado ninguna imagen'
        });
      }

      const { cedulaJuridica, tipoActividad, titulo, descripcion, precio } = req.body;

      if (!cedulaJuridica || !tipoActividad || !titulo || !descripcion || !precio) {
        await fs.unlink(req.file.path);
        
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios'
        });
      }

      const precioNumerico = parseFloat(precio);
      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        await fs.unlink(req.file.path);
        
        return res.status(400).json({
          success: false,
          message: 'El precio debe ser un número mayor a cero'
        });
      }

      const imageUrl = `/uploads/activities/${req.file.filename}`;

      const activityData = {
        cedulaJuridica: cedulaJuridica.trim(),
        tipoActividadNombre: tipoActividad.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        precio: precioNumerico,
        fotoTitulo: titulo.trim(),
        fotoUrl: imageUrl 
      };

      const result = await activityDAO.insertActivity(activityData);

      res.status(201).json({
        success: true,
        message: 'Actividad creada exitosamente',
        data: {
          ...result.data,
          imageUrl: imageUrl,
          imagePath: req.file.path 
        }
      });

    } catch (error) {
      console.error('Error en activityCRUDController.createActivity:', error);
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
        } catch (unlinkError) {
          console.error('Error al eliminar archivo:', unlinkError);
        }
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Error al crear la actividad'
      });
    }
  },

  async getActivitiesByCompany(req, res) {
    try {
      const { cedulaJuridica } = req.params;

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      const result = await activityDAO.getActivitiesByCompany(cedulaJuridica);

      res.status(200).json({
        success: true,
        count: result.count,
        data: result.data
      });

    } catch (error) {
      console.error('Error en activityCRUDController.getActivitiesByCompany:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las actividades'
      });
    }
  },

  async deleteActivity(req, res) {
    try {
    const { empresaActividadID } = req.params;

    if (!empresaActividadID) {
    return res.status(400).json({
        success: false,
        message: 'El ID de la actividad es requerido'
    });
    }

    const result = await activityDAO.deleteActivity(
    parseInt(empresaActividadID)
    );

    res.status(200).json({
        success: true,
        message: result.message,
        rowsAffected: result.rowsAffected
      });

    } catch (error) {
      console.error('Error en activityCRUDController.deleteActivity:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la actividad'
      });
    }
  }
};

export default activityCRUDController;