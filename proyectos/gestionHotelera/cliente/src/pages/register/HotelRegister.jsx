import styles from "./hotelRegister.module.css"
import {
  FormControl,
  RadioGroup,
  TextField,
  Typography,
  FormLabel,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  Autocomplete
} from "@mui/material";
import { useState } from "react";
import {greenInputSx} from "../../components/themePresets/input"

const countries = ["Africa", "Peru", "Costa Rica"]

function HotelRegister() {
    const [formData, setFormData] = useState({
      name: "",
      idNumber: "",
      type: "",
      province: "",
      city: "",
      district: "",
      town: "",
      references: "",
      mapsLink: "",
      phone1: "",
      phone2: "",
      email: "",
      webURL: "",
      socialMedia:[],
      services: [],
      password: "",
      confirmPassword: ""
    });

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

  return (
    <div className={styles.formContainer}>
      <form className={styles.formGrid}>
        <div style={{gridRow: 1, gridColumn: '1/span 6'}}><Typography variant="h6">Información del Establecimiento</Typography><hr/></div>
          <TextField
                      label="Nombre"
                      name="name"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleChange}
                      sx={greenInputSx}
                      style={{gridRow: 2, gridColumn: '1/span 3'}}
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
                      style={{gridRow: 2, gridColumn: '4/span 3'}}
                      />
            <Autocomplete
                      required
                      options={countries}
                      style={{gridRow: 3, gridColumn: '1/span 6'}}
                      name="type"
                      value={formData.type}
                      onChange={handleCountryChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tipo de hospedaje"
                          sx={greenInputSx}
                        />
                      )}
                />
          <div style={{gridRow: 4, gridColumn: '1/span 6'}}><Typography variant="h6">Ubicación</Typography><hr/></div>
          <Autocomplete
                      required
                      options={countries}
                      style={{gridRow: 5, gridColumn: '1/span 2'}}
                      name="type"
                      value={formData.type}
                      onChange={handleCountryChange}
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
                      options={countries}
                      style={{gridRow: 5, gridColumn: '3/span 2'}}
                      name="type"
                      value={formData.type}
                      onChange={handleCountryChange}
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
                      options={countries}
                      style={{gridRow: 5, gridColumn: '5/span 2'}}
                      name="type"
                      value={formData.type}
                      onChange={handleCountryChange}
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
          style={{gridRow: 6, gridColumn: '1/span 3'}}
        />
        <TextField
          label="Link de referencia de maps"
          name="mapsLink"
          variant="outlined"
          fullWidth
          value={formData.mapsLink}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 6, gridColumn: '4/span 3'}}
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
          style={{gridRow: 7, gridColumn: '1/span 6'}}
        />
        <div style={{gridRow: 8, gridColumn: '1/span 6'}}><Typography variant="h6">Información de Contacto</Typography><hr/></div>
        <TextField
          required
          label="Teléfono 1"
          name="phone1"
          variant="outlined"
          fullWidth
          value={formData.phone1}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 9, gridColumn: '1/span 3'}}
        />
        <TextField
          required
          label="Teléfono 2"
          name="phone2"
          variant="outlined"
          fullWidth
          value={formData.phone1}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 9, gridColumn: '4/span 3'}}
        />
        <TextField
          required
          label="Correo Electrónico"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 10, gridColumn: '1/span 3'}}
        />
        <TextField
          label="Sitio Web"
          name="webURL"
          variant="outlined"
          fullWidth
          value={formData.webURL}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 10, gridColumn: '4/span 3'}}
        />
        <div style={{gridRow: 11, gridColumn: '1/span 6'}}><Typography variant="h6">Redes Sociales</Typography><hr/></div>
        <TextField
          label="Instagram"
          name="instagram"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 12, gridColumn: '1/span 3'}}
        />
        <TextField
          label="Facebook"
          name="facebook"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 13, gridColumn: '1/span 3'}}
        />
        <TextField
          label="Airbnb"
          name="airbnb"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 14, gridColumn: '1/span 3'}}
        />
        <TextField
          label="Youtube"
          name="youtube"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 13, gridColumn: '4/span 3'}}
        />
        <TextField
          label="Tik-Tok"
          name="tiktok"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 12, gridColumn: '4/span 3'}}
        />
        <TextField
          label="X"
          name="x"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 14, gridColumn: '4/span 3'}}
        />
        <div style={{gridRow: 15, gridColumn: '1/span 6'}}><Typography variant="h6">Servicios del Establecimiento</Typography><hr/></div>
        <div style={{gridRow: 16, gridColumn: '1/span 6'}}><Typography variant="h6">Seguridad</Typography><hr/></div>
          <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={greenInputSx}
              style={{ gridColumn: '1/span 3'}}
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
              sx={greenInputSx}
              style={{ gridColumn: '4/span 3'}}
           />
           <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
            backgroundColor: "#2c4635",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
          style={{ gridColumn: '1/span 6'}}
          >Registrarse</Button>
          <br/>
      </form>
    </div>
  );
}

export default HotelRegister;