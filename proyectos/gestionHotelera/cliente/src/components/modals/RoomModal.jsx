import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function RoomModal({ open, onClose, onSubmit, hotelId, roomToEdit = null }) {
    const isEditMode = Boolean(roomToEdit);
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        roomNumber: '',
        roomType: null,
        bedType: '',
        amenities: [],
        price: '',
        images: []
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    
    // Estados para los datos del autocomplete
    const [roomTypes, setRoomTypes] = useState([]);
    const [amenitiesList, setAmenitiesList] = useState([]);
    const [loadingTypes, setLoadingTypes] = useState(false);
    const [loadingAmenities, setLoadingAmenities] = useState(false);

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (open) {
      loadRoomTypes();
      loadAmenities();
      
      if (isEditMode && roomToEdit) {
        console.log("Editando habitación:", roomToEdit);
        
        setFormData({
          roomNumber: roomToEdit.roomNumber || '',
          roomType: roomToEdit.type ? 
            roomTypes.find(rt => rt.nombre === roomToEdit.type) : null,
          bedType: roomToEdit.bedType || '',
          amenities: roomToEdit.amenities || [],
          price: roomToEdit.price ? roomToEdit.price.toString() : '',
          images: []
        });
        
        // Mostrar las imágenes actuales si existen
        if (roomToEdit.images && roomToEdit.images.length > 0) {
          setImagePreviews(roomToEdit.images.map(img => ({ url: img, isExisting: true })));
        }
      } else if (open && !isEditMode) {
        console.log("Nueva habitación para hotel:", hotelId);
      }
    }
  }, [open, isEditMode, roomToEdit, hotelId, roomTypes]);

  const loadRoomTypes = async () => {
    setLoadingTypes(true);
    try {
      const response = await fetch(`${API_URL}/types/getRoomTypes`);
      const data = await response.json();
      if (data.success) {
        setRoomTypes(data.data);
        console.log('Tipos de habitación cargados:', data);
      }
    } catch (error) {
      console.error("Error fetching room types:", error);
      setUploadError('Error al cargar los tipos de habitación');
    } finally {
      setLoadingTypes(false);
    }
  };

  const loadAmenities = async () => {
    setLoadingAmenities(true);
    try {
      const response = await fetch(`${API_URL}/types/getAmenities`);
      const data = await response.json();
      if (data.success) {
        setAmenitiesList(data.data);
        console.log('Comodidades cargadas:', data);
      }
    } catch (error) {
      console.error("Error fetching amenities:", error);
      setUploadError('Error al cargar las comodidades');
    } finally {
      setLoadingAmenities(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoomTypeChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      roomType: newValue,
      bedType: newValue ? newValue.cama : ''
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    // Validar que todos sean imágenes
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setUploadError('Por favor selecciona solo archivos de imagen válidos');
      return;
    }

    // Validar tamaño (5MB por imagen)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setUploadError('Cada imagen no debe superar los 5MB');
      return;
    }

    // Limitar a 10 imágenes totales
    const currentImageCount = formData.images.length + imagePreviews.filter(p => p.isExisting).length;
    if (currentImageCount + files.length > 10) {
      setUploadError('Máximo 10 imágenes permitidas');
      return;
    }

    setUploadError(null);

    // Agregar las nuevas imágenes
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    // Crear previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, { url: reader.result, isExisting: false, file }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = imagePreviews[index];
    
    // Remover de previews
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    
    // Si no es una imagen existente, removerla de formData.images
    if (!imageToRemove.isExisting) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(img => img !== imageToRemove.file)
      }));
    }
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!formData.roomNumber || !formData.roomType) {
      setUploadError('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setUploadError('Por favor ingresa un precio válido mayor a cero');
      return;
    }

    if (formData.amenities.length === 0) {
      setUploadError('Por favor selecciona al menos una comodidad');
      return;
    }

    // Solo requerir imágenes en modo creación
    const totalImages = formData.images.length + imagePreviews.filter(p => p.isExisting).length;
    if (!isEditMode && totalImages === 0) {
      setUploadError('Por favor sube al menos una imagen');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formDataToSend = new FormData();
      

      formDataToSend.append('hotelId', user.cedulaJuridica);
      
      formDataToSend.append('roomNumber', formData.roomNumber);
      formDataToSend.append('roomType', formData.roomType.nombre);
      formDataToSend.append('amenities', JSON.stringify(formData.amenities));
      formDataToSend.append('price', formData.price);

      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      
      const url = `${API_URL}/rooms`;
      const method = 'POST';
      
      const response = await fetch(url, {
        method: method,
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (onSubmit) {
          onSubmit(data.data);
        }
        
        handleClose();
        
        alert('¡Habitación creada exitosamente!');
      } else {
        setUploadError(data.message || 'Error al crear la habitación');
      }
    } catch (error) {
      console.error('Error al crear habitación:', error);
      setUploadError('Error de conexión con el servidor');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      roomNumber: '',
      roomType: null,
      bedType: '',
      amenities: [],
      price: '',
      images: []
    });
    setImagePreviews([]);
    setUploadError(null);
    setUploading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={!uploading ? handleClose : undefined}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '1rem'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          pb: 1,
          fontSize: '1.5rem',
          fontWeight: 600
        }}
      >
        {isEditMode ? 'Editar Habitación' : 'Agregar Nueva Habitación'}
        <IconButton onClick={handleClose} size="small" disabled={uploading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {uploadError && (
            <Alert severity="error" onClose={() => setUploadError(null)}>
              {uploadError}
            </Alert>
          )}

          <TextField
            label="Número de Habitación"
            variant="outlined"
            fullWidth
            type="number"
            required
            disabled={uploading}
            value={formData.roomNumber}
            onChange={(e) => handleInputChange('roomNumber', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <Autocomplete
            options={roomTypes}
            value={formData.roomType}
            onChange={handleRoomTypeChange}
            getOptionLabel={(option) => option.nombre || ''}
            isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
            loading={loadingTypes}
            disabled={uploading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Habitación"
                required
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingTypes ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    {option.nombre}
                  </Typography>
                  {option.descripcion && (
                    <Typography variant="caption" color="text.secondary">
                      {option.descripcion}
                    </Typography>
                  )}
                </Box>
              </li>
            )}
          />

          <TextField
            label="Tipo de Cama"
            variant="outlined"
            fullWidth
            disabled
            value={formData.bedType}
            helperText="Se asigna automáticamente según el tipo de habitación"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <Autocomplete
            multiple
            options={amenitiesList}
            value={formData.amenities}
            onChange={(event, newValue) => handleInputChange('amenities', newValue)}
            loading={loadingAmenities}
            disabled={uploading}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  sx={{
                    backgroundColor: 'rgb(211, 167, 85)',
                    color: 'white',
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: 'white'
                      }
                    }
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Comodidades"
                required
                placeholder="Selecciona las comodidades"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingAmenities ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
                }}
              />
            )}
          />

          <TextField
            label="Precio por Noche"
            variant="outlined"
            fullWidth
            type="number"
            required
            disabled={uploading}
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              disabled={uploading}
              sx={{
                borderRadius: '12px',
                textTransform: 'none',
                padding: '0.75rem 1.5rem',
                borderColor: 'rgb(211, 167, 85)',
                color: 'rgb(211, 167, 85)',
                '&:hover': {
                  borderColor: 'rgb(247, 224, 181)',
                  backgroundColor: 'rgba(211, 167, 85, 0.05)'
                }
              }}
            >
              {imagePreviews.length > 0 ? 'Agregar Más Imágenes' : 'Subir Imágenes'}
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </Button>
            
            {imagePreviews.length > 0 && (
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'gray' }}>
                {imagePreviews.length} imagen{imagePreviews.length !== 1 ? 'es' : ''} seleccionada{imagePreviews.length !== 1 ? 's' : ''} (máximo 10)
              </Typography>
            )}

            {imagePreviews.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <ImageList sx={{ width: '100%', maxHeight: 400 }} cols={3} rowHeight={164}>
                  {imagePreviews.map((preview, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        loading="lazy"
                        style={{
                          height: '164px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <ImageListItemBar
                        sx={{
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                          borderRadius: '8px 8px 0 0'
                        }}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: 'white' }}
                            onClick={() => handleRemoveImage(index)}
                            disabled={uploading}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        actionPosition="right"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: '1rem 1.5rem', gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={uploading}
          sx={{
            textTransform: 'none',
            color: 'gray',
            borderRadius: '12px',
            padding: '0.5rem 1.5rem'
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            backgroundColor: 'rgb(211, 167, 85)',
            color: 'white',
            borderRadius: '12px',
            padding: '0.5rem 1.5rem',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgb(190, 150, 75)'
            },
            '&:disabled': {
              backgroundColor: 'rgba(211, 167, 85, 0.5)'
            }
          }}
        >
          {uploading 
            ? (isEditMode ? 'Actualizando...' : 'Guardando...') 
            : (isEditMode ? 'Actualizar Habitación' : 'Agregar Habitación')
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoomModal;