import { Button, ButtonGroup, Flex, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; // Importa el componente de reCAPTCHA
import { useState } from "react";

export function BotonesForm({
  botonCancelar = false,
  onClick,
  url,
  setCaptchaValue,
}) {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(url);
  };

  const handleCaptchaChange = (value) => {
    // Este manejador se activará cuando el reCAPTCHA se verifique correctamente
    setCaptchaValue(value);
  };

  return (
    <>
      <Center>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_API_RECAPTCHA}
          onChange={handleCaptchaChange}
        />
      </Center>
      <Flex justifyContent="center" mt="2rem">
        <ButtonGroup mb="3rem">
          {botonCancelar && (
            <Button bg="#181c24" color="#fff" onClick={redirect}>
              Cancelar
            </Button>
          )}
          <Button
            bg="#79f0f7"
            color="#fff"
            _hover={{ bg: "#ff964f" }}
            type="submit"
            onClick={onClick}
          >
            Guardar
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
}
