import roomDAO from '../daos/roomDAO.js';
import fs from 'fs/promises';

const roomCRUDController = {
  async createRoom(req, res) {
    try {
      // Validar que se hayan subido archivos
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Debe proporcionar al menos una imagen de la habitación'
        });
      }

      // Obtener datos del body - compatible con nombres del frontend
      const { 
        cedulaJuridica,
        hotelId, // Alias para cedulaJuridica desde el frontend
        tipoHabitacion,
        roomType, // Alias para tipoHabitacion desde el frontend
        numero,
        roomNumber, // Alias para numero desde el frontend
        precio,
        price, // Alias para precio desde el frontend
        comodidades,
        amenities // Alias para comodidades desde el frontend
      } = req.body;

      // Determinar valores usando los alias del frontend o los nombres originales
      const cedula = cedulaJuridica || hotelId;
      const tipoHab = tipoHabitacion || roomType;
      const numeroHab = numero || roomNumber;
      const precioHab = precio || price;
      const comodidadesHab = comodidades || amenities;

      // Validar campos obligatorios
      if (!cedula || !tipoHab || !numeroHab || !precioHab || !comodidadesHab) {
        // Eliminar archivos subidos si hay error de validación
        for (const file of req.files) {
          await fs.unlink(file.path);
        }
        
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son obligatorios'
        });
      }

      // Validar número de habitación
      const numeroInt = parseInt(numeroHab);
      if (isNaN(numeroInt) || numeroInt <= 0) {
        for (const file of req.files) {
          await fs.unlink(file.path);
        }
        
        return res.status(400).json({
          success: false,
          message: 'El número de habitación debe ser un número válido mayor a cero'
        });
      }

      // Validar precio
      const precioNumerico = parseFloat(precioHab);
      if (isNaN(precioNumerico) || precioNumerico <= 0) {
        for (const file of req.files) {
          await fs.unlink(file.path);
        }
        
        return res.status(400).json({
          success: false,
          message: 'El precio debe ser un número mayor a cero'
        });
      }

      // Parsear comodidades (puede venir como string JSON o array)
      let comodidadesArray;
      try {
        comodidadesArray = typeof comodidadesHab === 'string' 
          ? JSON.parse(comodidadesHab) 
          : comodidadesHab;
        
        if (!Array.isArray(comodidadesArray) || comodidadesArray.length === 0) {
          throw new Error('Comodidades debe ser un array no vacío');
        }
      } catch (parseError) {
        for (const file of req.files) {
          await fs.unlink(file.path);
        }
        
        return res.status(400).json({
          success: false,
          message: 'El formato de comodidades es inválido'
        });
      }

      // Preparar array de fotos con títulos descriptivos
      const fotosArray = req.files.map((file, index) => ({
        titulo: `Habitación ${numeroInt} - Foto ${index + 1}`,
        url: `/uploads/rooms/${file.filename}`
      }));

      // Preparar datos para el DAO
      const roomData = {
        cedulaJuridica: cedula.trim(),
        tipoHabitacionNombre: tipoHab.trim(),
        numero: numeroInt,
        precio: precioNumerico,
        fotosJson: JSON.stringify(fotosArray),
        comodidadesJson: JSON.stringify(comodidadesArray)
      };

      const result = await roomDAO.insertRoom(roomData);

      res.status(201).json({
        success: true,
        message: 'Habitación creada exitosamente',
        data: {
          ...result.data,
          fotos: fotosArray,
          comodidades: comodidadesArray
        }
      });

    } catch (error) {
      console.error('Error en roomCRUDController.createRoom:', error);
      
      // Limpiar archivos subidos en caso de error
      if (req.files) {
        for (const file of req.files) {
          try {
            await fs.unlink(file.path);
          } catch (unlinkError) {
            console.error('Error al eliminar archivo:', unlinkError);
          }
        }
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Error al crear la habitación'
      });
    }
  },

  async getRoomsByCompany(req, res) {
    try {
      const { cedulaJuridica } = req.params;

      if (!cedulaJuridica) {
        return res.status(400).json({
          success: false,
          message: 'La cédula jurídica es requerida'
        });
      }

      const result = await roomDAO.getRoomsByCompany(cedulaJuridica);
      
      // Agrupar las habitaciones por habitacionID y consolidar comodidades e imágenes
      const roomsMap = new Map();
      
      result.data.forEach(row => {
        const roomId = row.habitacionID;
        
        if (!roomsMap.has(roomId)) {
          // Primera vez que vemos esta habitación
          roomsMap.set(roomId, {
            habitacionID: row.habitacionID,
            numero: row.numero,
            cedulaJuridica: row.cedulaJuridica,
            estado: row.estado,
            precio: row.precio,
            capacidad: row.capacidad,
            descripcion: row.descripcion,
            nombre: row.nombre,
            comodidades: [],
            images: []
          });
        }
        
        const room = roomsMap.get(roomId);
        
        // Agregar comodidad si no está ya en el array
        if (row.nombre && !room.comodidades.includes(row.nombre)) {
          room.comodidades.push(row.nombre);
        }
        
        // Agregar imagen si no está ya en el array
        if (row.url && !room.images.includes(row.url)) {
          room.images.push(row.url);
        }
      });
      
      // Convertir el Map a array y seleccionar la primera imagen
      const groupedRooms = Array.from(roomsMap.values()).map(room => ({
        ...room,
        url: room.images[0] || null,
        imageCount: room.images.length
      }));
      
      console.log(`${groupedRooms.length} habitaciones agrupadas`);
      
      res.status(200).json({
        success: true,
        count: groupedRooms.length,
        data: groupedRooms
      });

    } catch (error) {
      console.error('Error en roomCRUDController.getRoomsByCompany:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las habitaciones'
      });
    }
  },

  async deleteRoom(req, res) {
    try {
      const { habitacionID } = req.params;

      if (!habitacionID) {
        return res.status(400).json({
          success: false,
          message: 'El ID de la habitación es requerido'
        });
      }

      const result = await roomDAO.deleteRoom(parseInt(habitacionID));

      res.status(200).json({
        success: true,
        message: result.message,
        rowsAffected: result.rowsAffected
      });

    } catch (error) {
      console.error('Error en roomCRUDController.deleteRoom:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la habitación'
      });
    }
  }
};

export default roomCRUDController;