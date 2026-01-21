import styles from "./activityRegister.module.css"
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
import {greenRadioGroupSx} from  "../../components/themePresets/radio"
import {greenInputSx} from "../../components/themePresets/input"

const countries = ["Africa", "Peru", "Costa Rica"]

function ActivityRegister() {
    const [formData, setFormData] = useState({
      name: "",
      idNumber: "",
      contactName: "",
      province: "",
      city: "",
      district: "",
      references: "",
      description: "",
      price: "",
      services: [],
      activityTypes: [],
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
          label="Señas Exactas"
          name="references"
          variant="outlined"
          fullWidth
          required
          value={formData.references}
          onChange={handleChange}
          multiline
          sx={greenInputSx}
          style={{gridRow: 6, gridColumn: '1/span 6'}}
        />
        <div style={{gridRow: 7, gridColumn: '1/span 6'}}><Typography variant="h6">Información de Contacto</Typography><hr/></div>
        <TextField
          required
          label="Nombre del Contacto"
          name="phone1"
          variant="outlined"
          fullWidth
          value={formData.phone1}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 8, gridColumn: '1/span 3'}}
        />
        <TextField
          required
          label="Teléfono"
          name="phone2"
          variant="outlined"
          fullWidth
          value={formData.phone1}
          onChange={handleChange}
          sx={greenInputSx}
          style={{gridRow: 8, gridColumn: '4/span 3'}}
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
        <div style={{gridRow: 11, gridColumn: '1/span 6'}}><Typography variant="h6">Servicios del Establecimiento</Typography><hr/></div>
        <div style={{gridRow: 12, gridColumn: '1/span 6'}}><Typography variant="h6">Tipo Actividad</Typography><hr/></div>
        <div style={{gridRow: 13, gridColumn: '1/span 6'}}><Typography variant="h6">Seguridad</Typography><hr/></div>
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

export default ActivityRegister;