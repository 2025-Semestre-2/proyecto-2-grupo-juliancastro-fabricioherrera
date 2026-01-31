import { useState, useEffect } from "react";
import styles from "./activityAdminPanel.module.css";
import ActivityDetailsCard from "../../components/activityCard/ActivityDetailsCard";
import ActivityModal from "../../components/modals/ActivityModal";
import { Button, Typography, CircularProgress, Alert, Box } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function ActivityAdminPanel() {
  const [openModal, setOpenModal] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);
  const { user } = useAuth();
  
  // Estados para empresa
  const [empresaData, setEmpresaData] = useState(null);
  const [loadingEmpresa, setLoadingEmpresa] = useState(true);
  const [errorEmpresa, setErrorEmpresa] = useState(null);

  // Estados para actividades
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [errorActivities, setErrorActivities] = useState(null);

  // Cargar datos de la empresa al montar
  useEffect(() => {
    if (user?.cuentaID) {
      loadEmpresaData();
    }
  }, [user?.cuentaID]);

  // Cargar actividades cuando se obtiene la cédula jurídica
  useEffect(() => {
    if (empresaData?.cedulaJuridica) {
      loadActivities();
    }
  }, [empresaData?.cedulaJuridica]);

  const loadEmpresaData = async () => {
    setLoadingEmpresa(true);
    setErrorEmpresa(null);
    
    try {
      const response = await fetch(`${API_URL}/empresas/account/${user.cuentaID}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setEmpresaData(data.data);
        console.log('Datos de empresa cargados:', data.data);
      } else {
        setErrorEmpresa(data.message || 'Error al cargar los datos de la empresa');
      }
    } catch (err) {
      console.error('Error al cargar datos de empresa:', err);
      setErrorEmpresa('Error de conexión con el servidor');
    } finally {
      setLoadingEmpresa(false);
    }
  };

  const loadActivities = async () => {
    setLoadingActivities(true);
    setErrorActivities(null);
    
    try {
      const response = await fetch(`${API_URL}/activities/company/${empresaData.cedulaJuridica}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setActivities(data.data);
        console.log(`${data.count} actividades cargadas:`, data.data);
      } else {
        setErrorActivities(data.message || 'Error al cargar las actividades');
      }
    } catch (err) {
      console.error('Error al cargar actividades:', err);
      setErrorActivities('Error de conexión con el servidor');
    } finally {
      setLoadingActivities(false);
    }
  };

  const handleOpenModal = () => {
    setActivityToEdit(null); // Asegurarse de que está en modo crear
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setActivityToEdit(null);
  };

  const handleActivityCreated = (newActivity) => {
    console.log('Nueva actividad creada:', newActivity);
    // Recargar las actividades después de crear una nueva
    loadActivities();
  };

  const handleEdit = (activity) => {
    console.log("Editar actividad:", activity);
    setActivityToEdit(activity);
    setOpenModal(true);
  };

  const handleDelete = async (activity) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar "${activity.titulo}"?`)) {
      return;
    }

    try {
      const response = await 
        fetch(`${API_URL}/activities/${activity.empresaActividadID}`, {
         method: 'DELETE'
        });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Actividad eliminada exitosamente');
        loadActivities(); 
      } else {
        alert(data.message || 'Error al eliminar la actividad');
      }
    } catch (err) {
      console.error('Error al eliminar actividad:', err);
      alert('Error de conexión con el servidor');
    }
  };

  if (!user?.cuentaID) {
    return (
      <div className={styles.container}>
        <Alert severity="error">
          Error: No se encontró información de la cuenta. Por favor, inicia sesión nuevamente.
        </Alert>
      </div>
    );
  }

  if (loadingEmpresa) {
    return (
      <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Cargando datos de la empresa...
        </Typography>
      </div>
    );
  }

  if (errorEmpresa) {
    return (
      <div className={styles.container}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorEmpresa}
        </Alert>
        <Button 
          variant="contained" 
          onClick={loadEmpresaData}
          sx={{
            backgroundColor: 'rgb(211, 167, 85)',
            '&:hover': {
              backgroundColor: 'rgb(190, 150, 75)'
            }
          }}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Typography variant="h4" color="black" fontWeight={500}>
          Mis Actividades
        </Typography>
        {empresaData && (
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            {empresaData.nombre}
          </Typography>
        )}
      </div>
      
      <div className={styles.btnContainer}>
        <Button
          onClick={handleOpenModal}
          sx={{
            backgroundColor: 'rgb(211, 167, 85)',
            color: 'white',
            borderRadius: '12px',
            padding: '0.5rem 1.5rem',
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgb(247, 224, 181)',
              color: 'rgb(27, 27, 27)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-2px)',
            }
          }}
        >
          + Agregar Actividad
        </Button>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.cardFrame}>
          {loadingActivities && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Cargando actividades...</Typography>
            </Box>
          )}

          {errorActivities && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorActivities}
              <Button 
                size="small" 
                onClick={loadActivities}
                sx={{ ml: 2 }}
              >
                Reintentar
              </Button>
            </Alert>
          )}

          {!loadingActivities && !errorActivities && activities.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No tienes actividades registradas
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Haz clic en "Agregar Actividad" para crear tu primera actividad
              </Typography>
            </Box>
          )}

          {!loadingActivities && !errorActivities && activities.length > 0 && (
            <div className={styles.cardsGrid}>
              {activities.map((activity) => (
                <ActivityDetailsCard
                  key={activity.empresaActividadID}
                  image={activity.url || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'}
                  title={activity.titulo}
                  description={activity.descripcion}
                  type={activity.nombre || 'Actividad'}
                  price={parseFloat(activity.precio)}
                  onEdit={() => handleEdit(activity)}
                  onDelete={() => handleDelete(activity)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ActivityModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleActivityCreated}
        cedulaJuridica={empresaData?.cedulaJuridica}
        activityToEdit={activityToEdit}
      />
    </div>
  );
}

export default ActivityAdminPanel;