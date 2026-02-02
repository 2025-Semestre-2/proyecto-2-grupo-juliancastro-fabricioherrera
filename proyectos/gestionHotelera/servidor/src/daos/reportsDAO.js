import sql from 'mssql';

const reportsDAO = {
  /**
   * Obtiene el reporte de facturación con filtros opcionales
   */
  async getFacturacionReport(cedulaJuridica, filters = {}) {
    try {
      console.log('Obteniendo reporte de facturación:', { cedulaJuridica, filters });

      const pool = await sql.connect();
      let query = `
        SELECT 
          numReservacion,
          fechaIngreso,
          fechaSalida,
          cantPersonas,
          nombreCliente,
          primerApellido,
          segundoApellido,
          numeroHabitacion,
          tipoHabitacion,
          precioHabitacion,
          diasEstancia,
          totalFacturado,
          anio,
          mes,
          nombreMes,
          dia,
          fecha
        FROM vw_ReporteFacturacion
        WHERE cedulaJuridica = @cedulaJuridica
      `;

      const request = pool.request();
      request.input('cedulaJuridica', sql.VarChar(10), cedulaJuridica);

      // Aplicar filtros
      if (filters.tipoHabitacion) {
        query += ' AND tipoHabitacion = @tipoHabitacion';
        request.input('tipoHabitacion', sql.VarChar(10), filters.tipoHabitacion);
      }

      if (filters.habitacionID) {
        query += ' AND habitacionID = @habitacionID';
        request.input('habitacionID', sql.Int, filters.habitacionID);
      }

      if (filters.fechaInicio && filters.fechaFin) {
        query += ' AND fecha BETWEEN @fechaInicio AND @fechaFin';
        request.input('fechaInicio', sql.Date, filters.fechaInicio);
        request.input('fechaFin', sql.Date, filters.fechaFin);
      } else if (filters.anio && filters.mes) {
        query += ' AND anio = @anio AND mes = @mes';
        request.input('anio', sql.Int, filters.anio);
        request.input('mes', sql.Int, filters.mes);
      } else if (filters.anio) {
        query += ' AND anio = @anio';
        request.input('anio', sql.Int, filters.anio);
      }

      query += ' ORDER BY fecha DESC';

      const result = await request.query(query);

      // Calcular totales y estadísticas
      const totalFacturado = result.recordset.reduce((sum, r) => sum + parseFloat(r.totalFacturado), 0);
      const totalReservas = result.recordset.length;
      const totalDias = result.recordset.reduce((sum, r) => sum + r.diasEstancia, 0);
      const promedioFacturado = totalReservas > 0 ? totalFacturado / totalReservas : 0;

      return {
        success: true,
        count: totalReservas,
        data: result.recordset,
        stats: {
          totalFacturado,
          totalReservas,
          totalDias,
          promedioFacturado
        }
      };
    } catch (error) {
      console.error('Error en reportsDAO.getFacturacionReport:', error);
      throw new Error(`Error al obtener reporte de facturación: ${error.message}`);
    }
  },

  /**
   * Obtiene el reporte de reservas por tipo de habitación
   */
  async getReservasPorTipoReport(cedulaJuridica, filters = {}) {
    try {
      console.log('Obteniendo reporte por tipo de habitación:', { cedulaJuridica, filters });

      const pool = await sql.connect();
      let query = `
        SELECT 
          tipoHabitacion,
          tipoCama,
          numReservacion,
          numeroHabitacion,
          nombreCompletoCliente,
          fechaIngreso,
          fechaSalida,
          diasEstancia,
          cantPersonas,
          totalFacturado,
          temporada,
          fechaIngresoDate,
          fechaSalidaDate
        FROM vw_ReporteReservasPorTipoHabitacion
        WHERE cedulaJuridica = @cedulaJuridica
      `;

      const request = pool.request();
      request.input('cedulaJuridica', sql.VarChar(10), cedulaJuridica);

      // Aplicar filtros
      if (filters.tipoHabitacion) {
        query += ' AND tipoHabitacion = @tipoHabitacion';
        request.input('tipoHabitacion', sql.VarChar(10), filters.tipoHabitacion);
      }

      if (filters.temporada) {
        query += ' AND temporada = @temporada';
        request.input('temporada', sql.VarChar(10), filters.temporada);
      }

      if (filters.fechaInicio && filters.fechaFin) {
        query += ' AND fechaIngresoDate BETWEEN @fechaInicio AND @fechaFin';
        request.input('fechaInicio', sql.Date, filters.fechaInicio);
        request.input('fechaFin', sql.Date, filters.fechaFin);
      }

      query += ' ORDER BY fechaIngresoDate DESC';

      const result = await request.query(query);

      // Agrupar por tipo de habitación
      const groupedByType = result.recordset.reduce((acc, record) => {
        const tipo = record.tipoHabitacion;
        if (!acc[tipo]) {
          acc[tipo] = {
            tipoHabitacion: tipo,
            tipoCama: record.tipoCama,
            totalReservas: 0,
            totalFacturado: 0,
            totalDias: 0,
            reservas: []
          };
        }
        acc[tipo].totalReservas++;
        acc[tipo].totalFacturado += parseFloat(record.totalFacturado);
        acc[tipo].totalDias += record.diasEstancia;
        acc[tipo].reservas.push(record);
        return acc;
      }, {});

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset,
        summary: Object.values(groupedByType)
      };
    } catch (error) {
      console.error('Error en reportsDAO.getReservasPorTipoReport:', error);
      throw new Error(`Error al obtener reporte por tipo: ${error.message}`);
    }
  },

  /**
   * Obtiene el reporte de rango de edades
   */
  async getRangoEdadesReport(cedulaJuridica, filters = {}) {
    try {
      console.log('Obteniendo reporte de edades:', { cedulaJuridica, filters });

      const pool = await sql.connect();
      let query = `
        SELECT 
          rangoEdad,
          generacion,
          edadActual,
          nombreCompleto,
          identificacion,
          pais,
          numReservacion,
          fechaReserva,
          tipoHabitacion,
          diasEstancia,
          totalFacturado,
          activa
        FROM vw_ReporteRangoEdades
        WHERE cedulaJuridica = @cedulaJuridica
      `;

      const request = pool.request();
      request.input('cedulaJuridica', sql.VarChar(10), cedulaJuridica);

      // Aplicar filtros
      if (filters.rangoEdad) {
        query += ' AND rangoEdad = @rangoEdad';
        request.input('rangoEdad', sql.VarChar(20), filters.rangoEdad);
      }

      if (filters.generacion) {
        query += ' AND generacion = @generacion';
        request.input('generacion', sql.VarChar(20), filters.generacion);
      }

      if (filters.activa !== undefined) {
        query += ' AND activa = @activa';
        request.input('activa', sql.Bit, filters.activa);
      }

      if (filters.fechaInicio && filters.fechaFin) {
        query += ' AND fechaReserva BETWEEN @fechaInicio AND @fechaFin';
        request.input('fechaInicio', sql.Date, filters.fechaInicio);
        request.input('fechaFin', sql.Date, filters.fechaFin);
      }

      query += ' ORDER BY fechaReserva DESC';

      const result = await request.query(query);

      // Agrupar por rango de edad
      const groupedByAge = result.recordset.reduce((acc, record) => {
        const rango = record.rangoEdad;
        if (!acc[rango]) {
          acc[rango] = {
            rangoEdad: rango,
            totalReservas: 0,
            clientesUnicos: new Set(),
            totalFacturado: 0,
            edadPromedio: 0,
            edades: []
          };
        }
        acc[rango].totalReservas++;
        acc[rango].clientesUnicos.add(record.identificacion);
        acc[rango].totalFacturado += parseFloat(record.totalFacturado);
        acc[rango].edades.push(record.edadActual);
        return acc;
      }, {});

      // Calcular edades promedio
      Object.values(groupedByAge).forEach(grupo => {
        grupo.edadPromedio = grupo.edades.reduce((a, b) => a + b, 0) / grupo.edades.length;
        grupo.clientesUnicos = grupo.clientesUnicos.size;
        delete grupo.edades;
      });

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset,
        summary: Object.values(groupedByAge)
      };
    } catch (error) {
      console.error('Error en reportsDAO.getRangoEdadesReport:', error);
      throw new Error(`Error al obtener reporte de edades: ${error.message}`);
    }
  },

  /**
   * Obtiene métricas del dashboard
   */
  async getDashboardMetrics(cedulaJuridica) {
    try {
      console.log('Obteniendo métricas del dashboard:', cedulaJuridica);

      const pool = await sql.connect();
      
      // Total de reservas del mes actual
      const reservasMes = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT 
            COUNT(*) as totalReservas,
            SUM(totalFacturado) as totalFacturado,
            AVG(diasEstancia) as promedioEstancia
          FROM vw_ReporteFacturacion
          WHERE cedulaJuridica = @cedulaJuridica
            AND YEAR(fecha) = YEAR(GETDATE())
            AND MONTH(fecha) = MONTH(GETDATE())
        `);

      // Tasa de ocupación
      const ocupacion = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT 
            COUNT(DISTINCT h.habitacionID) as habitacionesActivas,
            COUNT(DISTINCT CASE WHEN r.activa = 1 THEN r.habitacionID END) as habitacionesOcupadas
          FROM Habitacion h
          LEFT JOIN Reservacion r ON h.habitacionID = r.habitacionID 
            AND r.fechaIngreso <= GETDATE() 
            AND r.fechaSalida >= GETDATE()
            AND r.activa = 1
          WHERE h.cedulaJuridica = @cedulaJuridica
            AND h.estado = 1
        `);

      // Tipos de habitación más reservados
      const tiposMasReservados = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT TOP 5
            tipoHabitacion,
            COUNT(*) as totalReservas,
            SUM(totalFacturado) as totalFacturado
          FROM vw_ReporteReservasPorTipoHabitacion
          WHERE cedulaJuridica = @cedulaJuridica
            AND YEAR(fechaIngresoDate) = YEAR(GETDATE())
          GROUP BY tipoHabitacion
          ORDER BY totalReservas DESC
        `);

      // Rango de edad predominante
      const edadPredominante = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(`
          SELECT TOP 1
            rangoEdad,
            COUNT(*) as totalReservas
          FROM vw_ReporteRangoEdades
          WHERE cedulaJuridica = @cedulaJuridica
            AND activa = 0
          GROUP BY rangoEdad
          ORDER BY totalReservas DESC
        `);

      const habitacionesActivas = ocupacion.recordset[0]?.habitacionesActivas || 0;
      const habitacionesOcupadas = ocupacion.recordset[0]?.habitacionesOcupadas || 0;
      const tasaOcupacion = habitacionesActivas > 0 
        ? ((habitacionesOcupadas / habitacionesActivas) * 100).toFixed(1)
        : 0;

      return {
        success: true,
        metrics: {
          reservasMes: reservasMes.recordset[0]?.totalReservas || 0,
          ingresosMes: reservasMes.recordset[0]?.totalFacturado || 0,
          promedioEstancia: reservasMes.recordset[0]?.promedioEstancia || 0,
          tasaOcupacion: parseFloat(tasaOcupacion),
          habitacionesActivas,
          habitacionesOcupadas,
          tiposMasReservados: tiposMasReservados.recordset,
          edadPredominante: edadPredominante.recordset[0]?.rangoEdad || 'N/A'
        }
      };
    } catch (error) {
      console.error('Error en reportsDAO.getDashboardMetrics:', error);
      throw new Error(`Error al obtener métricas: ${error.message}`);
    }
  },

  /**
   * Obtiene datos para gráficos de tendencias
   */
  async getTrendData(cedulaJuridica, periodo = 'mes') {
    try {
      console.log('Obteniendo datos de tendencias:', { cedulaJuridica, periodo });

      const pool = await sql.connect();
      let query = '';

      if (periodo === 'mes') {
        // Últimos 12 meses
        query = `
          SELECT 
            anio,
            mes,
            nombreMes,
            COUNT(*) as totalReservas,
            SUM(totalFacturado) as totalFacturado,
            AVG(diasEstancia) as promedioEstancia
          FROM vw_ReporteFacturacion
          WHERE cedulaJuridica = @cedulaJuridica
            AND fecha >= DATEADD(MONTH, -12, GETDATE())
          GROUP BY anio, mes, nombreMes
          ORDER BY anio, mes
        `;
      } else if (periodo === 'dia') {
        // Últimos 30 días
        query = `
          SELECT 
            fecha,
            COUNT(*) as totalReservas,
            SUM(totalFacturado) as totalFacturado
          FROM vw_ReporteFacturacion
          WHERE cedulaJuridica = @cedulaJuridica
            AND fecha >= DATEADD(DAY, -30, GETDATE())
          GROUP BY fecha
          ORDER BY fecha
        `;
      }

      const result = await pool.request()
        .input('cedulaJuridica', sql.VarChar(10), cedulaJuridica)
        .query(query);

      return {
        success: true,
        data: result.recordset
      };
    } catch (error) {
      console.error('Error en reportsDAO.getTrendData:', error);
      throw new Error(`Error al obtener datos de tendencias: ${error.message}`);
    }
  },

  /**
   * Obtiene el top 5 de hospedajes más demandados con filtros de ubicación y fecha
   */
  async getTopHospedajesReport(filters = {}) {
    try {
      console.log('Obteniendo top 5 hospedajes más demandados:', filters);

      const pool = await sql.connect();
      let query = `
        SELECT TOP 5
          hospedaje,
          provincia,
          canton,
          distrito,
          COUNT(*) as totalReservaciones,
          MIN(fechaIngreso) as primeraReserva,
          MAX(fechaSalida) as ultimaReserva
        FROM vw_reservasGenerales
        WHERE 1=1
      `;

      const request = pool.request();

      // Aplicar filtros de ubicación
      if (filters.provincia) {
        query += ' AND provincia = @provincia';
        request.input('provincia', sql.VarChar(50), filters.provincia);
      }

      if (filters.canton) {
        query += ' AND canton = @canton';
        request.input('canton', sql.VarChar(50), filters.canton);
      }

      if (filters.distrito) {
        query += ' AND distrito = @distrito';
        request.input('distrito', sql.VarChar(50), filters.distrito);
      }

      // Aplicar filtros de fecha
      if (filters.fechaInicio && filters.fechaFin) {
        query += ' AND fechaIngreso BETWEEN @fechaInicio AND @fechaFin';
        request.input('fechaInicio', sql.Date, filters.fechaInicio);
        request.input('fechaFin', sql.Date, filters.fechaFin);
      }

      query += `
        GROUP BY hospedaje, provincia, canton, distrito
        ORDER BY totalReservaciones DESC
      `;

      const result = await request.query(query);

      // Obtener ubicaciones únicas para los filtros
      const ubicacionesQuery = `
        SELECT DISTINCT
          provincia,
          canton,
          distrito
        FROM vw_reservasGenerales
        ORDER BY provincia, canton, distrito
      `;

      const ubicaciones = await pool.request().query(ubicacionesQuery);

      return {
        success: true,
        count: result.recordset.length,
        data: result.recordset,
        ubicaciones: {
          provincias: [...new Set(ubicaciones.recordset.map(u => u.provincia))],
          cantones: [...new Set(ubicaciones.recordset.map(u => u.canton))],
          distritos: [...new Set(ubicaciones.recordset.map(u => u.distrito))]
        }
      };
    } catch (error) {
      console.error('Error en reportsDAO.getTopHospedajesReport:', error);
      throw new Error(`Error al obtener top hospedajes: ${error.message}`);
    }
  }
};

export default reportsDAO;