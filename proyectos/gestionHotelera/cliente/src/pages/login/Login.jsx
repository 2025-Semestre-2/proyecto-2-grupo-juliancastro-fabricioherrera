import { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value !== "" && !emailRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    console.log({ email, password });
  };

  return (
    <div className={styles.page}>
      <div className={styles.glassContainer}>
        <Button
          type="button"
          variant="text"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: "#22c55e",
            textTransform: "none",
            alignSelf: 'flex-start'
          }}
        >
          Volver
        </Button>
        <form onSubmit={handleSubmit}  className={styles.formContainer}>
          <div className={styles.logo} />
          <h2>Inicio de Sesión</h2>
          <p>Bienvenido de vuelta</p>
          <TextField
            label="Correo"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Formato de email inválido" : " "}
            sx={{
                input: { color: "#fff" },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.8)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
                  "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.6)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#22c55e",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#22c55e",
                  borderWidth: 2,
                },
                "& .MuiFormHelperText-root": {
                  color: "#22c55e",
                },
                "& .MuiFormHelperText-root.Mui-error": {
                  color: "#9b581a",
                },
              }}
            />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
                input: { color: "#fff" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#22c55e",
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.8)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#22c55e",
                  borderWidth: 2,
                },
                  "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.6)",
                },
              }}
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
          >
            Iniciar Sesión
          </Button>
        </form>
        <hr></hr>
        <p>¿Aún no tienes cuenta?</p>
        <Button
            type="button"
            variant="contained"
            size="large"
            fullWidth
            sx={{
            backgroundColor: "#33534e",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
          >
            Registrarse como usuario
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            fullWidth
            sx={{
            backgroundColor: "#33534e",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
          >
            Registrar hospedaje
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            fullWidth
            sx={{
            backgroundColor: "#33534e",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
          >
            Registrar empresa recreativa
          </Button>
      </div>
    </div>
  );
}

export default Login;
