import { pool } from '../config/database.js';

const typesDAO = {
  async getHotelTypes() {
    try {
      const result = await pool.request()
        .query('SELECT * FROM vw_tipoHospedajes');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getHotelTypes:', error);
      throw new Error('Error al obtener los tipos de hospedaje de la base de datos');
    }
  },

  async getActivityTypes() {
    try {
      const result = await pool.request()
        .query('SELECT nombre FROM vw_tipoActividad');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getActivityTypes:', error);
      throw new Error('Error al obtener los tipos de actividad de la base de datos');
    }
  },

  async getRoomTypes() {
    try {
      const result = await pool.request()
        .query('SELECT cama, nombre, descripcion FROM vw_tipoHabitacion');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getRoomTypes:', error);
      throw new Error('Error al obtener los tipos de habitación de la base de datos');
    }
  },

  async getAmenities() {
    try {
      const result = await pool.request()
        .query('SELECT nombre FROM vw_comodidades');
      return result.recordset;
      
    } catch (error) {
      console.error('Error en DAO getAmenities:', error);
      throw new Error('Error al obtener las comodidades de la base de datos');
    }
  }
};

export default typesDAO;