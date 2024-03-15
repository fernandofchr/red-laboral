import React,{useState} from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoIcon from '../../../img/logilloicon.png'
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';


import Alert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>

      <Link color="inherit" >
        Red Laboral
      </Link>{' / '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageuser, setErrorMessageuser] = useState("");
  const [usernameMatch, setUsernameMatch] = useState(true);
  const [userNotFoundError, setUserNotFoundError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const navigate = useNavigate();

  const validateUsername = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailRegex.test(value)) {
      setErrorMessageuser("Correo inválido");
      setUsernameMatch(false);
      return false;
    } else {
      setErrorMessageuser("");
      setUsernameMatch(true);
      return true;
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      const username = data.get('email');
      const password = data.get('password');

      if (validateUsername(username)) {
        console.log({
          email: username,
          password: password,
        });
      }

      await Auth.signIn(username, password);
      navigate('/inicio-bdt');
    } catch (error) {
      setUserNotFoundError(true);
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await Auth.federatedSignIn({ provider: "Facebook" });
    } catch (error) {
      console.log("Error al iniciar sesión con Facebook:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {userNotFoundError && alertOpen && (
              <Alert variant="filled" severity="error" onClose={handleCloseAlert}>
                No se encontraron registros que coincidan con el usuario ingresado. {errorMessageuser}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            
            <Divider> Ó </Divider>

            <Button
              onClick={handleFacebookSignIn}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#3b5998", color: "#ffffff", "&:hover": { backgroundColor: "#2d4373" } }}
              startIcon={<FacebookIcon style={{ marginRight: '8px' }} />}>
              Iniciar Sesión con Facebook
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}