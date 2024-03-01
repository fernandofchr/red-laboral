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
              src="https://media.istockphoto.com/id/1428698219/es/foto/feliz-joven-empresaria-hablando-por-tel%C3%A9fono-en-un-almac%C3%A9n.jpg?s=612x612&w=0&k=20&c=jbrDrttkbVtpE1NrPirmqDv10tCv0AkolMs4HrYN0Zs="
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
                  fontSize="20px"
                >
                  Registrarse
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
          src="https://media.istockphoto.com/id/1185007236/es/foto/mujer-de-negocios-relajarse-al-aire-libre.jpg?s=612x612&w=0&k=20&c=SNNk2kcCkE10X06qYmtsJ3_Spbt5Knv-XFgiEBU9GWc="
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
          src="data:image/png;base64,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"
          alt="Empleados"
        />
        <Image
          boxSize="200px"
          objectFit="cover"
          borderRadius="full"
          src="data:image/png;base64,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"
          alt="Empleados"
        />
      </SimpleGrid>
      <Footer />
    </Box>
  );
}
