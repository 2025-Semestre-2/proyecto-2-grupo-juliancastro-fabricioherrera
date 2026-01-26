import styles from "./hotelRegister.module.css"
import {
  TextField,
  Typography,
  Button,
  Autocomplete,
  Alert,
  CircularProgress,
  Tooltip,
  IconButton,
  Chip
} from "@mui/material";
import { useState, useEffect } from "react";
import { greenInputSx } from "../../components/themePresets/input"
import { useNavigate } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  validateEmail,
  validatePhone,
  validatePasswordMatch,
  validatePasswordStrength,
  validateURL
} from "../../validations/registerValidations";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function HotelRegister() {
  const [locationData, setLocationData] = useState({
    countries: [],
    provinces: []
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [services, setServices] = useState([]);
  const [hotelTypes, setHotelTypes] = useState([]);

  useEffect(() => {
    fetchCountries();
    fetchServices();
    fetchTypes();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    type: null,
    province: null,
    city: null,
    district: null,
    town: "",
    references: "",
    mapsLink: "",
    phone1: "",
    phone2: "",
    email: "",
    webURL: "",
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
    airbnb: "",
    x: "",
    services: [],
    adminMail: "",
    password: "",
    confirmPassword: ""
  });

  const emailError = validateEmail(formData.email);
  const adminMailError = validateEmail(formData.adminMail);
  const phone1Error = validatePhone(formData.phone1);
  const phone2Error = validatePhone(formData.phone2);
  const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
  const passwordStrengthError = validatePasswordStrength(formData.password);
  const mapsLinkError = validateURL(formData.mapsLink);
  const webURLError = validateURL(formData.webURL);
  const instagramError = validateURL(formData.instagram);
  const facebookError = validateURL(formData.facebook);
  const youtubeError = validateURL(formData.youtube);
  const tiktokError = validateURL(formData.tiktok);
  const airbnbError = validateURL(formData.airbnb);
  const xError = validateURL(formData.x);

  const fetchServices = async() => {
    try{
      const response = await fetch(`${API_URL}/services/getServices`);
      const data = await response.json();
      if (data.success){
        setServices(data.data);
        console.log(data);
      }
    } catch (error){
      console.log("Error fetching services:", error);
      showAlert('error', 'Error al cargar los servicios');
    }
  };

  const fetchTypes = async() => {
    try{
      const response = await fetch(`${API_URL}/types/getHotelTypes`);
      const data = await response.json();
      if (data.success){
        setHotelTypes(data.data);
        console.log(data);
      }
    } catch (error){
      console.log("Error fetching types:", error);
      showAlert('error', 'Error al cargar los tipos de hospedaje');
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${API_URL}/locations/countries`);
      const data = await response.json();
      if (data.success) {
        setLocationData({ countries: data.data.pais, provinces: data.data.provincia });
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      showAlert('error', 'Error al cargar los países');
    }
  };

  const selectedProvince = locationData.provinces.find(
    p => p.nombre === formData.province
  );
  const selectedCanton = selectedProvince?.canton.find(
    c => c.nombre === formData.city
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      type: newValue || null,
    }));
  };

  const handleProvinceChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      province: newValue,
      city: null,
      district: null
    }));
  };

  const handleCityChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      city: newValue,
      district: null
    }));
  };

  const handleDistrictChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      district: newValue || null,
    }));
  };

  const handleServicesChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      services: newValue,
    }));
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const socialMedia = {};
    if (formData.instagram && !instagramError) socialMedia.instagram = formData.instagram;
    if (formData.facebook && !facebookError) socialMedia.facebook = formData.facebook;
    if (formData.youtube && !youtubeError) socialMedia.youtube = formData.youtube;
    if (formData.tiktok && !tiktokError) socialMedia.tiktok = formData.tiktok;
    if (formData.airbnb && !airbnbError) socialMedia.airbnb = formData.airbnb;
    if (formData.x && !xError) socialMedia.x = formData.x;


    const errors = {
      name: !formData.name ? "El nombre del establecimiento es requerido" : "",
      idNumber: !formData.idNumber ? "La cédula jurídica es requerida" : "",
      type: !formData.type ? "El tipo de hospedaje es requerido" : "",
      references: !formData.references ? "Las señas exactas son requeridas" : "",
      mapsLink: mapsLinkError,
      phone1: !formData.phone1 ? "El teléfono 1 es requerido" : phone1Error,
      phone2: phone2Error,
      email: !formData.email ? "El correo electrónico es requerido" : emailError,
      webURL: webURLError,
      instagram: instagramError,
      facebook: facebookError,
      youtube: youtubeError,
      tiktok: tiktokError,
      airbnb: airbnbError,
      x: xError,
      adminMail: !formData.adminMail ? "El correo administrativo es requerido" : adminMailError,
      password: !formData.password ? "La contraseña es requerida" : passwordStrengthError,
      confirmPassword: !formData.confirmPassword ? "Debe confirmar la contraseña" : passwordMatchError,
    };

    errors.province = !formData.province ? "La provincia es requerida" : "";
    errors.city = !formData.city ? "El cantón es requerido" : "";
    errors.district = !formData.district ? "El distrito es requerido" : "";
    errors.town = !formData.town ? "El barrio es requerido" : "";

    const hasErrors = Object.values(errors).some(error => error !== "");

    if (hasErrors) {
      const firstError = Object.values(errors).find(error => error !== "");
      showAlert('error', firstError);
      console.log("Errores encontrados:", errors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/hotels/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          idNumber: formData.idNumber,
          type: formData.type,
          province: formData.province || null,
          city: formData.city || null,
          district: formData.district || null,
          town: formData.town || null,
          references: formData.references,
          mapsLink: formData.mapsLink || null,
          phone1: formData.phone1,
          phone2: formData.phone2 || null,
          email: formData.email,
          webURL: formData.webURL || null,
          socialMedia: Object.keys(socialMedia).length > 0 ? socialMedia : null,
          services: formData.services.length > 0 ? formData.services : null,
          adminMail: formData.adminMail,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showAlert('success', '¡Registro exitoso! Redirigiendo...');

        setFormData({
          name: "",
          idNumber: "",
          type: null,
          country: null,
          province: null,
          city: null,
          district: null,
          town: "",
          references: "",
          mapsLink: "",
          phone1: "",
          phone2: "",
          email: "",
          webURL: "",
          instagram: "",
          facebook: "",
          youtube: "",
          tiktok: "",
          airbnb: "",
          x: "",
          services: [],
          adminMail: "",
          password: "",
          confirmPassword: ""
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showAlert('error', data.message || 'Error al registrar el hospedaje');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      showAlert('error', 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {alert.show && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert({ show: false, type: '', message: '' })}
          sx={{ marginBottom: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      <form className={styles.formGrid} onSubmit={handleSubmit}>
        <div style={{ gridRow: 1, gridColumn: '1/span 6' }}>
          <Typography variant="h6">Información del Establecimiento</Typography>
          <hr />
        </div>

        <TextField
          label="Nombre"
          name="name"
          variant="outlined"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
          sx={greenInputSx}
          style={{ gridRow: 2, gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Cédula Jurídica"
          name="idNumber"
          variant="outlined"
          fullWidth
          required
          value={formData.idNumber}
          onChange={handleChange}
          sx={greenInputSx}
          style={{ gridRow: 2, gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <Autocomplete
          required
          options={hotelTypes}
          style={{ gridRow: 3, gridColumn: '1/span 6' }}
          name="type"
          value={formData.type}
          onChange={handleTypeChange}
          disabled={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo de hospedaje"
              sx={greenInputSx}
            />
          )}
        />

        <div style={{ gridRow: 4, gridColumn: '1/span 6' }}>
          <Typography variant="h6">Ubicación</Typography>
          <hr />
        </div>

            <Autocomplete
              required
              options={locationData.provinces.map(p => p.nombre)}
              style={{ gridRow: 5, gridColumn: '1/span 2' }}
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
              disabled={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Provincia"
                  sx={greenInputSx}
                />
              )}
            />

            <Autocomplete
              required
              options={selectedProvince ? selectedProvince.canton.map(c => c.nombre) : []}
              style={{ gridRow: 5, gridColumn: '3/span 2' }}
              name="city"
              value={formData.city}
              onChange={handleCityChange}
              disabled={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cantón"
                  sx={greenInputSx}
                />
              )}
            />

            <Autocomplete
              required
              options={selectedCanton ? selectedCanton.distrito : []}
              style={{ gridRow: 5, gridColumn: '5/span 2' }}
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              disabled={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Distrito"
                  sx={greenInputSx}
                />
              )}
            />

            <TextField
              label="Barrio"
              name="town"
              variant="outlined"
              fullWidth
              required
              value={formData.town}
              onChange={handleChange}
              sx={greenInputSx}
              style={{ gridRow: 6, gridColumn: '1/span 3' }}
              disabled={loading}
            />

            <TextField
              label="Link de referencia de maps"
              name="mapsLink"
              variant="outlined"
              fullWidth
              value={formData.mapsLink}
              onChange={handleChange}
              error={Boolean(mapsLinkError)}
              helperText={mapsLinkError}
              sx={greenInputSx}
              style={{ gridRow: 6, gridColumn: '4/span 3' }}
              disabled={loading}
            />

            <TextField
              label="Señas Exactas"
              name="references"
              variant="outlined"
              fullWidth
              required
              value={formData.references}
              onChange={handleChange}
              multiline
              sx={greenInputSx}
              style={{ gridRow: 7, gridColumn: '1/span 6' }}
              disabled={loading}
            />

        <div style={{ gridColumn: '1/span 6' }}>
          <Typography variant="h6">Información de Contacto</Typography>
          <hr />
        </div>

        <TextField
          required
          label="Teléfono 1"
          name="phone1"
          variant="outlined"
          fullWidth
          value={formData.phone1}
          onChange={handleChange}
          error={Boolean(phone1Error)}
          helperText={phone1Error}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Teléfono 2"
          name="phone2"
          variant="outlined"
          fullWidth
          required
          value={formData.phone2}
          onChange={handleChange}
          error={Boolean(phone2Error)}
          helperText={phone2Error}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <TextField
          required
          label="Correo Electrónico"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Sitio Web"
          name="webURL"
          variant="outlined"
          fullWidth
          value={formData.webURL}
          onChange={handleChange}
          error={Boolean(webURLError)}
          helperText={webURLError}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <div style={{ gridColumn: '1/span 6' }}>
          <Typography variant="h6">Redes Sociales</Typography>
          <hr />
        </div>

        <TextField
          label="Instagram"
          name="instagram"
          variant="outlined"
          fullWidth
          value={formData.instagram}
          onChange={handleChange}
          error={Boolean(instagramError)}
          helperText={instagramError}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Tik-Tok"
          name="tiktok"
          variant="outlined"
          fullWidth
          value={formData.tiktok}
          onChange={handleChange}
          error={Boolean(tiktokError)}
          helperText={tiktokError}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Facebook"
          name="facebook"
          variant="outlined"
          fullWidth
          value={formData.facebook}
          onChange={handleChange}
          error={Boolean(facebookError)}
          helperText={facebookError}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Youtube"
          name="youtube"
          variant="outlined"
          fullWidth
          value={formData.youtube}
          onChange={handleChange}
          error={Boolean(youtubeError)}
          helperText={youtubeError}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Airbnb"
          name="airbnb"
          variant="outlined"
          fullWidth
          value={formData.airbnb}
          onChange={handleChange}
          error={Boolean(airbnbError)}
          helperText={airbnbError}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="X"
          name="x"
          variant="outlined"
          fullWidth
          value={formData.x}
          onChange={handleChange}
          error={Boolean(xError)}
          helperText={xError}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <div style={{ gridColumn: '1/span 6' }}>
          <Typography variant="h6">Servicios del Establecimiento</Typography>
          <hr />
        </div>

        <Autocomplete
          multiple
          options={services}
          value={formData.services}
          onChange={handleServicesChange}
          disabled={loading}
          style={{ gridColumn: '1/span 6' }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                sx={{
                  backgroundColor: '#2c4635',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: 'white',
                    },
                  },
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione los servicios"
              placeholder="Agregar servicio"
              sx={greenInputSx}
            />
          )}
        />

        <div style={{ gridColumn: '1/span 6' }}>
          <Typography variant="h6">Seguridad</Typography>
          <hr />
        </div>

        <div style={{ gridColumn: '1/span 6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TextField
            required
            label="Correo Electrónico Administrativo"
            name="adminMail"
            variant="outlined"
            fullWidth
            value={formData.adminMail}
            onChange={handleChange}
            error={Boolean(adminMailError)}
            helperText={adminMailError}
            sx={greenInputSx}
            disabled={loading}
          />
          <Tooltip 
            title="Este correo será utilizado para iniciar sesión y administrar la cuenta de este establecimiento."
            arrow
            placement="right"
          >
            <IconButton size="small" sx={{ color: '#47865d' }}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>

        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(passwordStrengthError)}
          helperText={passwordStrengthError}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3' }}
          disabled={loading}
        />

        <TextField
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={Boolean(passwordMatchError)}
          helperText={passwordMatchError}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3' }}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: "#2c4635",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
          style={{ gridColumn: '1/span 6' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
        </Button>
        <br />
      </form>
    </div>
  );
}

export default HotelRegister;