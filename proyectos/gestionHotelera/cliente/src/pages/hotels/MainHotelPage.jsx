import React from 'react';
import styles from './MainHotelPage.module.css';
import HotelCard from '../../components/hotelCard/HotelCard';
import SearchBarHotel from '../../components/searchBar/SearchBarHotel';

const MainHotelPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Nuestros Hoteles</h1>
        <p>Descubre nuestras opciones de alojamiento en Limón</p>
      </div>

      <SearchBarHotel />
      
      <div className={styles.hotelGrid}>
        {/* Aquí van los hoteles consultados */}
      </div>
    </div>
  );
};

export default MainHotelPage;
