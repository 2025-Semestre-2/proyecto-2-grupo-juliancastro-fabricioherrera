import React from 'react';
import { useState } from 'react';
import styles from './ActivityCardPrev.module.css';
import { createPortal } from 'react-dom';

// function ActivityCardPrev() {
const ActivityCardPrev = ({ actividad }) => {
  // NEW: local state to control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  const actividadId = actividad.idActividad || actividad.cedulaJuridica || actividad.cedula || actividad.cedula_juridica;
  const defaultImage = 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/457660099.jpg?k=de3de8785e60f108043338681e139977fc02c251aa5a3d6b2d0d8e4319d16fb9&o=';

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };
  const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '900px',
    maxHeight: '85vh',
    overflowY: 'auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    position: 'relative',
    color: '#000'
  };
  const closeButtonStyle = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    background: '#222',
    color: '#fff',
    fontSize: '20px',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    lineHeight: '36px'
  };

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
            ${actividad.precio}/persona
          </div>
        )}
      </div>
      
      <div className={styles.content} style={{ color: '#000' }}>
        <h3 className={styles.title}>{actividad.foto}</h3>

        <h4 className={styles.description}>{actividad.descripcion}</h4>
        <h4 className={styles.description}>{actividad.nombreEmpresa}</h4>
        <h4 className={styles.description}>{actividad.nombreDistrito}, {actividad.nombreCanton}</h4>
        
        <button className={styles.button} onClick={() => setIsOpen(true)}>Ver Detalles</button>
      </div>

      {/* Popup modal rendered via portal to escape transformed parents */}
      {isOpen && createPortal(
        <div style={overlayStyle} onClick={() => setIsOpen(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyle} onClick={() => setIsOpen(false)} aria-label="Cerrar">×</button>
            <img 
              src={actividad.url || defaultImage} 
              alt={actividad.foto} 
              style={{ width: '100%', maxHeight: '50vh', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
            />
            <div style={{ padding: '20px' }}>
              <h2 style={{ marginBottom: '10px' }}>{actividad.foto}</h2>
              {actividad.precio && (
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                  <strong>Precio:</strong> ${actividad.precio}/persona
                </p>
              )}
              <p style={{ marginBottom: '10px' }}>
                <strong>Descripción:</strong> {actividad.descripcion}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Empresa:</strong> {actividad.nombreEmpresa}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Ubicación:</strong> {actividad.nombreDistrito}, {actividad.nombreCanton}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
// }

export default ActivityCardPrev;