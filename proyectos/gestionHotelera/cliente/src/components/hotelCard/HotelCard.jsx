import React from 'react';
import styles from './hotelCard.module.css';

const HotelCard = ({ hotel }) => {
  const servicios = hotel.servicios ? hotel.servicios.split(', ') : [];

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={hotel.fotoHabitacion || 'https://via.placeholder.com/300x200'} 
          alt={hotel.nombreHotel} 
          className={styles.image} 
        />
        {hotel.precio && (
          <div className={styles.priceBadge}>
            €{hotel.precio}/noche
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{hotel.nombreHotel}</h3>
        
        <div className={styles.location}>
          <span></span>
          <p>{hotel.canton}, {hotel.provincia}</p>
        </div>
        
        <p className={styles.description}>
          Hotel ubicado en el corazón de {hotel.canton} con vistas espectaculares
        </p>
        
        <div className={styles.servicios}>
          {servicios.slice(0, 4).map((servicio, index) => (
            <span key={index} className={styles.servicioBadge}>
              {servicio.trim()}
            </span>
          ))}
        </div>
        
        <button className={styles.button}>Ver Detalles</button>
      </div>
    </div>
  );
};

export default HotelCard;