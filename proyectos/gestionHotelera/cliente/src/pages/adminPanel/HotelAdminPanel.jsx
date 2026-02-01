import { useState } from "react";
import styles from "./hotelAdminPanel.module.css";
import RoomDetailCard from "../../components/roomCard/RoomDetailCard";
import RoomModal from "../../components/modals/RoomModal";
import { Button, Typography, Tabs, Tab } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HotelIcon from "@mui/icons-material/Hotel";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function HotelAdminPanel() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // TODO: Reemplazar con datos del backend
  const hotelId = "HOTEL123"; // Este debería venir de la sesión o contexto

  const rooms = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      title: "Suite Presidencial",
      description: "Lujosa suite con vista panorámica, jacuzzi privado y todas las comodidades premium para una estancia inolvidable.",
      type: "Suite",
      capacity: 4,
      beds: 2,
      price: 350.00,
      available: true,
      roomNumber: "501",
      amenities: ["WiFi", "Jacuzzi", "Vista al Mar", "Minibar", "Servicio a la Habitación"],
      images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      title: "Habitación Deluxe",
      description: "Espaciosa habitación con decoración moderna, balcón privado y todas las amenidades necesarias para tu confort.",
      type: "Deluxe",
      capacity: 2,
      beds: 1,
      price: 180.00,
      available: true,
      roomNumber: "302",
      amenities: ["WiFi", "Aire Acondicionado", "Balcón", "TV", "Caja Fuerte"],
      images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      title: "Habitación Estándar",
      description: "Cómoda habitación perfecta para viajeros de negocios o parejas, con todas las comodidades básicas incluidas.",
      type: "Estándar",
      capacity: 2,
      beds: 1,
      price: 120.00,
      available: false,
      roomNumber: "105",
      amenities: ["WiFi", "Aire Acondicionado", "TV", "Baño Privado"],
      images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"]
    }
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEdit = (roomId) => {
    console.log("Editar habitación:", roomId);
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (roomId) => {
    console.log("Eliminar habitación:", roomId);
    // TODO: Implementar lógica de eliminación
    if (confirm("¿Estás seguro de que deseas eliminar esta habitación?")) {
      // Llamar al backend para eliminar
      alert("Habitación eliminada (pendiente implementación backend)");
    }
  };

  const handleAddRoom = () => {
    console.log("Agregar nueva habitación");
    setSelectedRoom(null); // Asegurar que no hay habitación seleccionada
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSubmitRoom = (roomData) => {
    console.log("Datos de habitación recibidos:", roomData);
    // TODO: Implementar lógica para actualizar la lista de habitaciones
    // Esto podría ser recargar los datos del backend o actualizar el estado local
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Typography variant="h4" color="black" fontWeight={500}>
          Panel de Administración
        </Typography>
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
            {rooms.length === 0 ? (
              <div className={styles.emptyState}>
                <HotelIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="#999">
                  No hay habitaciones registradas
                </Typography>
                <Typography variant="body2" color="#bbb">
                  Agrega tu primera habitación usando el botón superior
                </Typography>
              </div>
            ) : (
              <div className={styles.cardsGrid}>
                {rooms.map((room) => (
                  <RoomDetailCard
                    key={room.id}
                    image={room.image}
                    title={room.title}
                    description={room.description}
                    type={room.type}
                    capacity={room.capacity}
                    beds={room.beds}
                    price={room.price}
                    available={room.available}
                    onEdit={() => handleEdit(room.id)}
                    onDelete={() => handleDelete(room.id)}
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
                  value="12"
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
        hotelId={hotelId}
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