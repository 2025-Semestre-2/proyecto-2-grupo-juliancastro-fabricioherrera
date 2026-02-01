import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import roomCRUDController from '../controllers/roomCRUDController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear directorio de uploads si no existe
const uploadsDir = path.join(__dirname, '..', 'uploads', 'rooms');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento de multer
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

// Filtro de tipos de archivo
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

// Configuración de multer para múltiples archivos
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB por archivo
    files: 10 // Máximo 10 archivos
  },
  fileFilter: fileFilter
});

// Crear nueva habitación
router.post(
  '/',
  upload.array('images', 10), // Acepta hasta 10 imágenes con el campo 'images'
  roomCRUDController.createRoom
);

// Obtener habitaciones por empresa
router.get(
  '/company/:cedulaJuridica',
  roomCRUDController.getRoomsByCompany
);

// Eliminar habitación (soft delete)
router.delete(
  '/:habitacionID',
  roomCRUDController.deleteRoom
);

// Manejo de errores de multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Uno o más archivos son demasiado grandes. Tamaño máximo: 5MB por archivo'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Se excedió el límite de archivos. Máximo: 10 imágenes'
      });
    }
    return res.status(400).json({
      success: false,
      message: `Error al subir archivos: ${error.message}`
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