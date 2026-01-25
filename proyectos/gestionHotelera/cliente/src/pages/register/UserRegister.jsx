import styles from "./userRegister.module.css"
import {
  FormControl,
  RadioGroup,
  TextField,
  Typography,
  FormLabel,
  Button,
  FormControlLabel,
  Radio,
  Autocomplete,
  Alert,
  CircularProgress
} from "@mui/material";
import { useState, useEffect } from "react";
import {greenRadioGroupSx} from  "../../components/themePresets/radio"
import {greenInputSx} from "../../components/themePresets/input"
import {
  validateId,
  validateEmail,
  validatePhone,
  validateBirthdate,
  validatePasswordMatch,
  validatePasswordStrength
} from "../../validations/registerValidations";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function UserRegister() {
  const [locationData, setLocationData] = useState({
    countries: [],
    provinces: []
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    fetchCountries();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    firstLastName: "",
    secLastName: "",
    birthdate: "",
    country: null,
    province: null,
    city: null,
    district: null,
    idType: "id",
    idNumber: "",
    phone1: "",
    phone2: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const idError = validateId(formData.idType, formData.idNumber);
  const emailError = validateEmail(formData.email);
  const phone1Error = validatePhone(formData.phone1);
  const phone2Error = validatePhone(formData.phone2);
  const birthdateError = validateBirthdate(formData.birthdate);
  const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
  const passwordStrengthError = validatePasswordStrength(formData.password);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${API_URL}/locations/countries`);
      const data = await response.json();
      if (data.success) {
        setLocationData({countries: data.data.pais, provinces: data.data.provincia});
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

  const handleCountryChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      country: newValue || "",
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
      district: newValue || "",
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

    // Validaciones del formulario
    const errors = {
      name: !formData.name ? "El nombre es requerido" : "",
      firstLastName: !formData.firstLastName ? "El primer apellido es requerido" : "",
      birthdate: !formData.birthdate ? "La fecha de nacimiento es requerida" : birthdateError,
      country: !formData.country ? "El país es requerido" : "",
      idNumber: !formData.idNumber ? "La identificación es requerida" : idError,
      phone1: !formData.phone1 ? "El teléfono es requerido" : phone1Error,
      phone2: phone2Error,
      email: !formData.email ? "El correo electrónico es requerido" : emailError,
      password: !formData.password ? "La contraseña es requerida" : passwordStrengthError,
      confirmPassword: !formData.confirmPassword ? "Debe confirmar la contraseña" : passwordMatchError,
    };

    if (formData.country === "COSTA RICA") {
      errors.province = !formData.province ? "La provincia es requerida" : "";
      errors.city = !formData.city ? "El cantón es requerido" : "";
      errors.district = !formData.district ? "El distrito es requerido" : "";
    }

    const hasErrors = Object.values(errors).some(error => error !== "");
    
    if (hasErrors) {
      const firstError = Object.values(errors).find(error => error !== "");
      showAlert('error', firstError);
      console.log("Errores encontrados:", errors);
      return;
    }

    // Enviar datos al backend
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          name: formData.name,
          firstLastName: formData.firstLastName,
          secLastName: formData.secLastName || null,
          birthdate: formData.birthdate,
          country: formData.country,
          province: formData.province || null,
          city: formData.city || null,
          district: formData.district || null,
          idNumber: formData.idNumber,
          phone1: formData.phone1,
          phone2: formData.phone2 || null,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showAlert('success', '¡Registro exitoso! Redirigiendo...');
        
        // Limpiar el formulario
        setFormData({
          name: "",
          firstLastName: "",
          secLastName: "",
          birthdate: "",
          country: null,
          province: null,
          city: null,
          district: null,
          idType: "id",
          idNumber: "",
          phone1: "",
          phone2: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        // Opcional: Redirigir al login después de 2 segundos
        setTimeout(() => {
          // window.location.href = '/login';
          // O usando React Router:
          // navigate('/login');
        }, 2000);
      } else {
        showAlert('error', data.message || 'Error al registrar el usuario');
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
        {/*User personal Info */}
        <div style={{gridRow: 1, gridColumn: '1/span 6'}}>
          <Typography variant="h6">Información Personal</Typography>
          <hr/>
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
          style={{gridRow: 2, gridColumn: '1/span 2'}}
          disabled={loading}
        />

        <TextField
          label="Primer Apellido"
          name="firstLastName"
          variant="outlined"
          fullWidth
          required
          value={formData.firstLastName}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 2, gridColumn: '3/span 2'}}
          disabled={loading}
        />

        <TextField
          label="Segundo Apellido"
          name="secLastName"
          variant="outlined"
          fullWidth
          value={formData.secLastName}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 2, gridColumn: '5/span 2'}}
          disabled={loading}
        />

        <TextField
          type="date"
          label="Fecha de Nacimiento"
          name="birthdate"
          variant="outlined"
          fullWidth
          required
          value={formData.birthdate}
          onChange={handleChange}
          error={Boolean(birthdateError)}
          helperText={birthdateError}
          sx={greenInputSx}
          InputLabelProps={{ shrink: true }}
          style={{gridRow: 3, gridColumn: '1/span 3'}}
          disabled={loading}
        />

        <Autocomplete
          required
          options={locationData.countries}
          style={{gridRow: 3, gridColumn: '4/span 3'}}
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          disabled={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="País"
              sx={greenInputSx}
            />
          )}
        />

        <div style={{gridRow: 4, gridColumn: '1/span 6'}}>
          <Typography variant="h6">Identificación</Typography>
          <hr/>
        </div>

        <FormControl style={{gridRow: 5, gridColumn: '1/span 3'}} sx={greenRadioGroupSx}>
          <FormLabel>Tipo de Identificación</FormLabel>
          <RadioGroup
            row
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            defaultValue="id"
          >
            <FormControlLabel value="id" control={<Radio />} label="Cédula" disabled={loading} />
            <FormControlLabel value="dimex" control={<Radio />} label="DIMEX" disabled={loading} />
            <FormControlLabel value="passport" control={<Radio />} label="Pasaporte" disabled={loading} />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Identificación"
          name="idNumber"
          variant="outlined"
          fullWidth
          required
          value={formData.idNumber}
          onChange={handleChange}
          error={Boolean(idError)}
          helperText={idError}
          sx={greenInputSx}
          style={{ gridRow: 5, gridColumn: '4/span 3' }}
          disabled={loading}
        />

        {/*Location*/}
        {formData.country === "COSTA RICA" && (
          <>
            <div style={{gridRow: 6, gridColumn: '1/span 6'}}>
              <Typography variant="h6">Dirección en Costa Rica</Typography>
              <hr/>
            </div>

            <Autocomplete
              required
              options={locationData.provinces.map(p => p.nombre)}
              style={{gridRow: 7, gridColumn: '1/span 2'}}
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
              style={{gridRow: 7, gridColumn: '3/span 2'}}
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
              style={{gridRow: 7, gridColumn: '5/span 2'}}
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
          </>
        )}

        <div style={{ gridColumn: '1/span 6'}}>
          <Typography variant="h6">Información de Contacto</Typography>
          <hr/>
        </div>

        <TextField
          label="Teléfono 1"
          name="phone1"
          variant="outlined"
          fullWidth
          required
          value={formData.phone1}
          onChange={handleChange}
          error={Boolean(phone1Error)}
          helperText={phone1Error}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 3'}}
          disabled={loading}
        />

        <TextField
          label="Teléfono 2"
          name="phone2"
          variant="outlined"
          fullWidth
          value={formData.phone2}
          onChange={handleChange}
          error={Boolean(phone2Error)}
          helperText={phone2Error}
          sx={greenInputSx}
          style={{ gridColumn: '4/span 3'}}
          disabled={loading}
        />

        <TextField
          label="Correo Electrónico"
          name="email"
          variant="outlined"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={greenInputSx}
          style={{ gridColumn: '1/span 6'}}
          disabled={loading}
        />

        <div style={{ gridColumn: '1/span 6'}}>
          <Typography variant="h6">Seguridad</Typography>
          <hr/>
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
          style={{ gridColumn: '1/span 3'}}
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
          style={{ gridColumn: '4/span 3'}}
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
          style={{ gridColumn: '1/span 6'}}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
        </Button>
      </form>
      <br/>
    </div>
  );
}

export default UserRegister;