import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './hotelDetail.module.css';

import { API_URL, getUserIdentification } from '../../utils/api';

// HotelDetail component
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

  // Estados para reserva
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [mostrarReserva, setMostrarReserva] = useState(false);
  // Keep the selected room ID in its own state to avoid null issues and field name variations
  const [selectedHabitacionId, setSelectedHabitacionId] = useState(null);
  const [datosReserva, setDatosReserva] = useState({
    // Datos del Cliente
    cedula: '',
    nombre: '',
    email: '',
    telefono: '',
    // Detalles de la Reserva
    checkIn: '',
    horaIngreso: '14:00',
    checkOut: '',
    huespedes: 1,
    poseeVehiculo: 'No',
    // Información de Pago
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    nombreTarjeta: '',
    fechaVencimiento: '',
    cvv: ''
  });

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

  const calcularNoches = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const fechaIn = new Date(checkIn);
    const fechaOut = new Date(checkOut);
    const diffTime = Math.abs(fechaOut - fechaIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calcularPrecioTotal = () => {
    if (!habitacionSeleccionada || !datosReserva.checkIn || !datosReserva.checkOut) return 0;
    const noches = calcularNoches(datosReserva.checkIn, datosReserva.checkOut);
    return habitacionSeleccionada.precio * noches;
  };



  const handleReservar = (habitacion) => {
    setHabitacionSeleccionada(habitacion);
    setSelectedHabitacionId(habitacion?.habitacionID ?? null);
    setMostrarReserva(true);
  };


  const handleCerrarReserva = () => {
    setMostrarReserva(false);
    setHabitacionSeleccionada(null);
    setSelectedHabitacionId(null);
    setDatosReserva({
      cedula: '',
      nombre: '',
      email: '',
      telefono: '',
      checkIn: '',
      horaIngreso: '14:00',
      checkOut: '',
      huespedes: 1,
      poseeVehiculo: 'No',
      metodoPago: 'tarjeta',
      numeroTarjeta: '',
      nombreTarjeta: '',
      fechaVencimiento: '',
      cvv: ''
    });
  };


  const handleSubmitReserva = async (e) => {
    e.preventDefault();
    try {
      // Aquí se asume que el usuario está autenticado y el token está en localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para reservar.');
        return;
      }

      // NEW: extract identificacion from JWT; fallback to localStorage.user if needed
      let identificacion = getUserIdentification();
      if (!identificacion) {
        try {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          identificacion = user?.identificacion || null;
        } catch {
          identificacion = null;
        }
      }

      if (!identificacion) {
        alert('No se pudo determinar tu identificación. Vuelve a iniciar sesión.');
        return;
      }

      // Ensure we have a normalized room id
      const habitacionID = selectedHabitacionId ?? habitacionSeleccionada?.habitacionID ?? null;
      if (!habitacionID) {
        alert('No se pudo determinar la habitación seleccionada. Intenta nuevamente.');
        return;
      }
      // --- CHANGES END ---

      const response = await fetch(`${API_URL}/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          habitacionID,
          fechaInicio: `${datosReserva.checkIn}T${datosReserva.horaIngreso}`,
          fechaSalida: `${datosReserva.checkOut}T12:00`,
          cantPersonas: datosReserva.huespedes,
          vehiculo: datosReserva.poseeVehiculo === 'Si' ? 1 : 0,
          identificacion
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert('Reserva realizada exitosamente. Número de reservación: ' + data.numReservacion);
        // NEW: trigger download of the generated invoice PDF
        await downloadFacturaPDF(data.numReservacion);
        handleCerrarReserva();
      } else {
        alert('Error al realizar la reserva: ' + (data.error || 'Error desconocido.'));
      }
    } catch (err) {
      alert('Error de red o del servidor: ' + err.message);
    }
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);

        // CHANGE: use API_URL and provide clearer server error output
        const response = await fetch(`${API_URL}/hotels/${idHotel}`);
        if (!response.ok) {
          const text = await response.text().catch(() => '');
          throw new Error(`HTTP ${response.status}: ${text || 'Hotel no encontrado'}`);
        }
        const data = await response.json();
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
        const habitacionesResponse = await fetch(`${API_URL}/hotels/${idHotel}/habitaciones`);
        if (!habitacionesResponse.ok) {
          const text = await habitacionesResponse.text().catch(() => '');
          throw new Error(`HTTP ${habitacionesResponse.status}: ${text || 'No se pudieron cargar las habitaciones'}`);
        }
        const habitacionesData = await habitacionesResponse.json();
        const rawHabitaciones = habitacionesData.data || habitacionesData || [];
        setHabitaciones(rawHabitaciones);
        // --- CHANGES END ---
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
              // --- CHANGES START: key uses habitacionID exclusively ---
              <div key={habitacion.habitacionID ?? index} className={styles.habitacionCard}>
              // --- CHANGES END ---
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

                  <button 
                    className={styles.reservarButton}
                    onClick={() => handleReservar(habitacion)}
                  >
                    Reservar Ahora
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noHabitaciones}>No hay habitaciones disponibles</p>
          )}
        </div>
      </div>

      {/* Modal de Reserva */}
      {mostrarReserva && habitacionSeleccionada && (
        <div className={styles.reservaModal}>
          <div className={styles.reservaOverlay} onClick={handleCerrarReserva}></div>
          <div className={styles.reservaContentWrapper}>
            <button 
              className={styles.closeButton}
              onClick={handleCerrarReserva}
              type="button"
            >
              ✕
            </button>
            <h2 className={styles.reservaTitle}>Finalizar Reserva</h2>
            <form onSubmit={handleSubmitReserva} className={styles.reservaForm}>
              {/* Datos del Cliente */}
              <div className={styles.formSection}>
                <h3>Datos del Cliente</h3>
                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Cédula o Identificación *</label>
                    <input
                      type="text"
                      value={datosReserva.cedula}
                      onChange={(e) => setDatosReserva({...datosReserva, cedula: e.target.value})}
                      placeholder="1-2345-6789"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Nombre Completo *</label>
                    <input
                      type="text"
                      value={datosReserva.nombre}
                      onChange={(e) => setDatosReserva({...datosReserva, nombre: e.target.value})}
                      placeholder="Juan Pérez Rodríguez"
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Correo Electrónico *</label>
                    <input
                      type="email"
                      value={datosReserva.email}
                      onChange={(e) => setDatosReserva({...datosReserva, email: e.target.value})}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Teléfono *</label>
                    <input
                      type="tel"
                      value={datosReserva.telefono}
                      onChange={(e) => setDatosReserva({...datosReserva, telefono: e.target.value})}
                      placeholder="+506 8888-8888"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Detalles de la Reserva */}
              <div className={styles.formSection}>
                <h3>Detalles de la Reserva</h3>
                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Fecha de Ingreso *</label>
                    <input
                      type="date"
                      value={datosReserva.checkIn}
                      onChange={(e) => setDatosReserva({...datosReserva, checkIn: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Hora de Ingreso *</label>
                    <input
                      type="time"
                      value={datosReserva.horaIngreso}
                      onChange={(e) => setDatosReserva({...datosReserva, horaIngreso: e.target.value})}
                      required
                    />
                    <small>Check-in desde las 14:00</small>
                  </div>
                </div>
                <div className={styles.formGrid2}>
                  <div className={styles.formGroup}>
                    <label>Fecha de Salida *</label>
                    <input
                      type="date"
                      value={datosReserva.checkOut}
                      onChange={(e) => setDatosReserva({...datosReserva, checkOut: e.target.value})}
                      required
                    />
                    <small>Check-out hasta las 12:00</small>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Cantidad de Personas *</label>
                    <input
                      type="number"
                      min="1"
                      value={datosReserva.huespedes}
                      onChange={(e) => setDatosReserva({...datosReserva, huespedes: parseInt(e.target.value)})}
                      required
                    />

                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>¿Posee Vehículo? *</label>
                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      className={styles.toggleButton + (datosReserva.poseeVehiculo === 'Si' ? ' ' + styles.active : '')}
                      onClick={() => setDatosReserva({...datosReserva, poseeVehiculo: 'Si'})}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      className={styles.toggleButton + (datosReserva.poseeVehiculo === 'No' ? ' ' + styles.active : '')}
                      onClick={() => setDatosReserva({...datosReserva, poseeVehiculo: 'No'})}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {/* Información de Pago */}
              <div className={styles.formSection}>
                <h3>Información de Pago</h3>
                <div className={styles.formGroup}>
                  <label>Método de Pago *</label>
                  <div className={styles.paymentMethods}>
                    <button
                      type="button"
                      className={styles.paymentButton + (datosReserva.metodoPago === 'tarjeta' ? ' ' + styles.activePayment : '')}
                      onClick={() => setDatosReserva({...datosReserva, metodoPago: 'tarjeta'})}
                    >
                      Tarjeta de Crédito/Débito
                    </button>
                    <button
                      type="button"
                      className={styles.paymentButton + (datosReserva.metodoPago === 'efectivo' ? ' ' + styles.activePayment : '')}
                      onClick={() => setDatosReserva({...datosReserva, metodoPago: 'efectivo'})}
                    >
                      Efectivo en el Local
                    </button>
                  </div>
                </div>

                {datosReserva.metodoPago === 'tarjeta' && (
                  <>
                    <div className={styles.formGroup}>
                      <label>Número de Tarjeta *</label>
                      <input
                        type="text"
                        value={datosReserva.numeroTarjeta}
                        onChange={(e) => setDatosReserva({...datosReserva, numeroTarjeta: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Nombre en la Tarjeta *</label>
                      <input
                        type="text"
                        value={datosReserva.nombreTarjeta}
                        onChange={(e) => setDatosReserva({...datosReserva, nombreTarjeta: e.target.value})}
                        placeholder="JUAN PEREZ"
                        required
                      />
                    </div>
                    <div className={styles.formGrid2}>
                      <div className={styles.formGroup}>
                        <label>Fecha de Vencimiento *</label>
                        <input
                          type="text"
                          value={datosReserva.fechaVencimiento}
                          onChange={(e) => setDatosReserva({...datosReserva, fechaVencimiento: e.target.value})}
                          placeholder="MM/AA"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>CVV *</label>
                        <input
                          type="text"
                          value={datosReserva.cvv}
                          onChange={(e) => setDatosReserva({...datosReserva, cvv: e.target.value})}
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button type="submit" className={styles.submitReservaButton}>
                Confirmar y Pagar ₡{calcularPrecioTotal()}
              </button>
              <button type="button" onClick={handleCerrarReserva} className={styles.cancelReservaButton}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

  export default HotelDetail;
