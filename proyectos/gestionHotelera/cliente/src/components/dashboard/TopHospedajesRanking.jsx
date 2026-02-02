import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  Chip,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function TopHospedajesRanking() {
  const [loading, setLoading] = useState(false);
  const [hospedajes, setHospedajes] = useState([]);
  const [locationData, setLocationData] = useState({
    provinces: []
  });
  
  const [filters, setFilters] = useState({
    province: null,
    city: null,
    district: null,
    fechaInicio: '',
    fechaFin: ''
  });

  // Obtener provincias de Costa Rica
  useEffect(() => {
    fetchProvinces();
    fetchTopHospedajes();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${API_URL}/locations/countries`);
      const data = await response.json();
      if (data.success) {
        setLocationData({ provinces: data.data.provincia });
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchTopHospedajes = async (appliedFilters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (appliedFilters.province) params.append('provincia', appliedFilters.province);
      if (appliedFilters.city) params.append('canton', appliedFilters.city);
      if (appliedFilters.district) params.append('distrito', appliedFilters.district);
      if (appliedFilters.fechaInicio) params.append('fechaInicio', appliedFilters.fechaInicio);
      if (appliedFilters.fechaFin) params.append('fechaFin', appliedFilters.fechaFin);

      const response = await fetch(
        `${API_URL}/reports/top-hospedajes?${params.toString()}`
      );
      const data = await response.json();

      if (data.success) {
        setHospedajes(data.data);
      }
    } catch (error) {
      console.error('Error al obtener top hospedajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceChange = (event, newValue) => {
    setFilters(prev => ({
      ...prev,
      province: newValue,
      city: null,
      district: null
    }));
  };

  const handleCityChange = (event, newValue) => {
    setFilters(prev => ({
      ...prev,
      city: newValue,
      district: null
    }));
  };

  const handleDistrictChange = (event, newValue) => {
    setFilters(prev => ({
      ...prev,
      district: newValue
    }));
  };

  const handleDateChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    const appliedFilters = {};
    if (filters.province) appliedFilters.province = filters.province;
    if (filters.city) appliedFilters.city = filters.city;
    if (filters.district) appliedFilters.district = filters.district;
    if (filters.fechaInicio) appliedFilters.fechaInicio = filters.fechaInicio;
    if (filters.fechaFin) appliedFilters.fechaFin = filters.fechaFin;
    
    fetchTopHospedajes(appliedFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      province: null,
      city: null,
      district: null,
      fechaInicio: '',
      fechaFin: ''
    });
    fetchTopHospedajes();
  };

  const getRankColor = (index) => {
    const colors = [
      'rgb(255, 215, 0)',   // Oro
      'rgb(192, 192, 192)', // Plata
      'rgb(205, 127, 50)',  // Bronce
      'rgb(211, 167, 85)',  // Golden
      'rgb(211, 167, 85)'   // Golden
    ];
    return colors[index] || 'rgb(211, 167, 85)';
  };

  // Obtener la provincia seleccionada y sus cantones
  const selectedProvince = locationData.provinces.find(
    p => p.nombre === filters.province
  );
  const selectedCanton = selectedProvince?.canton.find(
    c => c.nombre === filters.city
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrophyIcon sx={{ mr: 1, color: 'rgb(211, 167, 85)', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Top 5 Hospedajes Más Demandados
        </Typography>
      </Box>

      {/* Filtros */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(auto-fit, minmax(180px, 1fr))'
          },
          gap: 2,
          mb: 3
        }}
      >
        <Autocomplete
          size="small"
          options={locationData.provinces.map(p => p.nombre)}
          value={filters.province}
          onChange={handleProvinceChange}
          renderInput={(params) => (
            <TextField {...params} label="Provincia" />
          )}
        />

        <Autocomplete
          size="small"
          options={selectedProvince?.canton.map(c => c.nombre) || []}
          value={filters.city}
          onChange={handleCityChange}
          disabled={!filters.province}
          renderInput={(params) => (
            <TextField {...params} label="Cantón" />
          )}
        />

        <Autocomplete
          size="small"
          options={selectedCanton?.distrito.map(d => d.nombre) || []}
          value={filters.district}
          onChange={handleDistrictChange}
          disabled={!filters.city}
          renderInput={(params) => (
            <TextField {...params} label="Distrito" />
          )}
        />

        <TextField
          fullWidth
          size="small"
          label="Fecha Inicio"
          type="date"
          value={filters.fechaInicio}
          onChange={(e) => handleDateChange('fechaInicio', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          fullWidth
          size="small"
          label="Fecha Fin"
          type="date"
          value={filters.fechaFin}
          onChange={(e) => handleDateChange('fechaFin', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            fullWidth
            size="small"
            sx={{
              backgroundColor: 'rgb(211, 167, 85)',
              '&:hover': { backgroundColor: 'rgb(191, 147, 65)' }
            }}
          >
            Aplicar
          </Button>
          <Button
            variant="outlined"
            onClick={handleClearFilters}
            fullWidth
            size="small"
            sx={{
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
      </Box>

      {/* Tabla de ranking */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: 'rgb(211, 167, 85)' }} />
        </Box>
      ) : hospedajes.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          <Typography>No hay datos disponibles para los filtros seleccionados</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(211, 167, 85, 0.1)' }}>
                <TableCell sx={{ fontWeight: 600, width: '80px' }}>Ranking</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hospedaje</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Ubicación</TableCell>
                <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Reservaciones</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Período</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospedajes.map((hospedaje, index) => (
                <TableRow 
                  key={index}
                  sx={{
                    '&:hover': { backgroundColor: 'rgba(211, 167, 85, 0.05)' },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <TableCell>
                    <Chip
                      icon={index < 3 ? <TrophyIcon /> : null}
                      label={`#${index + 1}`}
                      sx={{
                        backgroundColor: getRankColor(index),
                        color: index < 3 ? '#000' : '#fff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        '& .MuiChip-icon': {
                          color: index < 3 ? '#000' : '#fff'
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {hospedaje.hospedaje}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {hospedaje.distrito}, {hospedaje.canton}, {hospedaje.provincia}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      label={hospedaje.totalReservaciones}
                      sx={{
                        backgroundColor: 'rgba(211, 167, 85, 0.2)',
                        color: 'rgb(211, 167, 85)',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {new Date(hospedaje.primeraReserva).toLocaleDateString()} - {' '}
                        {new Date(hospedaje.ultimaReserva).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default TopHospedajesRanking;