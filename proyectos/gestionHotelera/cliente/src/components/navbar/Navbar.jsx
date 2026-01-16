import React from "react";
import styles from "./navbar.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Logo</Link>
      </div>

      <nav className={styles.links}>
        <NavLink to="/" className={styles.link}>
          Inicio
        </NavLink>
        <NavLink to="/rooms" className={styles.link}>
          Hoteles
        </NavLink>
        <NavLink to="/about" className={styles.link}>
          Actividades
        </NavLink>
      </nav>


      <div className={styles.actions}>
        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className={styles.buttonLink}>
              Iniciar Sesión
            </NavLink>
            <NavLink to="/register" className={styles.buttonPrimary}>
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