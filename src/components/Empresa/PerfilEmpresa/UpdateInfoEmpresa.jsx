import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Flex,
  Button,
  Box,
  Wrap,
  WrapItem,
  Avatar
} from "@chakra-ui/react";


export default function UpdateInfoEmpresa({
  datosInfoEmpresa,
  setDatosInfoEmpresa,
}) {
  const initialFormData = {
    nombreComercial: datosInfoEmpresa.nombreComercial || "",
    razonSocial: datosInfoEmpresa.razonSocial || "",
    rfc: datosInfoEmpresa.rfc || "",
    telefono: datosInfoEmpresa.telefono || "", // Cambiado a string para manejar números
    municipio: datosInfoEmpresa.municipio || "",
    colonia: datosInfoEmpresa.colonia || "",
    calle: datosInfoEmpresa.calle || "",
    actividad: datosInfoEmpresa.actividad ||  "",
    sector: datosInfoEmpresa.sector || "",
    tipoSucursal: datosInfoEmpresa.tipoSucursal || "" ,
    numero: datosInfoEmpresa.numero || "",
    codigoPostal: datosInfoEmpresa.codigoPostal || "", // Cambiado a string para manejar números
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "number" ? value : value,
    }));

    // Llama a setDatosInfoEmpresa para actualizar los datos en el componente padre
    setDatosInfoEmpresa((prevDatos) => ({
      ...prevDatos,
      [name]: type === "checkbox" ? checked : type === "number" ? value : value,
    }));
  };

  const attributes = [
    "nombreComercial",
    "razonSocial",
    "rfc",
    "telefono",
    "municipio",
    "colonia",
    "calle",
    "codigoPostal",
    "actividad",
    "sector",
    "tipoSucursal",
    "numero"
  ];

  const labels = [
    "Nombre Comercial",
    "Razón Social",
    "RFC",
    "Teléfono",
    "Municipio",
    "Colonia",
    "Calle",
    "Código Postal",
    "Actividad",
    "Sector",
    "Tipo Sucursal",
    "Numero"
  ];

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)", // col-xs-12
        sm: "repeat(1, 1fr)", // col-sm-6
        md: "repeat(1, 1fr)", // col-md-4
        lg: "repeat(1, 1fr)", // col-lg-3
      }}
      justifyItems="center"
      alignItems="center"
    >
        
        <Wrap>
            <WrapItem>
                <Avatar size='2xl' name={formData.nombreComercial} mb="2rem"/>
            </WrapItem>
        </Wrap> 
      <Box
        boxShadow="xl"
        borderWidth="2px"
        borderColor="gray.200"
        borderRadius="lg"
        p="5"
        w="auto"// Cambia el tamaño máximo aquí según tus necesidades
        mx="0rem" // Centra el formulario horizontalmente
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {attributes.map((attribute, index) => (
            <FormControl key={attribute}>
              <FormLabel>{labels[index]}</FormLabel>
              <Input
                type={
                  attribute === "telefono" || attribute === "codigoPostal"
                    ? "number"
                    : "text"
                }
                name={attribute}
                value={formData[attribute]}
                onChange={handleChange}
              />
            </FormControl>
          ))}
          
          
        </Grid>
      </Box>
    </Grid>
  );
}
