import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; // Asegúrate de tener este ícono importado
import { useNavigate } from "react-router-dom";

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del buscador
  const navigate = useNavigate();

  // Opciones de búsqueda predeterminadas
  const searchOptions = {
    "Mapa del sitio": "/mapa-sitio",
    Vacantes: "/inicio-empresa/vacantes",
    Empresas: "/login-empresa",
    "Terminos y condiciones de empresa": "/terminos-empresa",
    "Aviso de privacidad empresa": "/aviso-empresa",
    "Terminos y condiciones de empleados": "/terminos-bdt",
    "Aviso de privacidad empleados": "/aviso-bdt",
    "Oportunidades laborales": "/inicio-bdt/oportunidades-laborales",
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    if (input.length > 0) {
      const filtered = Object.keys(searchOptions).filter((option) =>
        option.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const executeSearch = (option) => {
    const path = searchOptions[option];
    if (path) {
      navigate(path);
    } else {
      navigate("/error");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const exactMatch = filteredOptions.find(
        (option) => option.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        executeSearch(exactMatch);
      } else if (filteredOptions.length > 0) {
        executeSearch(filteredOptions[0]);
      } else {
        navigate("/error");
      }
    }
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen); // Cambia el estado de visibilidad del buscador
    if (!isOpen) {
      window.scrollTo(0, 0); // Desplaza la ventana a la parte superior de la página
    }
  };

  return (
    <>
      <IconButton
        icon={<SearchIcon />}
        onClick={toggleSearch}
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="99"
        size="lg"
        colorScheme="teal"
      />
      {isOpen && (
        <Box
          p={2}
          bottom="80px"
          right="20px"
          zIndex="100"
          bgColor="transparent"
          boxShadow="lg"
          borderRadius="md"
        >
          <InputGroup>
            <Input
              fontSize={30}
              placeholder="Buscador"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <InputRightElement width="4.5rem" />
          </InputGroup>
          {filteredOptions.length > 0 && (
            <List
              spacing={2}
              mt={2}
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {filteredOptions.map((option, index) => (
                <ListItem
                  key={index}
                  cursor="pointer"
                  onClick={() => executeSearch(option)}
                >
                  {option}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </>
  );
};

export default Buscador;
