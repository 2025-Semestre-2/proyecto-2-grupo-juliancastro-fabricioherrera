import styles from "./ActivityCard.module.css";
import { Link } from "react-router-dom";

function ActivityCard({
  title,
  description,
  link,
  bgColor = "#e6f4ee"
}) {
  return (
    <div className={styles.card}>
      <div
        className={styles.media}
        style={{ backgroundColor: bgColor }}
      />

      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>

        <Link to={link} className={styles.button}>
          Reservar Actividad
        </Link>
      </div>
    </div>
  );
}

export default ActivityCard;
