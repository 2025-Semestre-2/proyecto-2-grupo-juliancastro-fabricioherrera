import React from "react";
import styles from "./navbar.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, logout, userRole } = useAuth();

  const renderRoleTab = () => {
    if (!isAuthenticated || !userRole) return null;

    switch (userRole) {
      case "User":
        return (
          <NavLink to="/my-reservations" className={styles.link}>
            Mis Reservas
          </NavLink>
        );
      case "EAdmin":
        return (
          <NavLink to="/admin/activities" className={styles.link}>
            Panel Actividades
          </NavLink>
        );
      case "HAdmin":
        return (
          <NavLink to="/admin/rooms" className={styles.link}>
            Panel Habitaciones
          </NavLink>
        );
      default:
        return null;
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/"></Link>
      </div>

      <nav className={styles.links}>
        <NavLink to="/" className={styles.link}>
          Inicio
        </NavLink>
        <NavLink to="/hoteles" className={styles.link}>
          Hoteles
        </NavLink>
        <NavLink to="/actividades" className={styles.link}>
          Actividades
        </NavLink>
        {renderRoleTab()}
      </nav>


      <div className={styles.actions}>
        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className={styles.buttonLink}>
              Iniciar Sesión
            </NavLink>
            <NavLink to="/register/user" className={styles.buttonPrimary}>
              Registrarse
            </NavLink>
          </>
        ) : (
          <button onClick={logout} className={styles.buttonPrimary}>
            Cerrar Sesión
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;