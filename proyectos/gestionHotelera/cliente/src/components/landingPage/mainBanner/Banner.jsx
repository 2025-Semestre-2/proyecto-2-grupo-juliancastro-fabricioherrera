import React from "react";
import styles from "./banner.module.css"
import { Link } from "react-router-dom";
import animationStyles from "./../../animations/loadIn.module.css";

function Banner() {

  return (
    <div className={styles.banner}>
        <div className={styles.shadow}>
            <div className={styles.textContainer}>
                <h1 className={`${styles.title} ${animationStyles.fadeUp}` }><span>Tortuga Verde</span><br/><br/></h1> 
                <h2 className={`${animationStyles.fadeUp} ${animationStyles.delay1}`}>Encuentra hoteles, habitaciones y actividades todo en un único lugar. </h2>    
                <div className={styles.btnContainer}>
                    <Link to="/hoteles" className={styles.linkBtn}>Ver Habitaciones</Link>
                    <Link to="/" className={styles.linkBtn}>Ver Actividades Recreativas</Link>
                </div>   
            </div>
        </div>
    </div>
  );
}

export default Banner;