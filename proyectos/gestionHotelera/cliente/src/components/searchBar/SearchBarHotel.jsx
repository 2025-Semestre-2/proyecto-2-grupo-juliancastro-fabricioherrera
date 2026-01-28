import React, { useState } from 'react';
import styles from './searchBarHotel.module.css';

const SearchBarHotel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
          <h3 className={styles.filtersTitle}>Servicios</h3>
          <div className={styles.servicesGrid}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Piscina
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> WiFi
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Parqueo
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Restaurante
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Bar
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Ranchos
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Spa
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Gimnasio
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Acceso a Playa
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Aire Acondicionado
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Desayuno Incluido
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Tours
            </label>
          </div>
          <button className={styles.applyButton}>Aplicar Filtros</button>
        </div>
      )}
    </div>
  );
};

export default SearchBarHotel;
