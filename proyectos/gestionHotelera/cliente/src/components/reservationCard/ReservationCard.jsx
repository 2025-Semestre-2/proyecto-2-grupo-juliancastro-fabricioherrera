import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Chip,
  Divider
} from '@mui/material';
import { 
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  DirectionsCar as CarIcon,
  Payments as PaymentsIcon,
  MeetingRoom as RoomIcon
} from '@mui/icons-material';

function ReservationCard({ 
  reservation, 
  onCheckout, 
  loading = false 
}) {
  const {
    numReservacion,
    nombre,
    numero,
    fechaIngreso,
    fechaSalida,
    cantPersonas,
    vehiculo,
    precio,
    activa
  } = reservation;

  // Formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calcular noches de estancia
  const calculateNights = () => {
    const checkIn = new Date(fechaIngreso);
    const checkOut = new Date(fechaSalida);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  return (
    <Card 
      sx={{ 
        display: 'flex',
        mb: 2,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)'
        },
        opacity: activa ? 1 : 0.6
      }}
    >
      {/* Franja lateral de color */}
      <Box
        sx={{
          width: '8px',
          backgroundColor: activa ? 'rgb(34, 197, 94)' : '#999',
          borderRadius: '12px 0 0 12px'
        }}
      />

      <CardContent sx={{ flex: 1, p: 3 }}>
        {/* Header con número de reserva y estado */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={600} color="text.primary">
              Reserva #{numReservacion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <HotelIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
              {nombre}
            </Typography>
          </Box>
          <Chip 
            label={activa ? 'Activa' : 'Finalizada'}
            color={activa ? 'success' : 'default'}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Grid de información */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 2
        }}>
          {/* Habitación */}
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              <RoomIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Habitación
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              #{numero}
            </Typography>
          </Box>

          {/* Fechas */}
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              <CalendarIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Check-in / Check-out
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatDate(fechaIngreso)}
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatDate(fechaSalida)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {nights} {nights === 1 ? 'noche' : 'noches'}
            </Typography>
          </Box>

          {/* Personas */}
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              <PeopleIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Huéspedes
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {cantPersonas} {cantPersonas === 1 ? 'persona' : 'personas'}
            </Typography>
          </Box>

          {/* Vehículo */}
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              <CarIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Vehículo
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {vehiculo ? 'Sí' : 'No'}
            </Typography>
          </Box>
        </Box>

        {/* Footer con precio y botón */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pt: 2,
          borderTop: '1px solid #eee'
        }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              <PaymentsIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Precio por persona
            </Typography>
            <Typography variant="h6" color="rgb(34, 197, 94)" fontWeight={600}>
              ${parseFloat(precio).toLocaleString('es-CR', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          {activa && (
            <Button
              variant="contained"
              onClick={() => onCheckout(numReservacion)}
              disabled={loading}
              sx={{
                backgroundColor: 'rgb(34, 197, 94)',
                color: 'white',
                borderRadius: '8px',
                padding: '0.5rem 1.5rem',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgb(22, 163, 74)',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                }
              }}
            >
              {loading ? 'Procesando...' : 'Realizar Checkout'}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

ReservationCard.propTypes = {
  reservation: PropTypes.shape({
    numReservacion: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    numero: PropTypes.number.isRequired,
    fechaIngreso: PropTypes.string.isRequired,
    fechaSalida: PropTypes.string.isRequired,
    cantPersonas: PropTypes.number.isRequired,
    vehiculo: PropTypes.bool.isRequired,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    activa: PropTypes.bool.isRequired,
  }).isRequired,
  onCheckout: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default ReservationCard;