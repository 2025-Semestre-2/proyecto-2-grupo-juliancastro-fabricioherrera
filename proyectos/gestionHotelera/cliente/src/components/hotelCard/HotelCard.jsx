import React from 'react';
import styles from './hotelCard.module.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={hotel.image} alt={hotel.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{hotel.name}</h3>
        <p className={styles.description}>{hotel.description}</p>
        <button className={styles.button}>Ver Detalles</button>
      </div>
    </div>
  );
};

export default HotelCard;