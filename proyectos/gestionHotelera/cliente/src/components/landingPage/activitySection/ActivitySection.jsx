import React from "react";
import styles from "./activitySection.module.css";
import { Link } from "react-router-dom";
import animationStyles from "./../../animations/loadIn.module.css";
import ActivityCard from "../../activityCard/ActivityCard"



function ActivitySection() {
  return (
    <div className={styles.activitySection}>
        <h2 className={`${animationStyles.fadeUp} ${animationStyles.delay3}`}>Actividades Recreativas</h2>
        <h3 className={`${animationStyles.fadeUp} ${animationStyles.delay3}`}>
            Descubre la belleza de Costa Rica a través de de estas <br/> inolvidables experiencias
        </h3>
        <div className={styles.cardGrid}>
        <ActivityCard title="Avistamiento de Tortugas"
            description="Experiencia única observando tortugas marinas en su hábitat natural durante la temporada de anidación."
            link="/actividades/tortugas"
            bgColor="#1e2c26"/>
        <ActivityCard title="Avistamiento de Tortugas"
            description="Experiencia única observando tortugas marinas en su hábitat natural durante la temporada de anidación."
            link="/actividades/tortugas"
            bgColor="#1e2c26"/>
        <ActivityCard title="Avistamiento de Tortugas"
            description="Experiencia única observando tortugas marinas en su hábitat natural durante la temporada de anidación."
            link="/actividades/tortugas"
            bgColor="#1e2c26"/>
        </div>
    </div>
);
}

export default ActivitySection;