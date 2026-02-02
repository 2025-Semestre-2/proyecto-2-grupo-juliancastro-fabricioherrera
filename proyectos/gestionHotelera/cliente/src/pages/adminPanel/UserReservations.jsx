import { useState, useEffect } from "react";
import styles from "./userReservations.module.css";
import { Typography, Tabs, Tab, CircularProgress, Alert, Box, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ReservationCard from "../../components/reservationCard/ReservationCard";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function UserReservations() {
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useAuth();

  // Estados para reservas
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [errorReservations, setErrorReservations] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  // Cargar reservas al montar el componente
  useEffect(() => {
    if (user?.identificacion) {
      loadReservations();
    }
  }, [user?.identificacion]);

  const loadReservations = async () => {
    setLoadingReservations(true);
    setErrorReservations(null);

    try {
      const response = await fetch(`${API_URL}/reservations/user/${user.identificacion}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setReservations(data.data);
        console.log(`${data.count} reservas cargadas:`, data.data);
      } else {
        setErrorReservations(data.message || 'Error al cargar las reservas');
      }
    } catch (err) {
      console.error('Error al cargar reservas:', err);
      setErrorReservations('Error de conexión con el servidor');
    } finally {
      setLoadingReservations(false);
    }
  };

  const handleCheckout = async (numReservacion) => {
    if (!window.confirm('¿Estás seguro de que deseas realizar el checkout de esta reserva?')) {
      return;
    }

    setCheckoutLoading(numReservacion);

    try {
      const response = await fetch(
        `${API_URL}/reservations/${numReservacion}/checkout`,
        {
          method: 'PATCH',
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Checkout realizado exitosamente');
        // Recargar las reservas después del checkout
        loadReservations();
      } else {
        alert(data.message || 'Error al realizar el checkout');
      }
    } catch (err) {
      console.error('Error al realizar checkout:', err);
      alert('Error de conexión con el servidor');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Filtrar reservas activas e inactivas
  const activeReservations = reservations.filter(r => r.activa);
  const inactiveReservations = reservations.filter(r => !r.activa);

  if (!user?.identificacion) {
    return (
      <div className={styles.container}>
        <Alert severity="error">
          Error: No se encontró información del usuario. Por favor, inicia sesión nuevamente.
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Typography variant="h4" color="black" fontWeight={500}>
          Mis Reservas
        </Typography>
      </div>

      <div className={styles.tabsContainer}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'rgb(34, 197, 94)',
              height: 3,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#666',
              '&.Mui-selected': {
                color: 'rgb(34, 197, 94)',
              },
            },
          }}
        >
          <Tab 
            icon={<BookmarkIcon />} 
            iconPosition="start" 
            label={`Mis Reservas (${activeReservations.length})`}
          />
          <Tab 
            icon={<EmojiEventsIcon />} 
            iconPosition="start" 
            label="Ranking" 
          />
        </Tabs>
      </div>

      <TabPanel value={currentTab} index={0}>
        <div className={styles.cardContainer}>
          <div className={styles.cardFrame}>
            {loadingReservations && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px' 
              }}>
                <CircularProgress sx={{ color: 'rgb(34, 197, 94)' }} />
                <Typography sx={{ ml: 2 }}>Cargando reservas...</Typography>
              </Box>
            )}

            {errorReservations && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorReservations}
                <Button 
                  size="small" 
                  onClick={loadReservations}
                  sx={{ ml: 2 }}
                >
                  Reintentar
                </Button>
              </Alert>
            )}

            {!loadingReservations && !errorReservations && reservations.length === 0 && (
              <div className={styles.emptyState}>
                <BookmarkIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="#999">
                  No tienes reservas
                </Typography>
                <Typography variant="body2" color="#bbb">
                  Tus reservas aparecerán aquí una vez que reserves una habitación
                </Typography>
              </div>
            )}

            {!loadingReservations && !errorReservations && reservations.length > 0 && (
              <Box>
                {/* Reservas Activas */}
                {activeReservations.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ mb: 2, color: 'rgb(34, 197, 94)' }}
                    >
                      Reservas Activas
                    </Typography>
                    {activeReservations.map((reservation) => (
                      <ReservationCard
                        key={reservation.numReservacion}
                        reservation={reservation}
                        onCheckout={handleCheckout}
                        loading={checkoutLoading === reservation.numReservacion}
                      />
                    ))}
                  </Box>
                )}

                {/* Historial de Reservas */}
                {inactiveReservations.length > 0 && (
                  <Box>
                    <Typography 
                      variant="h6" 
                      fontWeight={600} 
                      sx={{ mb: 2, color: '#666' }}
                    >
                      Historial de Reservas
                    </Typography>
                    {inactiveReservations.map((reservation) => (
                      <ReservationCard
                        key={reservation.numReservacion}
                        reservation={reservation}
                        onCheckout={handleCheckout}
                        loading={false}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </div>
        </div>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <div className={styles.cardContainer}>
          <div className={styles.cardFrame}>
            <div className={styles.emptyState}>
              <EmojiEventsIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="#999">
                Sistema de Ranking
              </Typography>
              <Typography variant="body2" color="#bbb">
                Aquí podrás ver tu posición en el ranking y tus logros
              </Typography>
            </div>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ 
        display: value === index ? 'flex' : 'none', 
        flexDirection: 'column', 
        flex: 1, 
        overflow: 'auto',
        padding: '0'
      }}
    >
      {value === index && children}
    </div>
  );
}

export default UserReservations;