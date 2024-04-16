import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { useColorMode } from "@chakra-ui/react";
import {
  FormLabel,
  FormControl,
  Alert,
  Button,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit">Red Laboral</Link>
      {" / "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function CustomForgotPass() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSendCode = async () => {
    try {
      let normalizedUsername = username;
      await Auth.forgotPassword(normalizedUsername);
      setIsCodeSent(true);
    } catch (error) {
      console.log("Error al enviar el código de recuperación:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      let normalizedUsername = username;
      await Auth.forgotPasswordSubmit(normalizedUsername, code, newPassword);
      setIsPasswordReset(true);
    } catch (error) {
      console.log("Error al restablecer la contraseña:", error);
    }
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[-_@$!%*#?&])[A-Za-z\d-_@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordErrorMessage(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo (- _ @ $ ! % * # ? &)."
      );
      setPasswordValid(false);
      return false;
    }
    setPasswordErrorMessage("");
    setPasswordValid(true);
    return true;
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div>
        {isPasswordReset ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              className="text-center"
              style={{ marginBottom: "2rem", color: "black" }}
            >
              Contraseña restablecida correctamente.
            </h2>
          </div>
        ) : isCodeSent ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              className="text-center"
              style={{ marginBottom: "2rem", color: "black" }}
            >
              Ingrese el código de verificación y su nueva contraseña.
            </h2>
            <FormControl style={{ marginBottom: "1rem", width: "80%" }}>
              <FormLabel>Código de verificación</FormLabel>
              <TextField
                variant="outlined"
                type="number"
                placeholder="Código de verificación"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
            <FormControl style={{ marginBottom: "1rem", width: "80%" }}>
              <FormLabel>Ingrese nueva contraseña</FormLabel>
              <TextField
                variant="outlined"
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => validatePassword(newPassword)}
              />
            </FormControl>

            {!passwordValid && (
              <Alert severity="error" style={{ width: "80%" }}>
                {passwordErrorMessage}
              </Alert>
            )}

            <Button
              onClick={handleResetPassword}
              style={{
                marginTop: "1.5rem",
                backgroundColor: "blue",
                color: "white",
                height: "60px",
              }}
            >
              Restablecer contraseña
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl style={{ marginBottom: "1rem", width: "80%" }}>
              <FormLabel>Telefono/Email</FormLabel>
              <TextField
                variant="outlined"
                placeholder="Ingrese teléfono o correo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <Button
              onClick={handleSendCode}
              style={{
                marginTop: "1.5rem",
                backgroundColor: "blue",
                color: "white",
                width: "80%",
                height: "60px",
              }}
            >
              Enviar código de verificación
            </Button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
export default CustomForgotPass;
