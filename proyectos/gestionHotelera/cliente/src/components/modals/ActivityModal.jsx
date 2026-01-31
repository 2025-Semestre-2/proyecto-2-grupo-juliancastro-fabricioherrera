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
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function ActivityModal({ open, onClose, onSubmit, cedulaJuridica, activityToEdit = null }) {
  const isEditMode = Boolean(activityToEdit);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipoActividad: null,
    image: null, 
    precio: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [activityTypes, setActivityTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  // Cargar datos de la actividad a editar
  useEffect(() => {
    if (open && isEditMode && activityToEdit) {
      console.log("Editando actividad:", activityToEdit);
      
      setFormData({
        titulo: activityToEdit.titulo || '',
        descripcion: activityToEdit.descripcion || '',
        tipoActividad: activityToEdit.nombre || null,
        image: null, // No prellenamos la imagen, será opcional
        precio: activityToEdit.precio ? activityToEdit.precio.toString() : ''
      });
      
      // Mostrar la imagen actual si existe
      if (activityToEdit.url) {
        setImagePreview(activityToEdit.url);
      }
    } else if (open && !isEditMode) {
      console.log("Nueva actividad para usuario:", cedulaJuridica);
    }
    
    if (open) {
      loadActivityTypes();
    }
  }, [open, isEditMode, activityToEdit, cedulaJuridica]);

  const loadActivityTypes = async () => {
    setLoadingTypes(true);
    try {
      const response = await fetch(`${API_URL}/types/getActivityTypes`);
      const data = await response.json();
      if (data.success) {
        setActivityTypes(data.data);
        console.log('Tipos de actividad cargados:', data);
      }
    } catch (error) {
      console.error("Error fetching activity types:", error);
      setUploadError('Error al cargar los tipos de actividad');
    } finally {
      setLoadingTypes(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona un archivo de imagen válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('La imagen no debe superar los 5MB');
      return;
    }

    setUploadError(null);

    setFormData(prev => ({
      ...prev,
      image: file
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!formData.titulo || !formData.descripcion || !formData.tipoActividad) {
      setUploadError('Por favor completa todos los campos obligatorios');
      return;
    }

    // Solo requerir imagen en modo creación
    if (!isEditMode && !formData.image) {
      setUploadError('Por favor sube una imagen');
      return;
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      setUploadError('Por favor ingresa un precio válido mayor a cero');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formDataToSend = new FormData();
      
      if (!isEditMode) {
        // Modo crear
        formDataToSend.append('cedulaJuridica', cedulaJuridica);
      }
      
      formDataToSend.append('tipoActividad', formData.tipoActividad);
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('precio', formData.precio);
      
      // Solo agregar imagen si se seleccionó una nueva
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const url = isEditMode 
        ? `${API_URL}/activities/${activityToEdit.empresaActividadID}`
        : `${API_URL}/activities`;
      
      const method = isEditMode ? 'PUT' : 'POST';
      
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
        
        alert(isEditMode ? '¡Actividad actualizada exitosamente!' : '¡Actividad creada exitosamente!');
      } else {
        setUploadError(data.message || `Error al ${isEditMode ? 'actualizar' : 'crear'} la actividad`);
      }
    } catch (error) {
      console.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} actividad:`, error);
      setUploadError('Error de conexión con el servidor');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      tipoActividad: null,
      image: null,
      precio: ''
    });
    setImagePreview(null);
    setUploadError(null);
    setUploading(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={!uploading ? handleClose : undefined}
      maxWidth="sm"
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
        {isEditMode ? 'Editar Actividad' : 'Agregar Nueva Actividad'}
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
            label="Nombre de la actividad"
            variant="outlined"
            fullWidth
            required
            disabled={uploading}
            value={formData.titulo}
            onChange={(e) => handleInputChange('titulo', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            disabled={uploading}
            value={formData.descripcion}
            onChange={(e) => handleInputChange('descripcion', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}
          />

          <Autocomplete
            options={activityTypes}
            value={formData.tipoActividad}
            onChange={(event, newValue) => handleInputChange('tipoActividad', newValue)}
            loading={loadingTypes}
            disabled={uploading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de actividad"
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
          />

          <TextField
            label="Precio (USD)"
            variant="outlined"
            fullWidth
            type="number"
            required
            disabled={uploading}
            value={formData.precio}
            onChange={(e) => handleInputChange('precio', e.target.value)}
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
              {formData.image ? 'Cambiar Imagen' : (isEditMode ? 'Actualizar Imagen (Opcional)' : 'Subir Imagen')}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>

            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
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
            : (isEditMode ? 'Actualizar Actividad' : 'Agregar Actividad')
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActivityModal;