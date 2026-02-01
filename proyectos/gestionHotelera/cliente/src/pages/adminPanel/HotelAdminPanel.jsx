import { useState, useEffect } from "react";
import styles from "./hotelAdminPanel.module.css";
import RoomDetailCard from "../../components/roomCard/RoomDetailCard";
import RoomModal from "../../components/modals/RoomModal";
import { Button, Typography, Tabs, Tab, CircularProgress, Alert, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function HotelAdminPanel() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user } = useAuth();

  // Estados para habitaciones
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [errorRooms, setErrorRooms] = useState(null);

  // Cargar habitaciones cuando hay cédula jurídica
  useEffect(() => {
    if (user?.cedulaJuridica) {
      loadRooms();
    }
  }, [user?.cedulaJuridica]);

  const loadRooms = async () => {
    setLoadingRooms(true);
    setErrorRooms(null);
    
    try {
      const response = await fetch(`${API_URL}/rooms/company/${user.cedulaJuridica}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setRooms(data.data);
        console.log(`${data.count} habitaciones cargadas:`, data.data);
      } else {
        setErrorRooms(data.message || 'Error al cargar las habitaciones');
      }
    } catch (err) {
      console.error('Error al cargar habitaciones:', err);
      setErrorRooms('Error de conexión con el servidor');
    } finally {
      setLoadingRooms(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEdit = (room) => {
    console.log("Editar habitación:", room);
    // Adaptar los datos de la habitación al formato del modal
    const roomForEdit = {
      habitacionID: room.habitacionID,
      roomNumber: room.numero,
      type: room.nombre,
      capacity: room.capacidad,
      description: room.descripcion,
      price: parseFloat(room.precio),
      images: room.url ? [room.url] : []
    };
    setSelectedRoom(roomForEdit);
    setIsModalOpen(true);
  };

  const handleDelete = async (room) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar la Habitación ${room.numero}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/rooms/${room.habitacionID}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Habitación eliminada exitosamente');
        loadRooms(); // Recargar las habitaciones
      } else {
        alert(data.message || 'Error al eliminar la habitación');
      }
    } catch (err) {
      console.error('Error al eliminar habitación:', err);
      alert('Error de conexión con el servidor');
    }
  };

  const handleAddRoom = () => {
    console.log("Agregar nueva habitación");
    setSelectedRoom(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSubmitRoom = (roomData) => {
    console.log("Datos de habitación recibidos:", roomData);
    // Recargar las habitaciones después de crear/actualizar
    loadRooms();
  };

  if (!user?.cedulaJuridica) {
    return (
      <div className={styles.container}>
        <Alert severity="error">
          Error: No se encontró información del hotel. Por favor, inicia sesión nuevamente.
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Typography variant="h4" color="black" fontWeight={500}>
          Panel de Administración
        </Typography>
        {user?.nombre && (
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            {user.nombre}
          </Typography>
        )}
      </div>

      <div className={styles.tabsContainer}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'rgb(211, 167, 85)',
              height: 3,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#666',
              '&.Mui-selected': {
                color: 'rgb(211, 167, 85)',
              },
            },
          }}
        >
          <Tab 
            icon={<HotelIcon />} 
            iconPosition="start" 
            label="Mis Habitaciones" 
          />
          <Tab 
            icon={<BookmarkIcon />} 
            iconPosition="start" 
            label="Reservas Activas" 
          />
          <Tab 
            icon={<DashboardIcon />} 
            iconPosition="start" 
            label="Dashboard de Reportes" 
          />
        </Tabs>
      </div>

      <TabPanel value={currentTab} index={0}>
        <div className={styles.btnContainer}>
          <Button
            onClick={handleAddRoom}
            sx={{
              backgroundColor: 'rgb(211, 167, 85)',
              color: 'white',
              borderRadius: '12px',
              padding: '0.5rem 1.5rem',
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgb(247, 224, 181)',
                color: 'rgb(27, 27, 27)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            + Agregar Habitación
          </Button>
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.cardFrame}>
            {loadingRooms && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Cargando habitaciones...</Typography>
              </Box>
            )}

            {errorRooms && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorRooms}
                <Button 
                  size="small" 
                  onClick={loadRooms}
                  sx={{ ml: 2 }}
                >
                  Reintentar
                </Button>
              </Alert>
            )}

            {!loadingRooms && !errorRooms && rooms.length === 0 && (
              <div className={styles.emptyState}>
                <HotelIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="#999">
                  No hay habitaciones registradas
                </Typography>
                <Typography variant="body2" color="#bbb">
                  Agrega tu primera habitación usando el botón superior
                </Typography>
              </div>
            )}

            {!loadingRooms && !errorRooms && rooms.length > 0 && (
              <div className={styles.cardsGrid}>
                {rooms.map((room) => (
                  <RoomDetailCard
                    key={room.habitacionID}
                    image={room.url || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'}
                    roomNumber={room.numero}
                    roomType={room.nombre || 'Estándar'}
                    description={room.descripcion || 'Habitación cómoda y bien equipada'}
                    capacity={room.capacidad || 'Estándar'}
                    price={parseFloat(room.precio)}
                    available={room.estado === 1}
                    amenities={room.comodidades || []}
                    onEdit={() => handleEdit(room)}
                    onDelete={() => handleDelete(room)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <div className={styles.cardContainer}>
          <div className={styles.cardFrame}>
            <div className={styles.emptyState}>
              <BookmarkIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="#999">
                Reservas Activas
              </Typography>
              <Typography variant="body2" color="#bbb">
                Aquí se mostrarán las cards de reservas activas
              </Typography>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <div className={styles.cardContainer}>
          <div className={styles.cardFrame}>
            <div className={styles.dashboardGrid}>
              <div className={styles.statsGrid}>
                <StatCard
                  title="Total Reservas"
                  value="45"
                  subtitle="Este mes"
                  color="rgb(211, 167, 85)"
                />
                <StatCard
                  title="Ingresos"
                  value="$12,450"
                  subtitle="Este mes"
                  color="rgb(76, 175, 80)"
                />
                <StatCard
                  title="Ocupación"
                  value="78%"
                  subtitle="Promedio"
                  color="rgb(33, 150, 243)"
                />
                <StatCard
                  title="Habitaciones"
                  value={rooms.length.toString()}
                  subtitle="Activas"
                  color="rgb(156, 39, 176)"
                />
              </div>

              <div className={styles.chartsArea}>
                <div className={styles.chartPlaceholder}>
                  <DashboardIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="#999">
                    Dashboard de Reportes
                  </Typography>
                  <Typography variant="body2" color="#bbb">
                    Gráficos y estadísticas detalladas próximamente
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

      {/* Modal para agregar/editar habitaciones */}
      <RoomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRoom}
        hotelId={user?.cedulaJuridica}
        roomToEdit={selectedRoom}
      />
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
        overflow: 'hidden' 
      }}
    >
      {value === index && children}
    </div>
  );
}

function StatCard({ title, value, subtitle, color }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardHeader}>
        <Typography variant="body2" color="#666" fontWeight={500}>
          {title}
        </Typography>
      </div>
      <Typography 
        variant="h3" 
        fontWeight={700} 
        sx={{ color: color, my: 1 }}
      >
        {value}
      </Typography>
      <Typography variant="caption" color="#999">
        {subtitle}
      </Typography>
    </div>
  );
}

export default HotelAdminPanel;