import React, { useState, useEffect } from "react";
import styles from "./activitySection.module.css";
import animationStyles from "./../../animations/loadIn.module.css";
import ActivityCard from "../../activityCard/ActivityCard";

function ActivitySection() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Realizar la petición a la API para obtener todas las actividades
        const response = await fetch('/api/activities');
        
        if (!response.ok) {
          throw new Error('Error al cargar las actividades');
        }

        const data = await response.json();
        
        // Tomar solo las primeras 3 actividades
        const topActivities = data.data ? data.data.slice(0, 3) : [];
        setActivities(topActivities);
        setError(null);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Función para generar colores de fondo variados
  const getBackgroundColor = (index) => {
    const colors = ["#1e2c26", "#2a4a3a", "#1a3d2e"];
    return colors[index % colors.length];
  };

  return (
    <div className={styles.activitySection}>
      <h2 className={`${animationStyles.fadeUp} ${animationStyles.delay3}`}>
        Actividades Recreativas
      </h2>
      <h3 className={`${animationStyles.fadeUp} ${animationStyles.delay3}`}>
        Descubre la belleza de Costa Rica a través de de estas <br />
        inolvidables experiencias
      </h3>

      {loading ? (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>Cargando actividades...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>Error: {error}</p>
        </div>
      ) : activities.length === 0 ? (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>No hay actividades disponibles en este momento</p>
        </div>
      ) : (
        <div className={styles.cardGrid}>
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.empresaActividadID}
              title={activity.titulo}
              description={activity.descripcion}
              link={`/actividades/${activity.empresaActividadID}`}
              price={activity.precio}
              imageUrl={activity.url}
              activityType={activity.nombre}
              bgColor={getBackgroundColor(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivitySection;