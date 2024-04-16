import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LiaAddressCardSolid,
  LiaCalendarCheckSolid,
  LiaClockSolid,
  LiaMailBulkSolid,
  LiaMoneyBillWaveAltSolid,
  LiaSchoolSolid,
} from "react-icons/lia";
import { SinVacantes } from "../Vacantes/SinVacantes";
import { DatosPostulado } from "./DatosPostulado";
import { Email } from "../../assets/Icons";

export function Postulado({ postulados }) {
  const [isPostuladoSelected, setIsPostuladoSelected] = useState(false);
  const [postuladoSelected, setPostuladoSelected] = useState();

  const handleClickOpenVacante = (oportunidad) => {
    setPostuladoSelected(oportunidad);
    setIsPostuladoSelected(true);
  };
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      gap="2rem"
      p="5"
    >
      <>
        <Flex gap="1rem" flexDir="column">
          {postulados?.map((postulado) => {
            const {
              nombre,
              area,
              diasLaborales,
              escolaridad,
              salarioMin,
              salarioMax,
              modalidad,
              id,
              nombreBDT,
              emailBDT,
            } = postulado;
            return (
              <Card
                onClick={() => handleClickOpenVacante(postulado)}
                borderColor="transparent transparent transparent #79f0f7"
                borderWidth="0.2rem"
                boxShadow="xl"
                cursor="pointer"
                key={id}
                borderRadius="sm"
                width={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  xs: "21rem",
                  md: "repeat(2, 1fr)",
                  lg: "10rem",
                }}
              >
                <CardHeader>
                  <Heading as="h3" size="md">
                    {nombreBDT}
                  </Heading>
                  <Text fontWeight="bold">Información del usuario</Text>
                </CardHeader>
                <CardBody>
                  <Stack>
                    <Flex gap="1rem" alignItems="center">
                      <LiaMailBulkSolid />
                      <Text>{emailBDT}</Text>
                    </Flex>
                    <Heading as="h3" size="md" p="0">
                      {nombre}
                    </Heading>
                    <Flex gap="1rem" alignItems="center">
                      <LiaAddressCardSolid />
                      <Text>{area}</Text>
                    </Flex>
                    <Flex gap="1rem" alignItems="center">
                      <LiaMoneyBillWaveAltSolid />
                      <Text>{`$${salarioMin} - $${salarioMax}`}</Text>
                    </Flex>
                    <Flex gap="1rem" alignItems="center">
                      <LiaClockSolid />
                      <Text>{modalidad}</Text>
                    </Flex>
                    <Flex gap="1rem" alignItems="center">
                      <LiaCalendarCheckSolid />
                      <Text>{diasLaborales}</Text>
                    </Flex>
                    <Flex gap="1rem" alignItems="center">
                      <LiaSchoolSolid />
                      <Text>{escolaridad}</Text>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </>
      <GridItem alignSelf="start">
        {isPostuladoSelected ? (
          <DatosPostulado postulado={postuladoSelected} />
        ) : (
          <SinVacantes hasButton={false}>
            <Text textAlign={"justify"} p="2">
              Selecciona al usuario para ver su información e información de la
              vacante
            </Text>
          </SinVacantes>
        )}
      </GridItem>
    </Grid>
  );
}
