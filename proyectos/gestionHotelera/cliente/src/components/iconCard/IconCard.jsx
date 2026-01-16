import styles from "./iconCard.module.css";


function InfoCard({
  icon,
  title,
  text,
  borderColor = "#b7f0d1",
  backgroundColor = "#ffffff"
}) {
  return (
    <div
      className={styles.card}
      style={{
        borderColor,
        backgroundColor
      }}
    >
      <div className={styles.iconWrapper}>
        <img src={icon} alt="" className={styles.icon} />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default InfoCard;