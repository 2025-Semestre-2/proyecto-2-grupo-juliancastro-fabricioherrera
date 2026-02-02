import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Chip
} from '@mui/material';
import {
  FilterList as FilterIcon
} from '@mui/icons-material';

function ReportFilters({ onApplyFilters, reportType, availableRoomTypes = [] }) {
  const [filters, setFilters] = useState({
    tipoHabitacion: '',
    habitacionID: '',
    anio: new Date().getFullYear(),
    mes: '',
    fechaInicio: '',
    fechaFin: '',
    temporada: '',
    rangoEdad: '',
    generacion: '',
    activa: ''
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const rangoEdadOptions = [
    'Menor de 18',
    '18-25 años',
    '26-35 años',
    '36-45 años',
    '46-55 años',
    '56-65 años',
    'Mayor de 65'
  ];

  const generacionOptions = [
    'Generación Z',
    'Millennials',
    'Generación X',
    'Baby Boomers'
  ];

  const temporadaOptions = ['Alta', 'Media', 'Baja'];

  const meses = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    // Filtrar solo los valores no vacíos
    const appliedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Actualizar chips de filtros activos
    const chips = Object.entries(appliedFilters).map(([key, value]) => ({
      key,
      label: getFilterLabel(key, value)
    }));
    setActiveFilters(chips);

    onApplyFilters(appliedFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      tipoHabitacion: '',
      habitacionID: '',
      anio: new Date().getFullYear(),
      mes: '',
      fechaInicio: '',
      fechaFin: '',
      temporada: '',
      rangoEdad: '',
      generacion: '',
      activa: ''
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onApplyFilters({});
  };

  const handleRemoveFilter = (filterKey) => {
    const newFilters = { ...filters, [filterKey]: '' };
    setFilters(newFilters);
    
    const appliedFilters = Object.entries(newFilters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const chips = Object.entries(appliedFilters).map(([key, value]) => ({
      key,
      label: getFilterLabel(key, value)
    }));
    setActiveFilters(chips);

    onApplyFilters(appliedFilters);
  };

  const getFilterLabel = (key, value) => {
    const labels = {
      tipoHabitacion: `Tipo: ${value}`,
      anio: `Año: ${value}`,
      mes: `Mes: ${meses.find(m => m.value === parseInt(value))?.label || value}`,
      fechaInicio: `Desde: ${value}`,
      fechaFin: `Hasta: ${value}`,
      temporada: `Temporada: ${value}`,
      rangoEdad: `Edad: ${value}`,
      generacion: `Gen: ${value}`,
      activa: `Estado: ${value === 'true' ? 'Activas' : 'Finalizadas'}`
    };
    return labels[key] || `${key}: ${value}`;
  };

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FilterIcon sx={{ mr: 1, color: 'rgb(211, 167, 85)' }} />
        <Box sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Filtros</Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(auto-fit, minmax(200px, 1fr))'
          },
          gap: 3
        }}
      >
        {/* Filtros comunes */}
        {(reportType === 'facturacion' || reportType === 'tipo') && (
          <FormControl fullWidth>
            <InputLabel>Tipo de Habitación</InputLabel>
            <Select
              value={filters.tipoHabitacion}
              onChange={(e) => handleFilterChange('tipoHabitacion', e.target.value)}
              label="Tipo de Habitación"
            >
              <MenuItem value="">Todos</MenuItem>
              {availableRoomTypes.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Filtros de fecha */}
        {reportType === 'facturacion' && (
          <>
            <TextField
              fullWidth
              label="Año"
              type="number"
              value={filters.anio}
              onChange={(e) => handleFilterChange('anio', e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Mes</InputLabel>
              <Select
                value={filters.mes}
                onChange={(e) => handleFilterChange('mes', e.target.value)}
                label="Mes"
              >
                <MenuItem value="">Todos</MenuItem>
                {meses.map((mes) => (
                  <MenuItem key={mes.value} value={mes.value}>{mes.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* Rango de fechas */}
        <TextField
          fullWidth
          label="Fecha Inicio"
          type="date"
          value={filters.fechaInicio}
          onChange={(e) => handleFilterChange('fechaInicio', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Fecha Fin"
          type="date"
          value={filters.fechaFin}
          onChange={(e) => handleFilterChange('fechaFin', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* Filtros específicos por tipo de reporte */}
        {reportType === 'tipo' && (
          <FormControl fullWidth>
            <InputLabel>Temporada</InputLabel>
            <Select
              value={filters.temporada}
              onChange={(e) => handleFilterChange('temporada', e.target.value)}
              label="Temporada"
            >
              <MenuItem value="">Todas</MenuItem>
              {temporadaOptions.map((temp) => (
                <MenuItem key={temp} value={temp}>{temp}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {reportType === 'edades' && (
          <>
            <FormControl fullWidth>
              <InputLabel>Rango de Edad</InputLabel>
              <Select
                value={filters.rangoEdad}
                onChange={(e) => handleFilterChange('rangoEdad', e.target.value)}
                label="Rango de Edad"
              >
                <MenuItem value="">Todos</MenuItem>
                {rangoEdadOptions.map((rango) => (
                  <MenuItem key={rango} value={rango}>{rango}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Generación</InputLabel>
              <Select
                value={filters.generacion}
                onChange={(e) => handleFilterChange('generacion', e.target.value)}
                label="Generación"
              >
                <MenuItem value="">Todas</MenuItem>
                {generacionOptions.map((gen) => (
                  <MenuItem key={gen} value={gen}>{gen}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={filters.activa}
                onChange={(e) => handleFilterChange('activa', e.target.value)}
                label="Estado"
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="true">Activas</MenuItem>
                <MenuItem value="false">Finalizadas</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        {/* Botones */}
        <Button
          variant="contained"
          onClick={handleApply}
          sx={{
            height: '56px',
            backgroundColor: 'rgb(211, 167, 85)',
            '&:hover': { backgroundColor: 'rgb(191, 147, 65)' }
          }}
        >
          Aplicar
        </Button>
        <Button
          variant="outlined"
          onClick={handleClear}
          sx={{
            height: '56px',
            borderColor: 'rgb(211, 167, 85)',
            color: 'rgb(211, 167, 85)',
            '&:hover': {
              borderColor: 'rgb(191, 147, 65)',
              backgroundColor: 'rgba(211, 167, 85, 0.1)'
            }
          }}
        >
          Limpiar
        </Button>
      </Box>

      {/* Chips de filtros activos */}
      {activeFilters.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {activeFilters.map((filter) => (
            <Chip
              key={filter.key}
              label={filter.label}
              onDelete={() => handleRemoveFilter(filter.key)}
              size="small"
              sx={{
                backgroundColor: 'rgba(211, 167, 85, 0.1)',
                color: 'rgb(211, 167, 85)',
                '& .MuiChip-deleteIcon': {
                  color: 'rgb(211, 167, 85)'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}

ReportFilters.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
  reportType: PropTypes.oneOf(['facturacion', 'tipo', 'edades']).isRequired,
  availableRoomTypes: PropTypes.arrayOf(PropTypes.string)
};

export default ReportFilters;