import React from "react";
import PropTypes from "prop-types";
import styles from "./roomDetailCard.module.css";
import { IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import KingBedIcon from "@mui/icons-material/KingBed";

function RoomDetailCard({
  image,
  title,
  description,
  type,
  capacity,
  beds,
  price,
  available,
  onEdit,
  onDelete
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.typeBadge}>{type}</span>
        {available !== undefined && (
          <div className={styles.availabilityBadge}>
            <Chip 
              label={available ? "Disponible" : "Ocupada"}
              size="small"
              sx={{
                backgroundColor: available ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
              }}
            />
          </div>
        )}
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
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <PeopleIcon className={styles.detailIcon} />
            <span>{capacity} {capacity === 1 ? 'persona' : 'personas'}</span>
          </div>
          <div className={styles.detailItem}>
            <KingBedIcon className={styles.detailIcon} />
            <span>{beds} {beds === 1 ? 'cama' : 'camas'}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Precio por noche</span>
            <span className={styles.price}>${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

RoomDetailCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  beds: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  available: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default RoomDetailCard;