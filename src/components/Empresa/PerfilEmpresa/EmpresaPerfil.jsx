import React, { useState, useEffect } from "react";
import {
  Text,
  Grid,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Link,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";

import { Empresa } from "../../../models";
import { DataStore } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { updateEmpresa } from "../../../hooks/EditarEmpresa";

import UpdateInfoEmpresa from "./UpdateInfoEmpresa";
import ViewVistaEmpresa from "./ViewVistaEmpresa";

// Otros imports que necesites

const EmpresaPerfil = ({ email, empresa, setEmpresa, userID }) => {
  const [isEdit, setisEdit] = useState(false);

  const [originalEmpresa, setOriginalEmpresa] = useState(empresa);
  const [isEditingPdf, setIsEditingPdf] = useState(false);

  useEffect(() => {
    
  }, [empresa]);

  const GuardarCambios = async () => {
    await updateEmpresa(originalEmpresa);
    setisEdit(false);
    setEmpresa(originalEmpresa); 
  };

  return (
    <>
      <Text fontSize="4xl" ml="140">
        Perfil de la Empresa
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // col-xs-12
          sm: "repeat(1, 1fr)", // col-sm-6
          md: "repeat(1, 1fr)", // col-md-4
          lg: "repeat(1, 1fr)", // col-lg-3
        }}
        gap={10}
        p={8}
        mx="auto"
      >
        {isEdit ? (
          <>
            <UpdateInfoEmpresa
              datosInfoEmpresa={empresa}
              setDatosInfoEmpresa={setOriginalEmpresa}
            />
            <Flex justify="center">
              <Button colorScheme="blue" onClick={() => GuardarCambios()} m="2">
                Guardar
              </Button>
              <Button colorScheme="red" onClick={() => setisEdit(false)} m="2">
                Cancelar
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <ViewVistaEmpresa
              datosInfoEmpresa={empresa}
              setDatosInfoEmpresa={setOriginalEmpresa}
            />
            <Flex justify="center">
              <Button colorScheme="red" onClick={() => setisEdit(true)} m="2">
                Editar
              </Button>
            </Flex>
          </>
        )}
      </Grid>
      <Wrap justify="center"></Wrap>
      {/* Resto de tu JSX */}
    </>
  );
};

export default EmpresaPerfil;
