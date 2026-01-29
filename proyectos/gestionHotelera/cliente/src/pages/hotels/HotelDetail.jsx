import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './hotelDetail.module.css';

const HotelDetail = () => {
  const { idHotel } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socialNetworks, setSocialNetworks] = useState({});

  // Mapeo de íconos/colores para redes sociales
  const socialIcons = {
    'TikTok': '🎵',
    'Instagram': '📷',
    'Facebook': '👍',
    'YouTube': '▶️',
    'Airbnb': '🏠',
    'X': '𝕏'
  };

  const defaultImage = 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/457660099.jpg?k=de3de8785e60f108043338681e139977fc02c251aa5a3d6b2d0d8e4319d16fb9&o=';

  const parseSocialNetworks = (redesSocialesStr) => {
    if (!redesSocialesStr) return {};
    
    const networks = {};
    const parts = redesSocialesStr.split(' | ');
    
    parts.forEach(part => {
      const [name, url] = part.split(': ');
      if (name && url) {
        networks[name.trim()] = url.trim();
      }
    });
    
    return networks;
  };

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
        const hotelData = data.data || data;
        setHotel(hotelData);
        
        // Parsear redes sociales
        if (hotelData.redesSociales) {
          setSocialNetworks(parseSocialNetworks(hotelData.redesSociales));
        }
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

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/hoteles')} className={styles.backButton}>
        ← Volver a la lista
      </button>

      <div className={styles.detailsWrapper}>
        <div className={styles.imageSection}>
          <img 
            src={hotel.fotoHabitacion || defaultImage} 
            alt={hotel.nombreHotel}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{hotel.nombreHotel}</h1>
          
          <div className={styles.location}>
            <span>📍</span>
            <p>{hotel.canton}, {hotel.provincia}</p>
          </div>


          {/* Servicios disponibles */}
          <div className={styles.serviciosSection}>
            <h3>Servicios del Hotel:</h3>
            <div className={styles.serviciosList}>
              <span className={styles.servicioBadge}>Piscina</span>
              <span className={styles.servicioBadge}>WiFi</span>
              <span className={styles.servicioBadge}>Restaurante</span>
              <span className={styles.servicioBadge}>Bar</span>
              <span className={styles.servicioBadge}>Parqueo</span>
              <span className={styles.servicioBadge}>Spa</span>
              <span className={styles.servicioBadge}>Tours</span>
            </div>
          </div>

          {/* Contacto */}
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span>📞</span>
              <a href={`tel:${hotel.telefono1}`}>{hotel.telefono1}</a>
            </div>
            
            <div className={styles.contactItem}>
              <span>✉️</span>
              <a href="mailto:info@hotel.com">info@hotel.com</a>
            </div>
            
            <div className={styles.contactItem}>
              <span>🌐</span>
              <a href="http://www.hotel.com" target="_blank" rel="noopener noreferrer">www.hotel.com</a>
            </div>
          </div>

          {/* Redes Sociales */}
          {Object.keys(socialNetworks).length > 0 && (
            <div className={styles.socialNetworks}>
              <h3>Síguenos:</h3>
              <div className={styles.socialLinks}>
                {Object.entries(socialNetworks).map(([network, url]) => (
                  <a 
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    title={network}
                  >
                    {socialIcons[network] || '🔗'}
                  </a>
                ))}
              </div>
            </div>
          )}

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
