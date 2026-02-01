import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import activityCRUDController from '../controllers/activityCRUDController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', 'uploads', 'activities');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); 
  } else {
    cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: fileFilter
});

// Obtener todas las actividades
router.get(
  '/',
  activityCRUDController.getAllActivities
);

// Crear nueva actividad
router.post(
  '/',
  upload.single('image'), 
  activityCRUDController.createActivity
);

// Obtener actividades por empresa
router.get(
  '/company/:cedulaJuridica',
  activityCRUDController.getActivitiesByCompany
);

// Actualizar actividad
router.put(
  '/:empresaActividadID',
  upload.single('image'), // La imagen es opcional en actualización
  activityCRUDController.updateActivity
);

// Eliminar actividad (soft delete)
router.delete(
  '/:empresaActividadID',
  activityCRUDController.deleteActivity
);

// Manejo de errores de multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'El archivo es demasiado grande. Tamaño máximo: 5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Error al subir archivo: ${error.message}`
    });
  }
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next();
});

export default router;