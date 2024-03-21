import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { Alert, Button, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoIcon from '../../../img/logilloicon.png'
import FacebookIcon from '@mui/icons-material/Facebook';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Puedes ajustar esta expresión regular según tus requisitos para una contraseña segura
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
}

function isValidConfirmation(password, confirmPassword) {
  return password === confirmPassword;
}

function CustomSignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [alertOpen, setAlertOpen] = useState(true);

  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Por favor, ingrese un correo electrónico válido.");
    } else {
      setErrorMessage("");
    }
  };

  const handlePasswordBlur = () => {
    if (!isValidPassword(password)) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres, incluyendo números, mayúsculas y minúsculas.");
    } else if (!isValidConfirmation(password, confirmPassword)) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!isValidConfirmation(password, confirmPassword)) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if (!isValidEmail(email)) {
        setErrorMessage("Por favor, ingrese un correo electrónico válido.");
        return;
      }
      if (!isValidPassword(password)) {
        setErrorMessage("La contraseña debe tener al menos 8 caracteres, incluyendo números, mayúsculas y minúsculas.");
        return;
      }
      if (!isValidConfirmation(password, confirmPassword)) {
        setErrorMessage("Las contraseñas no coinciden.");
        return;
      }
      await Auth.signUp({
        username: email,
        password: password,
      });
      setIsRegistered(true);
    } catch (error) {
      console.log("Error al registrar el usuario:", error);
    }
  };

  const handleConfirmation = async () => {
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      console.log("Confirmación exitosa");
      await Auth.signIn(email, password);
      navigate('/registro-bdt');
    } catch (error) {
      console.log("Error al confirmar el usuario:", error);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleFacebookSignIn = async () => {
    try {
      await Auth.federatedSignIn({ provider: "Facebook" });
    } catch (error) {
      console.log("Error al iniciar sesión con Facebook:", error);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={LogoIcon} alt="Logo" style={{ width: '100px', height: '100px' }} />
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>

          {!isRegistered ? (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                {errorMessage && alertOpen && (
                <Alert  variant="filled" severity="error" onClose={handleCloseAlert}>
                  {errorMessage}
                </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onBlur={handleEmailBlur}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onBlur={handlePasswordBlur}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Confirmar Contraseña"
                  type="password"
                  id="repassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onBlur={handleConfirmPasswordBlur}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignUp}
              >
              Registrarme
              </Button>
              </Grid>
            </Grid>
            
            
            <Divider> Ó </Divider>

            <Button
              onClick={handleFacebookSignIn}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#3b5998", color: "#ffffff", "&:hover": { backgroundColor: "#2d4373" } }}
              startIcon={<FacebookIcon style={{ marginRight: '8px' }} />}>
              Crear cuenta con Facebook
            </Button>
          </Box>
          ):(
          <Box sm = {{ mt: 3}}>
              <>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmationCode"
                  label="Código de Confirmación"
                  type="text"
                  id="confirmationCode"
                  autoComplete="off"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleConfirmation}
                  >
                    Registrarme
                  </Button>
                </Grid>
                </>
          </Box>
          )}

        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" >
            Red Laboral
          </Link>{' / '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default CustomSignUp;
