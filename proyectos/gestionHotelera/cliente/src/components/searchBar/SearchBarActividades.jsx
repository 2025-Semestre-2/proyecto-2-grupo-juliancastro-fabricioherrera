import React, { useState } from 'react';
import styles from './searchBarHotel.module.css';

const SearchBarActividades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // ADD: lista de actividades para los filtros
  const actividades = [
    'Tour en kayak',
    'Paseo en catamaran',
    'Caminata guiada',
    'Senderismo',
    'Montura a caballo',
    'Tour en bicicleta',
    'Excursion ecologica',
    'Tour de observacion de aves',
    'Tour panoramico',
    'Recorrido cultural',
    'Recorrido historico',
    'Tour gastronomico',
    'Clase recreativa',
    'Actividad acuática',
    'Paseo en bote',
    'Tour al atardecer',
    'Tour al amanecer',
    'Actividad de aventura',
    'Actividad al aire libre',
    'Tour naturalista',
    'Experiencia guiada',
    'Recorrido escénico',
    'Tour fotográfico',
    'Actividad recreativa',
    'Actividad familiar',
    'Actividad grupal',
    'Actividad individual',
    'Experiencia cultural',
    'Experiencia natural',
    'Experiencia turística',
    'Tour de exploración',
    'Tour guiado',
    'Actividad deportiva',
    'Actividad de relajación',
    'Paseo recreativo',
    'Tour terrestre',
    'Tour acuático',
    'Experiencia al aire libre',
    'Recorrido rural',
    'Actividad de integración',
    'Tour ecologico',
    'Experiencia de aventura',
  ];
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Buscar por nombre o ubicación"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <button className={styles.filterButton} onClick={handleFilter}>
          {showFilters ? '✕ Ocultar filtros' : 'Mostrar filtros'}
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersPanel}>

          <h3 className={styles.filtersTitle}>Actividades</h3>
          <div className={styles.servicesGrid}>
            {actividades.map((nombre, idx) => (
              <label key={idx} className={styles.checkboxLabel}>
                <input type="checkbox" /> {nombre}
              </label>
            ))}
          </div>
          <button className={styles.applyButton}>Aplicar Filtros</button>
        </div>
      )}
    </div>
  );
};

export default SearchBarActividades;
