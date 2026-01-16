import React from "react";
import styles from "./banner.module.css"
import { Link } from "react-router-dom";

function Banner() {

  return (
    <div className={styles.banner}>
        <div className={styles.shadow}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}><span>Tortuga Verde</span><br/>
                Descubre el paraíso en Limón</h1> 
                <h2>Encuentra hoteles, habitaciones y actividades todo en un único lugar. </h2>    
                <div className={styles.btnContainer}>
                    <Link to="/" className={styles.linkBtn}>Ver Habitaciones</Link>
                    <Link to="/" className={styles.linkBtn}>Ver Actividades Recreativas</Link>
                </div>   
            </div>
        </div>
    </div>
  );
}

export default Banner;