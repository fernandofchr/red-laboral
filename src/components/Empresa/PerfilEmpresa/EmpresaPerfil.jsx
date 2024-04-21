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
import Swal from "sweetalert2";
import { deleteUserMail } from "../../../hooks/DeleteUsuario";



const EmpresaPerfil = ({ email, empresa, setEmpresa, userID }) => {
  const [isEdit, setisEdit] = useState(false);
  const navigate = useNavigate();

  const [originalEmpresa, setOriginalEmpresa] = useState(empresa);
  const [isEditingPdf, setIsEditingPdf] = useState(false);

  useEffect(() => {
    console.log(userID);
    
  }, [empresa]);

  const GuardarCambios = async () => {
    await updateEmpresa(originalEmpresa);
    setisEdit(false);
    setEmpresa(originalEmpresa); 
  };

  const eliminarPerfil = async () => {
    try {
      // Muestra un SweetAlert de confirmación
      const result = await Swal.fire({
        title: "¿Está seguro de que desea eliminar su cuenta?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "gray",
        confirmButtonText: "Sí, estoy seguro",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        console.log("Usuario ID:", empresa.id);
        try {
          // Intenta eliminar el registro de DataStore
          const empresaToDelete = await DataStore.query(Empresa, (c) =>
            c.id.eq(empresa.id)
          );
          for (let emp of empresaToDelete) {
            await DataStore.delete(Empresa, emp);
          }

          // Intenta eliminar el correo del usuario
          await deleteUserMail(userID);

          // Ambas operaciones se realizaron con éxito, puedes continuar
          // sendBajaFisica(usuario, email);
          navigate("/");
          await DataStore.clear();
          localStorage.clear();
          sessionStorage.clear();
          Swal.fire("¡Gracias!", "Tu perfil ha sido eliminado.", "success");
        } catch (error) {
          // Maneja errores de DataStore o deleteUserMail aquí.
          console.error("Error al eliminar la cuenta:", error);
        }
      }
    } catch (error) {
      // Maneja errores de SweetAlert aquí.
      console.error("Error:", error);
    }
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
              <Button colorScheme="blue" onClick={() => setisEdit(true)} m="2">
                Editar
              </Button>
              <Button colorScheme="red" onClick={eliminarPerfil} m="2">
                Eliminar 
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
