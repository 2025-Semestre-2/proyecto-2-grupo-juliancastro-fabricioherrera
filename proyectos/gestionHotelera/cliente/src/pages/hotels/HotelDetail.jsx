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
  const [servicios, setServicios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [filtros, setFiltros] = useState({
    tiposCama: [],
    tiposHabitacion: [],
    comodidades: [],
    precioMin: 0,
    precioMax: 999
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Opciones disponibles para filtros
  const TIPOS_CAMA = ['Individual', 'Queen', 'King'];
  const TIPOS_HABITACION = ['Estándar', 'Familiar', 'Deluxe', 'Ejecutiva', 'Suite', 'Premium'];
  const COMODIDADES_OPCIONES = ['WiFi de Habitación', 'Agua Caliente', 'Balcón', 'Aire Acondicionado', 'TV', 'Vista al Mar', 'Ventilador', 'Caja Fuerte'];

  // Mapeo de íconos SVG minimalistas para redes sociales
  const socialIcons = {
    'TikTok': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    ),
    'Instagram': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <circle cx="17.5" cy="6.5" r="1.5"></circle>
      </svg>
    ),
    'Facebook': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h3v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h1z"></path>
      </svg>
    ),
    'YouTube': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
    'AirBnB': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5.83 10.5a5 5 0 0 1 8.34 0"></path>
        <path d="M3.46 7.04a9 9 0 0 1 17.08 0"></path>
        <circle cx="12" cy="13" r="5"></circle>
      </svg>
    ),
    'X': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    )
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

  const parseServicios = (serviciosStr) => {
    if (!serviciosStr) return [];
    return serviciosStr.split(', ').map(servicio => servicio.trim()).filter(s => s);
  };

  const parseComodidades = (comodidadesStr) => {
    if (!comodidadesStr) return [];
    return comodidadesStr.split(', ').map(comodidad => comodidad.trim()).filter(c => c);
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

        // Parsear servicios
        if (hotelData.serviciosHotel) {
          setServicios(parseServicios(hotelData.serviciosHotel));
        }

        // Fetch habitaciones
        const habitacionesResponse = await fetch(`http://localhost:3001/api/hotels/${idHotel}/habitaciones`);
        if (habitacionesResponse.ok) {
          const habitacionesData = await habitacionesResponse.json();
          setHabitaciones(habitacionesData.data || []);
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p>{hotel.canton}, {hotel.provincia}</p>
          </div>


          {/* Servicios disponibles */}
          <div className={styles.serviciosSection}>
            <h3>Servicios del Hotel:</h3>
            <div className={styles.serviciosList}>
              {servicios.length > 0 ? (
                servicios.map((servicio, index) => (
                  <span key={index} className={styles.servicioBadge}>
                    {servicio}
                  </span>
                ))
              ) : (
                <p>No hay servicios disponibles</p>
              )}
            </div>
          </div>

          {/* Contacto */}
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href={`tel:${hotel.telefono1}`}>{hotel.telefono1}</a>
            </div>
            
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <a href="mailto:info@hotel.com">info@hotel.com</a>
            </div>
            
            <div className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
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

        </div>
      </div>

      {/* Sección de Habitaciones */}
      <div className={styles.habitacionesSection}>
        <h2>Habitaciones Disponibles</h2>
        
        <button 
          className={styles.filtroToggle}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
        >
          {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>

        {mostrarFiltros && (
          <div className={styles.filtrosPanel}>
            <h3>Filtros de Búsqueda</h3>
            
            {/* Tipo de Cama */}
            <div className={styles.filtroGrupo}>
              <label className={styles.filtroLabel}>Tipo de Cama</label>
              <div className={styles.checkboxGrid3}>
                {TIPOS_CAMA.map((tipo) => (
                  <label key={tipo} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={filtros.tiposCama.includes(tipo)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFiltros({...filtros, tiposCama: [...filtros.tiposCama, tipo]});
                        } else {
                          setFiltros({...filtros, tiposCama: filtros.tiposCama.filter(t => t !== tipo)});
                        }
                      }}
                    />
                    <span>{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tipo de Habitación */}
            <div className={styles.filtroGrupo}>
              <label className={styles.filtroLabel}>Tipo de Habitación</label>
              <div className={styles.checkboxGrid2}>
                {TIPOS_HABITACION.map((tipo) => (
                  <label key={tipo} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={filtros.tiposHabitacion.includes(tipo)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFiltros({...filtros, tiposHabitacion: [...filtros.tiposHabitacion, tipo]});
                        } else {
                          setFiltros({...filtros, tiposHabitacion: filtros.tiposHabitacion.filter(t => t !== tipo)});
                        }
                      }}
                    />
                    <span>{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comodidades */}
            <div className={styles.filtroGrupo}>
              <label className={styles.filtroLabel}>Comodidades de Habitación</label>
              <div className={styles.checkboxGrid3}>
                {COMODIDADES_OPCIONES.map((comodidad) => (
                  <label key={comodidad} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={filtros.comodidades.includes(comodidad)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFiltros({...filtros, comodidades: [...filtros.comodidades, comodidad]});
                        } else {
                          setFiltros({...filtros, comodidades: filtros.comodidades.filter(c => c !== comodidad)});
                        }
                      }}
                    />
                    <span>{comodidad}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rango de Precio */}
            <div className={styles.filtroGrupo}>
              <label className={styles.filtroLabel}>Rango de Precio (€ por noche)</label>
              <div className={styles.precioGrid}>
                <div>
                  <label>Precio Mínimo</label>
                  <input 
                    type="number" 
                    placeholder="€0"
                    value={filtros.precioMin}
                    onChange={(e) => setFiltros({...filtros, precioMin: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label>Precio Máximo</label>
                  <input 
                    type="number" 
                    placeholder="€999"
                    value={filtros.precioMax}
                    onChange={(e) => setFiltros({...filtros, precioMax: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tarjetas de Habitaciones */}
        <div className={styles.habitacionesGrid}>
          {habitaciones.length > 0 ? (
            habitaciones.map((habitacion, index) => (
              <div key={index} className={styles.habitacionCard}>
                <div className={styles.habitacionImage}>
                  <img 
                    src={habitacion.fotoHabitacion || defaultImage}
                    alt={habitacion.nombreHabitacion}
                  />
                  <div className={styles.priceBadge}>
                    ₡{habitacion.precio}/noche
                  </div>
                </div>
                <div className={styles.habitacionInfo}>
                  <h3>{habitacion.nombreHabitacion}</h3>
                  <p className={styles.descripcion}>{habitacion.descripcion}</p>
                  
                  <div className={styles.detalles}>
                    <div className={styles.detalle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9a6 6 0 1 0 12 0A6 6 0 0 0 6 9z"></path>
                      </svg>
                      {habitacion.tipoCama}
                    </div>
                    <div className={styles.detalle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      {habitacion.habitacionesDisponibles} disponible(s)
                    </div>
                  </div>

                  {habitacion.comodidades && (
                    <div className={styles.comodidades}>
                      {parseComodidades(habitacion.comodidades).slice(0, 4).map((comodidad, idx) => (
                        <span key={idx} className={styles.comodidadBadge}>
                          {comodidad}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className={styles.reservarButton}>Reservar Ahora</button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noHabitaciones}>No hay habitaciones disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
