import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

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

  return (
    <ThemeProvider theme={theme} p={4}>
      <Breadcrumbs>
        {pathnames.length > 0 ? (
          <Link href="/" onClick={(e) => handleBreadcrumbClick(e, "/")}>
            Home
          </Link>
        ) : (
          <Typography color="textPrimary">Home</Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name} color={"blue"}>
              {name}
            </Typography>
          ) : (
            <Link
              key={name}
              href={routeTo}
              onClick={(e) => handleBreadcrumbClick(e, routeTo)}
            >
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </ThemeProvider>
  );
}
