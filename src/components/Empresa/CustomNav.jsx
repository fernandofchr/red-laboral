import React from "react";
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
import logo from "../../img/logo-sinfondo.png";
import { useSession } from "../../hooks/useSession";

export function CustomNav({ nombreDelGrupo }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logOut } = useSession("Empresa");
  const isSmallDevice = useBreakpointValue({ base: true, md: false });

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
              {nombreDelGrupo === "Empresa" && (
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

                  <MenuItem>
                    <Link as={RouterLink} to="/inicio-empresa/perfil">
                      Perfil
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link
                      color="#fff"
                      onClick={logOut}
                      _hover={{ color: "#79f0f7" }}
                    >
                      Cerrar Sesión
                    </Link>
                  </MenuItem>

                </>
              )}
              {nombreDelGrupo === "OtroGrupo" && (
                <>
                  <MenuItem>
                    <Link as={RouterLink} to="/opcion-a">
                      Opción A
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RouterLink} to="/opcion-b">
                      Opción B
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={RouterLink} to="/opcion-c">
                      Opción C
                    </Link>
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        ) : (
          <>
            {nombreDelGrupo === "Empresa" && (
              <ButtonGroup>
                <RouterLink to="/inicio-empresa">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Inicio
                  </Text>
                </RouterLink>
                <RouterLink to="/inicio-empresa/vacantes">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Vacantes
                  </Text>
                </RouterLink>
                <RouterLink to="/inicio-empresa/postulados">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Postulados
                  </Text>
                </RouterLink>
                <RouterLink to="/inicio-empresa/perfil">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Perfil
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
            {nombreDelGrupo === "OtroGrupo" && (
              <ButtonGroup>
                <RouterLink to="/opcion-a">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Opción A
                  </Text>
                </RouterLink>
                <RouterLink to="/opcion-b">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Opción B
                  </Text>
                </RouterLink>
                <RouterLink to="/opcion-c">
                  <Text color="#fff" _hover={{ color: "#79f0f7" }}>
                    Opción C
                  </Text>
                </RouterLink>
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
