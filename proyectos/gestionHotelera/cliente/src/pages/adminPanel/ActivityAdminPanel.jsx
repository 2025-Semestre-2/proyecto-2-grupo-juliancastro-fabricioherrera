import styles from "./activityAdminPanel.module.css";
import ActivityDetailsCard from "../../components/activityCard/ActivityDetailsCard";
import { Button, Typography } from "@mui/material";

function ActivityAdminPanel() {
  const handleEdit = (activityId) => {
    console.log("Editar actividad:", activityId);
  };

  const handleDelete = (activityId) => {
    console.log("Eliminar actividad:", activityId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Typography variant="h4" color="black" fontWeight={500}>
          Mis Actividades
        </Typography>
      </div>
      <div className={styles.btnContainer}>
        <Button
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
            }
          }}
        >
          + Agregar Actividad
        </Button>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardFrame}>
          <div className={styles.cardsGrid}>
            <ActivityDetailsCard
              image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
              title="Tour Gastronómico"
              description="Descubre los sabores locales con nuestro tour culinario exclusivo. Visita restaurantes tradicionales y mercados auténticos."
              type="Gastronomía"
              price={45.00}
              onEdit={() => handleEdit(1)}
              onDelete={() => handleDelete(1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityAdminPanel;