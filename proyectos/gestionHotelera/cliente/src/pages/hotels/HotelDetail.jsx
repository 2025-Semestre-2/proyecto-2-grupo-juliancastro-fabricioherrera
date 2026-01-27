import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './hotelDetail.module.css';

const HotelDetail = () => {
  const { idHotel } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/hotels/${idHotel}`);
        
        if (!response.ok) {
          throw new Error('Hotel no encontrado');
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setHotel(data.data || data);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar los detalles del hotel:', err);
      } finally {
        setLoading(false);
      }
    };

    if (idHotel) {
      fetchHotelDetails();
    }
  }, [idHotel]);

  if (loading) {
    return <div className={styles.container}>Cargando...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error: {error}</p>
        <button onClick={() => navigate('/hoteles')} className={styles.backButton}>
          Volver a hoteles
        </button>
      </div>
    );
  }

  if (!hotel) {
    return <div className={styles.container}>Hotel no encontrado</div>;
  }

  const servicios = hotel.servicios ? hotel.servicios.split(', ') : [];

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/hoteles')} className={styles.backButton}>
        ← Volver
      </button>

      <div className={styles.detailsWrapper}>
        <div className={styles.imageSection}>
          <img 
            src={hotel.fotoHabitacion || 'https://via.placeholder.com/600x400'} 
            alt={hotel.nombreHotel}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{hotel.nombreHotel}</h1>
          
          <div className={styles.location}>
            <span></span>
            <p>{hotel.distrito}, {hotel.canton}, {hotel.provincia}</p>
          </div>

          <div className={styles.priceSection}>
            <p className={styles.price}>€{hotel.precio}/noche</p>
          </div>

          <div className={styles.hotelInfo}>
            <div className={styles.infoCard}>
              <h3>Información General</h3>
              <ul>
                <li><strong>Nombre:</strong> {hotel.nombreHotel}</li>
                <li><strong>País:</strong> {hotel.pais}</li>
                <li><strong>Provincia:</strong> {hotel.provincia}</li>
                <li><strong>Cantón:</strong> {hotel.canton}</li>
                <li><strong>Distrito:</strong> {hotel.distrito}</li>
                <li><strong>ID Hotel:</strong> {hotel.idHotel}</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviciosSection}>
            <h3>Servicios Disponibles</h3>
            <div className={styles.serviciosList}>
              {servicios.length > 0 ? (
                servicios.map((servicio, index) => (
                  <span key={index} className={styles.servicioBadge}>
                    {servicio.trim()}
                  </span>
                ))
              ) : (
                <p>No hay servicios disponibles</p>
              )}
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.reserveButton}>Reservar Ahora</button>
            <button className={styles.contactButton}>Contactar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
