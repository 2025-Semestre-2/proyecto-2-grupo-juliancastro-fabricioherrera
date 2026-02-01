import styles from "./ActivityCard.module.css";
import { Link } from "react-router-dom";

function ActivityCard({
  title,
  description,
  link,
  price,
  imageUrl,
  activityType,
  bgColor = "#e6f4ee"
}) {
  return (
    <Link to={link} className={styles.cardLink}>
      <div className={styles.card}>
        <div
          className={styles.media}
          style={{ 
            backgroundColor: bgColor,
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className={styles.content}>
          <div className={styles.header}>
            <h4 className={styles.title}>{title}</h4>
            <span className={styles.price}>${price?.toLocaleString('es-CR')}</span>
          </div>
          
          {activityType && (
            <span className={styles.activityType}>{activityType}</span>
          )}
          
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCard;