import React from 'react';
import { Link } from 'react-router-dom';
import styles from './hotelCard.module.css';

const HotelCard = ({ hotel }) => {
  const servicios = hotel.servicios ? hotel.servicios.split(', ') : [];
  const hotelId = hotel.idHotel || hotel.cedulaJuridica || hotel.cedula || hotel.cedula_juridica;
  const defaultImage = 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/457660099.jpg?k=de3de8785e60f108043338681e139977fc02c251aa5a3d6b2d0d8e4319d16fb9&o=';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={hotel.fotoHabitacion || defaultImage} 
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