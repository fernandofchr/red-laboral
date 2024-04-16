import {
  Flex,
  Spacer,
  Link,
  Image,
  ButtonGroup,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import logo from "../img/logo-sinfondo.png";
import { useSession } from "../hooks/useSession";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Empresa } from "../models";

export function Nav({ nombreDelGrupo }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logOut, dataSession, nombreGrupo } = useSession("empresa");
  const isSmallDevice = useBreakpointValue({
    base: true,
    md: false,
  });
  const location = useLocation();
  const [sesion, setsesion] = useState("Empresa");

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setsesion("Empresa");
  }, [setsesion]);

  return (
    <Flex>
      <Link as={RouterLink} to="/">
        <Image src={logo} width={200} />
      </Link>
      <Spacer />
      <Flex gap={3} alignItems="center">
        {isSmallDevice ? (
          <Menu>
            <MenuButton
              backgroundColor="#181c24"
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon color="white" />}
              variant="outline"
            />
            <MenuList>
              {sesion && nombreGrupo === "Empresa" && (
                <>
                  <MenuItem>
                    <Link as={RouterLink} to="/inicio-empresa">
                      Inicio
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RouterLink} to="/inicio-empresa/vacantes">
                      Vacantes
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RouterLink} to="/inicio-empresa/postulados">
                      Postulados
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
                </>
              )}
              <>
                <MenuItem>
                  <Link
                    as={RouterLink}
                    to="/"
                    color={colorMode === "light" ? "black" : "white"}
                  >
                    Inicio
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    color={colorMode === "light" ? "black" : "white"}
                    as={RouterLink}
                    to="/iniciop-bdt"
                  >
                    Buscadores de trabajo
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    color={colorMode === "light" ? "black" : "white"}
                    as={RouterLink}
                    to="/inicioempresa"
                  >
                    Empresas
                  </Link>
                </MenuItem>
              </>
            </MenuList>
          </Menu>
        ) : (
          <>
            {sesion && nombreGrupo === "Empresa" && (
              <ButtonGroup>
                <RouterLink to="/inicio-empresa">
                  <Text
                    color="#fff"
                    _hover={{ color: "#79f0f7" }}
                    style={
                      isActive("/inicio-empresa") ? { color: "#79f0f7" } : null
                    }
                  >
                    Inicio
                  </Text>
                </RouterLink>
                <RouterLink to="/inicio-empresa/vacantes">
                  <Text
                    color="#fff"
                    _hover={{ color: "#79f0f7" }}
                    style={
                      isActive("/inicio-empresa/vacantes")
                        ? { color: "#79f0f7" }
                        : null
                    }
                  >
                    Vacantes
                  </Text>
                </RouterLink>
                <RouterLink to="/inicio-empresa/postulados">
                  <Text
                    color="#fff"
                    _hover={{ color: "#79f0f7" }}
                    style={
                      isActive("/inicio-empresa/postulados")
                        ? { color: "#79f0f7" }
                        : null
                    }
                  >
                    Postulados
                  </Text>
                </RouterLink>
                <Link
                  color="#fff"
                  onClick={logOut}
                  _hover={{ color: "#79f0f7" }}
                >
                  Cerrar Sesión
                </Link>
              </ButtonGroup>
            )}
            {dataSession.session === false && (
              <ButtonGroup>
                <Link
                  color="#fff"
                  href="/"
                  _hover={{ color: "#79f0f7" }}
                  style={isActive("/") ? { color: "#79f0f7" } : null}
                >
                  Inicio
                </Link>
                <Link
                  color="#fff"
                  href="/iniciop-bdt"
                  _hover={{ color: "#79f0f7" }}
                  style={isActive("/iniciop-bdt") ? { color: "#79f0f7" } : null}
                >
                  Buscadores de trabajo
                </Link>
                <Link
                  color="#fff"
                  href="/inicioempresa"
                  _hover={{ color: "#79f0f7" }}
                  style={
                    isActive("/inicioempresa") ? { color: "#79f0f7" } : null
                  }
                >
                  Empresas
                </Link>
              </ButtonGroup>
            )}
          </>
        )}
        {colorMode === "light" ? (
          <MoonIcon cursor="pointer" onClick={toggleColorMode} color="#fff" />
        ) : (
          <SunIcon cursor="pointer" onClick={toggleColorMode} />
        )}
      </Flex>
    </Flex>
  );
}
