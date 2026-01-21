import styles from "./userRegister.module.css"
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

function UserRegister() {
  const [formData, setFormData] = useState({
  name: "",
  firstLastName: "",
  secLastName: "",
  birthdate: "",
  country: "",
  province: "",
  city: "",
  district: "",
  idNumber: "",
  phone1: "",
  phone2: "",
  email: "",
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
  const handleProvinceChange = (event, newValue) => {
  setFormData((prev) => ({
    ...prev,
    province: newValue || "",
  }));
};
  const handleCityChange = (event, newValue) => {
  setFormData((prev) => ({
    ...prev,
    city: newValue || "",
  }));
};
  const handleDistrictChange = (event, newValue) => {
  setFormData((prev) => ({
    ...prev,
    district: newValue || "",
  }));
};
  return (
    <div className={styles.formContainer}>
      <form className={styles.formGrid}>
        {/*User personal Info */}
        <div style={{gridRow: 1, gridColumn: '1/span 6'}}><Typography variant="h6">Información Personal</Typography><hr/></div>
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
                    />
          <TextField
                    label="Segundo Apellido"
                    name="secondLastName"
                    variant="outlined"
                    fullWidth
                    value={formData.secondLastName}
                    onChange={handleChange}
                    sx={greenInputSx}
                    style={{gridRow: 2, gridColumn: '5/span 2'}}
                    />
          <TextField
                    type ="date"
                    label="Fecha de Nacimiento"
                    name="birthdate"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.birthdate}
                    onChange={handleChange}
                    sx={greenInputSx}
                    InputLabelProps={{ shrink: true }}
                    style={{gridRow: 3, gridColumn: '1/span 3'}}
                    />
          <Autocomplete
                  required
                  options={countries}
                  style={{gridRow: 3, gridColumn: '4/span 3'}}
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="País"
                      sx={greenInputSx}
                    />
                  )}
            />
          <div style={{gridRow: 4, gridColumn: '1/span 6'}}><Typography variant="h6">Identificación</Typography><hr/></div>
          <FormControl style={{gridRow: 5, gridColumn: '1/span 3'}} sx={greenRadioGroupSx}>
            <FormLabel>Tipo de Identificación</FormLabel>
            <RadioGroup
              row
              name="idType"
              defaultValue="id"
            >
              <FormControlLabel value="id" control={<Radio />} label="Cédula" />
              <FormControlLabel value="dimex" control={<Radio />} label="DIMEX" />
              <FormControlLabel value="passport" control={<Radio />} label="Pasaporte" />
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
                    sx={greenInputSx}
                    style={{gridRow: 5, gridColumn: '4/span 3'}}
                    />
          {/*Location*/}
          {formData.country === "Costa Rica" && ( <>
          <div style={{gridRow: 6, gridColumn: '1/span 6'}}><Typography variant="h6">Dirección en Costa Rica</Typography><hr/></div>
              <Autocomplete
                  required
                  options={countries}
                  style={{gridRow: 7, gridColumn: '1/span 2'}}
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
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
                  style={{gridRow: 7, gridColumn: '3/span 2'}}
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
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
                  style={{gridRow: 7, gridColumn: '5/span 2'}}
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Distrito"
                      sx={greenInputSx}
                    />
                  )}
            />
          </>)}
          <div style={{ gridColumn: '1/span 6'}}><Typography variant="h6">Información de Contacto</Typography><hr/></div>
          <TextField
                    label="Teléfono 1"
                    name="phone1"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.phone1}
                    onChange={handleChange}
                    sx={greenInputSx}
                    style={{ gridColumn: '1/span 3'}}
                    />
            <TextField
                    label="Teléfono 2"
                    name="phone2"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.phone2}
                    onChange={handleChange}
                    sx={greenInputSx}
                    style={{ gridColumn: '4/span 3'}}
                    />
            <TextField
                    label="Correo Electrónico"
                    name="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={handleChange}
                    sx={greenInputSx}
                    style={{ gridColumn: '1/span 6'}}
                    />
            <div style={{ gridColumn: '1/span 6'}}><Typography variant="h6">Seguridad</Typography><hr/></div>
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
      </form>
      <br/>
    </div>
  );
}

export default UserRegister;