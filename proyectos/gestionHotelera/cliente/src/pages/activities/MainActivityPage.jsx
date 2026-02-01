import React, { useState, useEffect } from 'react';
import styles from './MainActivityPage.module.css';
import ActivityCardPrev from '../../components/activityCard/ActivityCardPrev';
import SearchBarActividades from '../../components/searchBar/SearchBarActividades';

const MainActivityPage = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/activities');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setActividades(data.data);
          setError(null);
        } else {
          setError(data.message || 'Error desconocido');
        }
      } catch (err) {
        setError('Error al obtener las actividades: ' + err.message);
        console.error('Error completo:', err);
      } finally {
        setLoading(false);
      }
    };

    obtenerActividades();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Actividades Disponibles</h1>
        <p>Encuentra una experiencia inolvidable en Limón</p>
      </div>

      <SearchBarActividades />

      {loading && <p className={styles.loading}>Cargando actividades...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.hotelGrid}>
        {actividades.map(actividad => (
          <ActivityCardPrev key={actividad.cedulaJuridica} actividad={actividad} />
        ))}
      </div>
    </div>
  );
};

export default MainActivityPage;
