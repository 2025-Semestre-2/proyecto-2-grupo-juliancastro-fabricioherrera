import { useState } from "react";
import styles from "./userReservations.module.css";
import { Typography, Tabs, Tab } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function UserReservations() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleViewDetails = (reservationId) => {
    console.log("Ver detalles de reserva:", reservationId);
  };

  const handleCancelReservation = (reservationId) => {
    console.log("Cancelar reserva:", reservationId);
  };

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
            label="Mis Reservas" 
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
            <div className={styles.emptyState}>
              <BookmarkIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="#999">
                No tienes reservas activas
              </Typography>
              <Typography variant="body2" color="#bbb">
                Tus reservas aparecerán aquí una vez que reserves una habitación o actividad
              </Typography>
            </div>
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
        overflow: 'hidden' 
      }}
    >
      {value === index && children}
    </div>
  );
}

export default UserReservations;