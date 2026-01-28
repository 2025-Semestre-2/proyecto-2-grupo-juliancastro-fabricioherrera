import { useState } from "react";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { greenInputSx } from "../../components/themePresets/input";
import { useAuth } from "../../contexts/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value !== "" && !emailRegex.test(value));
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data.data.user);
        showAlert('success', `¡Bienvenido ${data.data.user.nombreCompleto || data.data.user.correo}!`);

        setTimeout(() => {
          switch (data.data.user.rol.toLowerCase()) {
            case 'User':
              navigate('/');
              break;
            default:
              navigate('/');
          }
        }, 1000);

      } else {
        showAlert('error', data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      showAlert('error', 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          Volver
        </Button>

        {alert.show && (
          <Alert 
            severity={alert.type} 
            onClose={() => setAlert({ show: false, type: '', message: '' })}
            sx={{ marginBottom: 2, width: '100%' }}
          >
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className={styles.formContainer}>
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
            sx={greenInputSx}
            disabled={loading}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={greenInputSx}
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
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
          </Button>
        </form>
        <hr></hr>
        <p>¿Aún no tienes cuenta?</p>
        <Button
          type="button"
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate('/register')}
          disabled={loading}
          sx={{
            backgroundColor: "#33534e",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
        >
          Registrarse
        </Button>
      </div>
    </div>
  );
}

export default Login;