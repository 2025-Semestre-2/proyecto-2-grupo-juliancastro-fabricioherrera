import React, { useState, useEffect } from 'react';
import styles from './MainHotelPage.module.css';
import HotelCard from '../../components/hotelCard/HotelCard';
import SearchBarHotel from '../../components/searchBar/SearchBarHotel';

const MainHotelPage = () => {
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerHoteles = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/hotels/getHoteles');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setHoteles(data.data);
          setError(null);
        } else {
          setError(data.message || 'Error desconocido');
        }
      } catch (err) {
        setError('Error al obtener los hoteles: ' + err.message);
        console.error('Error completo:', err);
      } finally {
        setLoading(false);
      }
    };

    obtenerHoteles();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hoteles Disponibles</h1>
        <p>Encuentra el Alojamiento Perfecto en Limón</p>
      </div>

      <SearchBarHotel />

      {loading && <p className={styles.loading}>Cargando hoteles...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.hotelGrid}>
        {hoteles.map(hotel => (
          <HotelCard key={hotel.cedulaJuridica} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default MainHotelPage;
