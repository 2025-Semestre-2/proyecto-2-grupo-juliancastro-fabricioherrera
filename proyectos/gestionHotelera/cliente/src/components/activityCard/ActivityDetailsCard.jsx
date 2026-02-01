import React from "react";
import PropTypes from "prop-types";
import styles from "./activityDetailCard.module.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ActivityDetailCard({
  image,
  title,
  description,
  type,
  price,
  onEdit,
  onDelete
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.typeBadge}>{type}</span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.actions}>
            <IconButton 
              className={styles.iconButton}
              onClick={onEdit}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              className={styles.iconButton}
              onClick={onDelete}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Precio por persona</span>
            <span className={styles.price}>${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ActivityDetailCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActivityDetailCard;