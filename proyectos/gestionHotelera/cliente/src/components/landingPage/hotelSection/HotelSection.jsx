import React from "react";
import lupa from "../../../assets/lupa.png";
import calendar from "../../../assets/calendar.png";
import hotel from "../../../assets/hotel.png";
import creditCard from "../../../assets/tarjeta.png";
import report from "../../../assets/reporte.png";
import contact from "../../../assets/contactos.png";
import styles from "./hotelSection.module.css";

import { Link } from "react-router-dom";
import animationStyles from "./../../animations/loadIn.module.css";
import IconCard from "./../../iconCard/IconCard"

const cardDescriptions = {
    1: "Encuentra el alojamiento perfecto en Limón con precio, ubicación, servicios y calificaciones.",
    2: "Sistema de reservas instantáneas con confirmación automática y gestión de disponibilidad en tiempo real.",
    3: "Plataforma completa para que hoteles y propietarios administren sus alojamientos y reservas fácilmente.",
    4: "Procesamiento seguro de pagos con múltiples métodos y protección tanto para huéspedes como propietarios.",
    5: "Creación de reportes y estadísticas sobre el gestionamiento de las habitaciones y actividades.",
    6: "Información de contacto y referencias geográficas de los hóspedajes y actividades."
}


function HotelSection() {

  return (
    <div className={styles.hotelSection}>
        <h2 className={`${animationStyles.fadeUp} ${animationStyles.delay3}`}>Reserva de Hoteles</h2>
        <h3 className={`${animationStyles.fadeUp} ${animationStyles.delay3}`}>
            Queremos ofrecerte una experiencia premium<br/>
            con servicios de primera clase haciendo tu<br/>
            estadía inolvidable
        </h3>
        <div className={styles.cardGrid}>
            <IconCard icon={lupa} title={'Búsqueda Avanzada'} text={cardDescriptions[1]}></IconCard>
            <IconCard icon={calendar} title={'Reservas en Línea'} text={cardDescriptions[2]}></IconCard>
            <IconCard icon={hotel} title={'Gestión de Servicios'} text={cardDescriptions[3]}></IconCard>
            <IconCard icon={creditCard} title={'Pagos Seguros'} text={cardDescriptions[4]}></IconCard>
            <IconCard icon={report} title={'Generación de Reportes'} text={cardDescriptions[5]}></IconCard>
            <IconCard icon={contact} title={'Contacto'} text={cardDescriptions[6]}></IconCard>
        </div>
    </div>
);
}

export default HotelSection;