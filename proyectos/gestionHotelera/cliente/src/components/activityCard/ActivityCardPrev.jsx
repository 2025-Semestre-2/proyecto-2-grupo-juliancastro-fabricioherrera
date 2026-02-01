import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActivityCardPrev.module.css';

const ActivityCardPrev = ({ actividad }) => {

  const hotelId = actividad.idActividad || actividad.cedulaJuridica || actividad.cedula || actividad.cedula_juridica;
  const defaultImage = 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/457660099.jpg?k=de3de8785e60f108043338681e139977fc02c251aa5a3d6b2d0d8e4319d16fb9&o=';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={actividad.url || defaultImage} 
          alt={actividad.foto} 
          className={styles.image} 
        />
        {actividad.precio && (
          <div className={styles.priceBadge}>
            €{actividad.precio}/persona
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{actividad.foto}</h3>

        <h4 className={styles.description}>{actividad.descripcion}</h4>
        <h4 className={styles.description}>{actividad.nombreEmpresa}</h4>
              
        
        {hotelId ? (
          <Link to={`/actividades/${hotelId}`} className={styles.link}>
            <button className={styles.button}>Ver Detalles</button>
          </Link>
        ) : (
          <button className={styles.button} disabled>Ver Detalles</button>
        )}
      </div>
    </div>
  );
};

export default ActivityCardPrev;