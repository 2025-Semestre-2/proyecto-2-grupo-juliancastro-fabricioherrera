import React from "react";
import PropTypes from "prop-types";
import styles from "./roomDetailCard.module.css";
import { IconButton, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

function RoomDetailCard({
  image,
  roomNumber,
  roomType,
  description,
  capacity,
  price,
  available,
  amenities,
  onEdit,
  onDelete
}) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={`Habitación ${roomNumber}`} className={styles.image} />
        <span className={styles.typeBadge}>{capacity}</span>
        {available !== undefined && (
          <div className={styles.availabilityBadge}>
            <Chip 
              label={!available ? "Disponible" : "Ocupada"}
              size="small"
              sx={{
                backgroundColor: !available ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
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
          <h3 className={styles.title}>Habitación {roomNumber}</h3>
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
            <MeetingRoomIcon className={styles.detailIcon} />
            <span>{roomType}</span>
          </div>
        </div>

        {amenities && amenities.length > 0 && (
          <div className={styles.amenities}>
            {amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity}
                size="small"
                sx={{
                  backgroundColor: 'rgba(211, 167, 85, 0.1)',
                  color: 'rgb(211, 167, 85)',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: '24px',
                  '& .MuiChip-label': {
                    padding: '0 8px'
                  }
                }}
              />
            ))}
          </div>
        )}
        
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
  roomNumber: PropTypes.number.isRequired,
  roomType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  available: PropTypes.bool,
  amenities: PropTypes.arrayOf(PropTypes.string),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

RoomDetailCard.defaultProps = {
  amenities: []
};

export default RoomDetailCard;