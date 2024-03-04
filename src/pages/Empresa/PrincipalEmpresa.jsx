import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  isSmallScreen,
  ButtonGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { Footer } from "../../landing/Footer";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import Buscador from "../../components/Buscador";

export function PrincipalEmpresa() {
  const isSmallScreen = window.innerWidth <= 768;

  return (
    <Box>
      <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
      .Text {
        font-family: 'Montserrat', sans-serif;
        font-size: 18px;
      }
      .Texto {
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
      }
    `}
      </style>
      <Header />
      <Box p={5}>
        <Buscador />
      </Box>
      <Flex flexDirection={{ base: "column", md: "row" }} flexWrap="wrap" p="5">
        <Box
          flex={{ base: "1", md: "1/2" }}
          bg="transparent"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Stack direction="row">
            <Image
              p="5"
              borderRadius="5rem"
              objectFit="cover"
              src="https://media.istockphoto.com/id/1094918638/es/foto/venci%C3%B3-el-plazo-con-la-tecnolog%C3%ADa.jpg?s=612x612&w=0&k=20&c=3ik23M9zW15sIAI_KL1zjtzo-QOSaqCZjYP8id5NcmM="
              alt="Dan Abramov"
            />
          </Stack>
        </Box>
        <Box
          flex={{ base: "1", md: "1/2" }}
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="center"
          bg="transparent"
        >
          <Stack direction="column" pb="9" pt="5">
            <Text className="Texto" textAlign={"justify"}>
              ¡Bienvenido(a) a nuestra plataforma de empleo!
            </Text>
            <Text className="Texto" textAlign={"justify"}>
              Aquí, te conectamos con los empledos más competitivos en busca de
              trabajo.
            </Text>
            <Text fontWeight="bold" fontSize="2xl" textAlign={"justify"}>
              Registrate y crea tus vacantes.
            </Text>
            <ButtonGroup gap="4">
              <Link to="/login-empresa">
                <Button
                  bg="#181c24"
                  color="white"
                  _hover={{ bg: "white", color: "#181c24" }}
                  fontSize="25px"
                >
                  Registrate
                </Button>
              </Link>
            </ButtonGroup>
          </Stack>
        </Box>
      </Flex>
      <Box display="flex" alignItems="center" justifyContent="center" pb="1rem">
        <Text as="i" textAlign="center" fontSize="2xl">
          EMPLEADOS COMPETITIVOS
        </Text>
      </Box>
      <SimpleGrid
        direction="row"
        spacing={4}
        gap={"3rem"}
        p="4"
        pt="2rem"
        pb="4rem"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
      >
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="https://media.istockphoto.com/id/1332693985/es/foto/trabajadores-haciendo-ejercicios-de-estiramiento-en-una-reuni%C3%B3n-de-negocios-en-la-oficina.jpg?s=612x612&w=0&k=20&c=586rR0LOPRSWWltqbmYRAQtX-txCm0plvUErNpQhZKo="
          alt="Empleados"
        />
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="https://media.istockphoto.com/id/1450480638/es/foto/dos-trabajadores-industriales-metalististas-con-tableta-en-una-f%C3%A1brica-de-fabricaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=d6LqZtsmZ6FM6W6F2QYMHUUk-DMqP1Ob6FXgi4-swuM="
          alt="Empleados"
        />
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="https://media.istockphoto.com/id/1480281331/es/foto/joven-mujer-negra-que-trabaja-en-una-computadora-port%C3%A1til-en-la-oficina-creativa-por-la-noche.jpg?s=612x612&w=0&k=20&c=KC0Idd4ppiBxxwj3i8JGxWBgXf3RvFzqUvUZGMnFAoI="
          alt="Empleados"
        />
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="https://media.istockphoto.com/id/1185007236/es/foto/mujer-de-negocios-relajarse-al-aire-libre.jpg?s=612x612&w=0&k=20&c=SNNk2kcCkE10X06qYmtsJ3_Spbt5Knv-XFgiEBU9GWc="
          alt="Empleados"
        />
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="https://media.istockphoto.com/id/1464340066/es/foto/el-trabajador-industrial-trabaja-con-un-compa%C3%B1ero-de-trabajo-en-el-patio-de-contenedores-de.jpg?s=612x612&w=0&k=20&c=bB3os-7pzlRHMfFXBCGnHToQ-kRqFXw2lA-ZSzY068A="
          alt="Empleados"
        />
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="https://media.istockphoto.com/id/1438213571/es/foto/nuevo-acuerdo-comercial.jpg?s=612x612&w=0&k=20&c=hZkV46eRL22FlHnS7her4yXWa9bWewynRqPsj3M6w1U="
          alt="Empleados"
        />
      </SimpleGrid>
      <Footer />
    </Box>
  );
}
