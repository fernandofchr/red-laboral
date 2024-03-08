import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@chakra-ui/react";

// Crear un tema personalizado con el estilo body1 definido
const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1rem", // Puedes ajustar el tamaño de fuente según sea necesario
    },
  },
});

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    console.log(pathnames[0]);
  }, [pathnames]);

  const handleBreadcrumbClick = (event, path) => {
    event.preventDefault();
    navigate(path);
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ThemeProvider theme={theme} p={4}>
      <Box p={5}>
        <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />}>
          {pathnames.length > 0 ? (
            <Link href="/" onClick={(e) => handleBreadcrumbClick(e, "/")}>
              <Typography color={colorMode === "light" ? "black" : "white"}>
                Home
              </Typography>
            </Link>
          ) : (
            <Typography color={colorMode === "light" ? "black" : "white"}>
              Home
            </Typography>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography
                key={name}
                color={colorMode === "light" ? "black" : "white"}
              >
                {name}
              </Typography>
            ) : (
              <Link
                key={name}
                href={routeTo}
                onClick={(e) => handleBreadcrumbClick(e, routeTo)}
              >
                <Typography color={colorMode === "light" ? "black" : "white"}>
                  {name}
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
    </ThemeProvider>
  );
}
