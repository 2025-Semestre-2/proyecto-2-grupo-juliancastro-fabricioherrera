import React from 'react';
import { Link } from 'react-router-dom';
import styles from './hotelCard.module.css';

const HotelCard = ({ hotel }) => {
  const servicios = hotel.servicios ? hotel.servicios.split(', ') : [];
  const hotelId = hotel.idHotel || hotel.cedulaJuridica || hotel.cedula || hotel.cedula_juridica;

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
        
        <div className={styles.servicios}>
          {servicios.slice(0, 4).map((servicio, index) => (
            <span key={index} className={styles.servicioBadge}>
              {servicio.trim()}
            </span>
          ))}
        </div>
        
        {hotelId ? (
          <Link to={`/hotel/${hotelId}`} className={styles.link}>
            <button className={styles.button}>Ver Detalles</button>
          </Link>
        ) : (
          <button className={styles.button} disabled>Ver Detalles</button>
        )}
      </div>
    </div>
  );
};

export default HotelCard;