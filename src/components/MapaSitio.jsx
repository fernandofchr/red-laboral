import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MUNICIPIOSM } from "../constants/Datos";
import { AreaEmpresa } from "../constants/Datos";
import { Header } from "./Header";
import { Footer } from "../landing/Footer";
import { Link } from "react-router-dom";
import BasicBreadcrumbs from "../landing/Breadcrumbs";

export function MapaSitio() {
  const [showAllMunicipios, setShowAllMunicipios] = useState(false);

  const toggleMunicipios = () => setShowAllMunicipios(!showAllMunicipios);
  return (
    <>
      <Header />
      <BasicBreadcrumbs />
      <Box p={5}>
        <Heading>Mapa del sitio</Heading>
        <SimpleGrid
          pt={3}
          gap={4}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
        >
          <Card p={4}>
            <Text as="i" fontSize={24}>
              Inicio y ayuda
            </Text>
            <UnorderedList p={4} spacing={3}>
              <ListItem>
                <Link to="/">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }} href="/">
                    Inicio
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/terminos-bdt">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Términos y condiciones usuarios
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/aviso-bdt">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Aviso de privacidad usuarios
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/terminos-empresa">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Términos y condiciones empresa
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/aviso-empresa">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Aviso de privacidad empresas
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/inicioempresa">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Empresas
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/iniciop-bdt">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Buscadores de trabajo
                  </Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </Card>
          <Card p={4}>
            <Text as="i" fontSize={24}>
              Servicios reclutadores
            </Text>
            <UnorderedList p={4} spacing={3}>
              <ListItem>
                <Link to="/login-empresa">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Registro gratuito
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/login-empresa">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Entrar a su cuenta
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/registro-vacante">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Publicar vacantes
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/inicio-empresa/postulados">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Ver postulados
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/inicio-empresa/vacantes">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Vacantes creadas
                  </Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </Card>
          <Card p={4}>
            <Text as="i" fontSize={24}>
              Servicios candidados
            </Text>
            <UnorderedList p={4} spacing={3}>
              <ListItem>
                <Link to="/login-bdt">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Registro gratuito
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/login-bdt">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Entrar a su cuenta
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/inicio-bdt/buscar-empleo">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Ver vacantes
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/inicio-bdt/oportunidades-laborales">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Opurtunidades laborales
                  </Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </Card>
          <Card p={4}>
            <Text as="i" fontSize={24}>
              Empleos por área
            </Text>
            <UnorderedList p={4} spacing={3}>
              {AreaEmpresa.map((AreaEmpresa, index) => (
                <ListItem
                  textAlign="justify"
                  key={index}
                  size={{ base: "lg", md: "xl", xs: "sm", xl: "lg", lg: "xl" }}
                >
                  <Text fontSize={20} _hover={{ color: "#79f0f7" }}>
                    {AreaEmpresa}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Card>
          <Card p={4}>
            <Text as="i" fontSize={24}>
              Busqueda de empleo por municipio
            </Text>
            <UnorderedList p={5} spacing={3}>
              {MUNICIPIOSM.slice(
                0,
                showAllMunicipios ? MUNICIPIOSM.length : 11
              ).map((municipio, index) => (
                <ListItem
                  textAlign="justify"
                  key={index}
                  size={{ base: "lg", md: "xl", xs: "sm", xl: "lg", lg: "xl" }}
                >
                  <Text fontSize={20} _hover={{ color: "#79f0f7" }}>
                    {municipio}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
            <Button onClick={toggleMunicipios} mt={2}>
              {showAllMunicipios ? "Mostrar menos" : "Mostrar más"}
            </Button>
          </Card>
          <Card p={4}>
            <Text as="i" fontSize={24}>
              Perfiles
            </Text>
            <UnorderedList p={4} spacing={3}>
              <ListItem>
                <Link to="https://www.facebook.com/profile.php?id=61556749311225">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Facebook
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="https://www.instagram.com/redlaboral2/">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Instagram
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="https://twitter.com/RedLaboral56859">
                  <Text fontSize={21} _hover={{ color: "#79f0f7" }}>
                    Twitter
                  </Text>
                </Link>
              </ListItem>
            </UnorderedList>
          </Card>
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}
