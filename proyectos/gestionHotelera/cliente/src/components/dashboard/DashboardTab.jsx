import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Hotel as HotelIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import ReportFilters from './ReportFilters';
import TrendChart from './TrendChart';
import ReportTable from './ReportTable';
import TopHospedajesRanking from './TopHospedajesRanking';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function DashboardTab({ cedulaJuridica, roomCount }) {
  const [currentReport, setCurrentReport] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para métricas del dashboard
  const [metrics, setMetrics] = useState(null);
  const [trendData, setTrendData] = useState([]);

  // Estados para reportes
  const [facturacionData, setFacturacionData] = useState(null);
  const [tipoHabitacionData, setTipoHabitacionData] = useState(null);
  const [edadesData, setEdadesData] = useState(null);

  // Estados para tipos de habitación disponibles
  const [availableRoomTypes, setAvailableRoomTypes] = useState([]);

  useEffect(() => {
    if (cedulaJuridica) {
      loadDashboardData();
      loadAvailableRoomTypes();
    }
  }, [cedulaJuridica]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Cargar métricas
      const metricsResponse = await fetch(`${API_URL}/reports/dashboard/${cedulaJuridica}`);
      const metricsData = await metricsResponse.json();

      if (metricsResponse.ok && metricsData.success) {
        setMetrics(metricsData.metrics);
      }

      // Cargar datos de tendencias
      const trendsResponse = await fetch(`${API_URL}/reports/trends/${cedulaJuridica}?periodo=mes`);
      const trendsData = await trendsResponse.json();

      if (trendsResponse.ok && trendsData.success) {
        setTrendData(trendsData.data);
      }
    } catch (err) {
      console.error('Error al cargar datos del dashboard:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

const loadAvailableRoomTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/types/getRoomTypes`);
    const data = await response.json();

    if (response.ok && data.success) {
      const types = [...new Set(data.data.map(type => type.nombre))];

      setAvailableRoomTypes(types);
      console.log('Tipos de habitación cargados:', types);
    } else {
      setUploadError('Error al cargar los tipos de habitación');
    }
  } catch (error) {
    console.error('Error fetching room types:', error);
    setUploadError('Error al cargar los tipos de habitación');
  }
};


  const loadFacturacionReport = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `${API_URL}/reports/facturacion/${cedulaJuridica}?${queryParams}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setFacturacionData(data);
      } else {
        setError(data.message || 'Error al cargar el reporte');
      }
    } catch (err) {
      console.error('Error al cargar reporte de facturación:', err);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const loadTipoHabitacionReport = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `${API_URL}/reports/tipo-habitacion/${cedulaJuridica}?${queryParams}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setTipoHabitacionData(data);
      } else {
        setError(data.message || 'Error al cargar el reporte');
      }
    } catch (err) {
      console.error('Error al cargar reporte por tipo:', err);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const loadEdadesReport = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(
        `${API_URL}/reports/edades/${cedulaJuridica}?${queryParams}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setEdadesData(data);
      } else {
        setError(data.message || 'Error al cargar el reporte');
      }
    } catch (err) {
      console.error('Error al cargar reporte de edades:', err);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleReportChange = (event, newValue) => {
    setCurrentReport(newValue);
    setError(null);

    // Cargar datos del reporte seleccionado si no existen
    switch (newValue) {
      case 1:
        if (!facturacionData) loadFacturacionReport();
        break;
      case 2:
        if (!tipoHabitacionData) loadTipoHabitacionReport();
        break;
      case 3:
        if (!edadesData) loadEdadesReport();
        break;
      default:
        break;
    }
  };

  const handleApplyFilters = (filters) => {
    switch (currentReport) {
      case 1:
        loadFacturacionReport(filters);
        break;
      case 2:
        loadTipoHabitacionReport(filters);
        break;
      case 3:
        loadEdadesReport(filters);
        break;
      default:
        break;
    }
  };

  // Columnas para las tablas
  const facturacionColumns = [
    { id: 'numReservacion', label: 'Reserva #', type: 'number', align: 'center' },
    { id: 'fecha', label: 'Fecha', type: 'date' },
    { id: 'nombreCliente', label: 'Cliente' },
    { id: 'numeroHabitacion', label: 'Hab.', type: 'number', align: 'center' },
    { id: 'tipoHabitacion', label: 'Tipo' },
    { id: 'diasEstancia', label: 'Días', type: 'number', align: 'center' },
    { id: 'cantPersonas', label: 'Personas', type: 'number', align: 'center' },
    { id: 'totalFacturado', label: 'Total', type: 'currency', align: 'right' }
  ];

  const tipoHabitacionColumns = [
    { id: 'tipoHabitacion', label: 'Tipo de Habitación' },
    { id: 'nombreCompletoCliente', label: 'Cliente' },
    { id: 'fechaIngresoDate', label: 'Check-in', type: 'date' },
    { id: 'fechaSalidaDate', label: 'Check-out', type: 'date' },
    { id: 'diasEstancia', label: 'Días', type: 'number', align: 'center' },
    { id: 'cantPersonas', label: 'Personas', type: 'number', align: 'center' },
    { id: 'temporada', label: 'Temporada', align: 'center' },
    { id: 'totalFacturado', label: 'Total', type: 'currency', align: 'right' }
  ];

  const edadesColumns = [
    { id: 'rangoEdad', label: 'Rango de Edad' },
    { id: 'generacion', label: 'Generación' },
    { id: 'nombreCompleto', label: 'Cliente' },
    { id: 'pais', label: 'País' },
    { id: 'fechaReserva', label: 'Fecha', type: 'date' },
    { id: 'tipoHabitacion', label: 'Tipo Hab.' },
    { id: 'diasEstancia', label: 'Días', type: 'number', align: 'center' },
    { id: 'activa', label: 'Activa', type: 'boolean', align: 'center' },
    { id: 'totalFacturado', label: 'Total', type: 'currency', align: 'right' }
  ];

  if (loading && !metrics) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress sx={{ color: 'rgb(211, 167, 85)' }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Métricas principales */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Reservas"
            value={metrics?.reservasMes || 0}
            subtitle="Este mes"
            color="rgb(211, 167, 85)"
            icon={<AssessmentIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ingresos"
            value={`$${(metrics?.ingresosMes || 0).toLocaleString('es-CR', { minimumFractionDigits: 2 })}`}
            subtitle="Este mes"
            color="rgb(76, 175, 80)"
            icon={<TrendingUpIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ocupación"
            value={`${metrics?.tasaOcupacion || 0}%`}
            subtitle={`${metrics?.habitacionesOcupadas || 0}/${metrics?.habitacionesActivas || 0} habitaciones`}
            color="rgb(33, 150, 243)"
            icon={<HotelIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Edad Predominante"
            value={metrics?.edadPredominante || 'N/A'}
            subtitle="Rango más común"
            color="rgb(156, 39, 176)"
            icon={<PeopleIcon />}
          />
        </Grid>
      </Grid>

      {/* Gráficos de tendencias */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TrendChart
            data={trendData}
            title="Tendencia de Reservas"
            type="line"
            labelKey="nombreMes"
            valueKey="totalReservas"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrendChart
            data={trendData}
            title="Tendencia de Ingresos"
            type="bar"
            labelKey="nombreMes"
            valueKey="totalFacturado"
          />
        </Grid>
      </Grid>

      {/* Top 5 Hospedajes Más Demandados */}
      <Box sx={{ mb: 3 }}>
        <TopHospedajesRanking />
      </Box>

      {/* Tabs de reportes */}
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={currentReport}
          onChange={handleReportChange}
          sx={{
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              '&.Mui-selected': {
                color: 'rgb(211, 167, 85)'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'rgb(211, 167, 85)'
            }
          }}
        >
          <Tab label="Resumen" />
          <Tab label="Facturación" />
          <Tab label="Tipo de Habitación" />
          <Tab label="Rangos de Edad" />
        </Tabs>
      </Paper>

      {/* Contenido de los reportes */}
      {currentReport === 0 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Resumen Ejecutivo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Habitaciones Activas
                </Typography>
                <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                  {roomCount}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Promedio de Estadía
                </Typography>
                <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
                  {(metrics?.promedioEstancia || 0).toFixed(1)} días
                </Typography>
              </Grid>
            </Grid>

            {metrics?.tiposMasReservados && metrics.tiposMasReservados.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                  Tipos de Habitación Más Reservados
                </Typography>
                {metrics.tiposMasReservados.map((tipo, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      mb: 1,
                      backgroundColor: 'rgba(211, 167, 85, 0.1)',
                      borderRadius: 1
                    }}
                  >
                    <Typography fontWeight={500}>{tipo.tipoHabitacion}</Typography>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight={600}>
                        {tipo.totalReservas} reservas
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        ${parseFloat(tipo.totalFacturado).toLocaleString('es-CR')}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {currentReport === 1 && (
        <Box>
          <ReportFilters
            onApplyFilters={handleApplyFilters}
            reportType="facturacion"
            availableRoomTypes={availableRoomTypes}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              <Button size="small" onClick={() => loadFacturacionReport()} sx={{ ml: 2 }}>
                Reintentar
              </Button>
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : facturacionData ? (
            <Box>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">
                      Total Reservas
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {facturacionData.stats.totalReservas}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">
                      Total Facturado
                    </Typography>
                    <Typography variant="h6" fontWeight={600} color="rgb(76, 175, 80)">
                      ${facturacionData.stats.totalFacturado.toLocaleString('es-CR', {
                        minimumFractionDigits: 2
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">
                      Total Días
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {facturacionData.stats.totalDias}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">
                      Promedio por Reserva
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      ${facturacionData.stats.promedioFacturado.toLocaleString('es-CR', {
                        minimumFractionDigits: 2
                      })}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <ReportTable
                data={facturacionData.data}
                columns={facturacionColumns}
                title="Detalle de Facturación"
              />
            </Box>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary">
                Aplica filtros para ver el reporte de facturación
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      {currentReport === 2 && (
        <Box>
          <ReportFilters
            onApplyFilters={handleApplyFilters}
            reportType="tipo"
            availableRoomTypes={availableRoomTypes}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              <Button size="small" onClick={() => loadTipoHabitacionReport()} sx={{ ml: 2 }}>
                Reintentar
              </Button>
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : tipoHabitacionData ? (
            <Box>
              {tipoHabitacionData.summary && tipoHabitacionData.summary.length > 0 && (
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Resumen por Tipo
                  </Typography>
                  <Grid container spacing={2}>
                    {tipoHabitacionData.summary.map((tipo, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ p: 2, backgroundColor: 'rgba(211, 167, 85, 0.05)', borderRadius: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {tipo.tipoHabitacion}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {tipo.tipoCama}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              {tipo.totalReservas} reservas
                            </Typography>
                            <Typography variant="body2" color="rgb(76, 175, 80)">
                              ${tipo.totalFacturado.toLocaleString('es-CR')}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {tipo.totalDias} días totales
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}

              <ReportTable
                data={tipoHabitacionData.data}
                columns={tipoHabitacionColumns}
                title="Detalle por Tipo de Habitación"
              />
            </Box>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary">
                Aplica filtros para ver el reporte por tipo de habitación
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      {currentReport === 3 && (
        <Box>
          <ReportFilters
            onApplyFilters={handleApplyFilters}
            reportType="edades"
            availableRoomTypes={availableRoomTypes}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
              <Button size="small" onClick={() => loadEdadesReport()} sx={{ ml: 2 }}>
                Reintentar
              </Button>
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : edadesData ? (
            <Box>
              {edadesData.summary && edadesData.summary.length > 0 && (
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Distribución por Rango de Edad
                  </Typography>
                  <Grid container spacing={2}>
                    {edadesData.summary.map((rango, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ p: 2, backgroundColor: 'rgba(156, 39, 176, 0.05)', borderRadius: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {rango.rangoEdad}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              {rango.totalReservas} reservas
                            </Typography>
                            <Typography variant="body2">
                              {rango.clientesUnicos} clientes únicos
                            </Typography>
                            <Typography variant="body2" color="rgb(76, 175, 80)">
                              ${rango.totalFacturado.toLocaleString('es-CR')}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Edad promedio: {rango.edadPromedio.toFixed(1)} años
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}

              <ReportTable
                data={edadesData.data}
                columns={edadesColumns}
                title="Detalle por Rango de Edad"
              />
            </Box>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary">
                Aplica filtros para ver el reporte de edades
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
}

function StatCard({ title, value, subtitle, color, icon }) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="body2" color="textSecondary" fontWeight={500}>
          {title}
        </Typography>
        <Box sx={{ color: color, opacity: 0.7 }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h4" fontWeight={700} sx={{ color: color, my: 1 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {subtitle}
      </Typography>
    </Paper>
  );
}

DashboardTab.propTypes = {
  cedulaJuridica: PropTypes.string.isRequired,
  roomCount: PropTypes.number.isRequired
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.element
};

export default DashboardTab;