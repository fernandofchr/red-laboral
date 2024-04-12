import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  CardBody,
  Card,
  CardHeader,
  Image,
  Stack,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Buscador from "../components/Buscador";
import ReactPlayer from "react-player";
import BasicBreadcrumbs from "../landing/Breadcrumbs";
import Carousel from "../landing/Carrusel";

export function NavMedium() {
  return (
    <Box>
      <Box p={1}>
        <BasicBreadcrumbs />
        <Buscador />
      </Box>
      <SimpleGrid
        p={1}
        gap={4}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        <Card
          border="0"
          background={"transparent"}
          boxShadow="none"
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          mb={5}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl", lg: "5rem" }} mb={7}>
            Únete a nuestra comunidad de red de trabajo.
          </Heading>
          <Text fontSize={{ base: "lg", lg: "lg" }} mb={4}>
            Enlazamos empresas y profesionales a través de una plataforma
            sencilla y amigable.
          </Text>
        </Card>

        <Stack
          direction="row"
          alignItems={"Center"}
          justifyContent={"Center"}
          gap={10}
        >
          <Image
            boxSize={{ base: "150px", md: "200px" }}
            mx={{ base: "auto", lg: "0" }}
            objectFit="cover"
            borderRadius="full"
            src="https://media.istockphoto.com/id/1144431688/es/foto/mujer-joven-sosteniendo-el-ordenador-port%C3%A1til-sentado-loto-pose-contento-con-el-trabajo-hecho.jpg?s=612x612&w=0&k=20&c=Jz-VC_w65m_QCjUH0DMJ8OY02m1-YIB4UoY7psK5ygI="
            alt="RedLaboral"
          />
          <Image
            boxSize={{ base: "150px", md: "200px", lg: "270px" }}
            mx={{ base: "auto", lg: "0" }}
            objectFit="cover"
            src="https://media.istockphoto.com/id/1436767563/es/foto/feliz-t%C3%A9cnico-de-ti-trabajando-en-la-oficina-usando-su-computadora-port%C3%A1til.jpg?s=612x612&w=0&k=20&c=J-06FgHtHiP_3lidUuDS1fM56c19p-Hnsw0e3GmlSJs="
            borderRadius="full"
            alt="RedLaboral"
          />
        </Stack>
      </SimpleGrid>
      {/**Misión, visión y valores */}
      <SimpleGrid
        p={5}
        gap={4}
        templateColumns={{
          base: "repeat(1, 1fr)", // col-xs-12
          sm: "repeat(1, 1fr)", // col-sm-6
          md: "repeat(2, 1fr)", // col-md-4
          lg: "repeat(3, 1fr)", // col-lg-3
        }}
        fontSize="lg"
      >
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center">
              Misión
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="justify">
              Crear una comunidad dinámica de trabajo que facilite la conexión
              entre empresas y profesionales de manera eficiente y amigable. Nos
              dedicamos a ofrecer una plataforma intuitiva y accesible que
              simplifique el proceso de reclutamiento y búsqueda de empleo,
              empoderando a individuos y organizaciones para alcanzar su máximo
              potencial.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center">
              Visión
            </Heading>
          </CardHeader>
          <CardBody>
            <Text textAlign="justify">
              Aspiramos a ser la red de trabajo más influyente y valorada a
              nivel estatal, reconocida por nuestra capacidad de unir talento y
              oportunidades. Nos comprometemos a innovar constantemente para
              anticipar y satisfacer las necesidades cambiantes de profesionales
              y empresas, fomentando un mercado laboral más inclusivo, flexible
              y conectado.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading textAlign="center" size="md">
              Valores
            </Heading>
          </CardHeader>
          <CardBody>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                textAlign: "justify",
              }}
            >
              <div style={{ flex: 1 }}>
                <Text>
                  Integridad
                  <br />
                  Transparencia
                  <br />
                  Responsabilidad
                  <br />
                  Empatía
                  <br />
                  Conexión
                  <br />
                  Inclusión y diversidad
                  <br />
                  Equidad
                </Text>
              </div>
              <div style={{ flex: 1 }}>
                <Text>
                  Colaboración
                  <br />
                  Amigabilidad
                  <br />
                  Innovación constante
                  <br />
                  Agilidad
                  <br />
                  Adaptabilidad
                  <br />
                  Simplicidad
                  <br />
                  Eficiencia
                </Text>
              </div>
            </div>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Box padding="9">
        <Divider />
      </Box>
      {/**EMPRESAS ASOCIADAS */}
      <Box display="flex" alignItems="center" justifyContent="center" pb="1rem">
        <Text as="i" textAlign="center" fontSize="2xl">
          EMPRESAS ASOCIADAS
        </Text>
      </Box>

              {/* Aqui va a ir el carousel */}        

      <div style={{ width: '100%', height: 'auto' }}>
      <Carousel/>
      </div>

    


      
      <Box padding="9">
        <Divider />
      </Box>
      {/**Buscadores de trabajo*/}
      <Box display="flex" alignItems="center" justifyContent="center">
        <Text as="i" textAlign="center" fontSize="2xl">
          Comienza tu historia de éxito
        </Text>
      </Box>
      <SimpleGrid
        spacing={4}
        gap={"3rem"}
        p="4"
        pt="2rem"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        <Card>
          <CardHeader>
            <Heading size="md" alignItems="center">
              Carga tu CV gratis
            </Heading>
          </CardHeader>
          <CardBody>
            <Image
              borderRadius={5}
              w="full"
              objectFit="cover"
              src="https://media.istockphoto.com/id/1463013729/es/foto/formulario-de-registro-en-l%C3%ADnea-para-rellenar-el-formulario-modish.jpg?s=612x612&w=0&k=20&c=pf7VbyLgV1ety8xij8Oj_urbWjkm7rMyLFv9Sg-oPuU="
              alt="Dan Abramov"
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md" alignItems="center">
              Descubre vacantes de tu intereses
            </Heading>
          </CardHeader>
          <CardBody>
            <Image
              borderRadius={5}
              objectFit="cover"
              src="https://media.istockphoto.com/id/1412921381/es/foto/buscar-buscar-web-online-tecnolog%C3%ADa-internet-concepto-de-sitio-web.jpg?s=612x612&w=0&k=20&c=kra67NWtYi_EKphM9taHg9O7PEEnE_iL4QtBTQ83CUw="
              alt="Dan Abramov"
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md" alignItems="center">
              Postúlate y conecta con reclutadores
            </Heading>
          </CardHeader>
          <CardBody>
            <Image
              borderRadius={5}
              objectFit="cover"
              h="full"
              src="https://media.istockphoto.com/id/1355302972/es/foto/mujer-cliente-afroamericana-hablando-con-empleado-de-servicio-de-soporte.jpg?s=612x612&w=0&k=20&c=ZP46V6LUGYWH947snJps9WjsW-Klj5shMc4nTY2j2gY="
              alt="Dan Abramov"
            />
          </CardBody>
        </Card>
      </SimpleGrid>
      <ButtonGroup
        gap="4"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Link to="/login-bdt">
          <Button
            mt={4}
            bg="#181c24"
            color="white"
            _hover={{ bg: "white", color: "#181c24" }}
            fontSize="20px"
          >
            Comenzar
          </Button>
        </Link>
      </ButtonGroup>
      <Box padding="9">
        <Divider />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={8}
        pt={4}
      >
        <ReactPlayer
          url="https://media.istockphoto.com/id/1316272738/es/v%C3%ADdeo/los-socios-comerciales-de-big-city-usan-tablet-computer-en-crowded-street-visualizaci%C3%B3n-del.mp4?s=mp4-640x640-is&k=20&c=ncSn5NsXgTi8URohEKCk9i8vmLdaxUCPpFEBfqxG94s="
          title="YouTube video player"
          controls
          loop
          width="80%"
          height="50%"
        ></ReactPlayer>
      </Box>
    </Box>
  );
}
