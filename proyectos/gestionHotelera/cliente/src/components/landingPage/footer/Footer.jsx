import React from "react";
import styles from "./footer.module.css";
import { NavLink } from "react-router-dom";
import animationStyles from "./../../animations/loadIn.module.css";
import ActivityCard from "../../activityCard/ActivityCard"



function Footer() {
  return (
    <div className={styles.footer}>
        <hr/>
        <h2>Tortuga Verde</h2>
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
        <div className={styles.socialMedia}>
            <a href=""><div className={`${styles.mediaIcon} ${styles.instagram}`}></div></a>
            <a href=""><div className={`${styles.mediaIcon} ${styles.facebook}`}></div></a>
            <a href=""><div className={`${styles.mediaIcon} ${styles.tiktok}`}></div></a>
        </div>
        <p> © Copyright 2026 | <span>Tortuga Verde</span></p>
    </div>
);
}

export default Footer;