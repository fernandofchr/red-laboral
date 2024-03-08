import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Center,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import logo from "../img/logo-sinfondo.png";
import { Link } from "react-router-dom";

function ErrorIniciarSesion() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Center>
        <Container>
          <Image src={logo} alt="RedLaboral" />
        </Container>
      </Center>
      <Heading as="h1" size="2xl" color="gray.500" textAlign="center" mt={8}>
        Error 404
      </Heading>

      <Heading as="h2" size="xl" color="gray.500" textAlign="center" mt={4}>
        Acceso denegado
      </Heading>

      <Heading as="h3" size="md" color="gray.500" textAlign="center" mt={4}>
        Necesita estar logeado para acceder a la página que está buscando.
      </Heading>

      <Link to="/login-empresa">
        <Button colorScheme="blue" mt={8}>
          Iniciar sesión
        </Button>
      </Link>
    </Flex>
  );
}

export default ErrorIniciarSesion;
