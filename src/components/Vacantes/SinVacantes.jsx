import {
  Box,
  Flex,
  Heading,
  Image,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import logosinfondo from "../../img/logo-sinfondo.png";
import logo from "../../img/logo-blanco.png";
import { ButtonVacante } from "../ButtonVacante";
import { Link } from "react-router-dom";

export function SinVacantes({ children, hasButton = true }) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt="5rem"
      mb="7rem"
      gap="1rem"
    >
      <Box>
        <Image
          w="12rem"
          objectFit="cover"
          src={colorMode === "light" ? logosinfondo : logo}
          alt="logo red laboral"
        />
      </Box>
      <Heading fontWeight={400} as="h3" size="md">
        {children}
      </Heading>
      {hasButton && (
        <Link to="/registro-vacante">
          <ButtonVacante>Crear una vacante</ButtonVacante>
        </Link>
      )}
    </Flex>
  );
}
