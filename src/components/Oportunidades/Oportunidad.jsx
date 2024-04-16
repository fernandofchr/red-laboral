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
import { DatosOportunidad } from "./DatosOportunidad";

export function Oportunidad({ oportunidades }) {
  const [isOportunidadSelected, setIsOportunidadSelected] = useState(false);
  const [oportunidadSelected, setOportunidadSelected] = useState();

  const handleClickOpenVacante = (oportunidad) => {
    if (isOportunidadSelected && oportunidadSelected === oportunidad) {
      setIsOportunidadSelected(false);
      setOportunidadSelected(null);
    } else {
      setOportunidadSelected(oportunidad);
      setIsOportunidadSelected(true);
    }
  };
  return (
    <Grid templateColumns={{ md: "1fr", xl: "repeat(2, 1fr)" }} gap="2rem">
      <GridItem>
        <Flex gap="2rem" flexDir="column" p={2}>
          {oportunidades?.map((oportunidad) => {
            const {
              nombre,
              nombreEmpresa,
              emailEmpresa,
              area,
              diasLaborales,
              escolaridad,
              salarioMin,
              salarioMaximo,
              modalidad,
              id,
            } = oportunidad;
            return (
              <Card
                onClick={() => handleClickOpenVacante(oportunidad)}
                borderColor="transparent transparent transparent #79f0f7"
                borderWidth="0.2rem"
                boxShadow="xl"
                cursor="pointer"
                key={id}
                borderRadius="sm"
                p="2"
                transition="transform 0.3s"
                _hover={{ transform: "scale(0.95)" }}
              >
                <CardHeader>
                  <Heading as="h3" size="md" pb="0">
                    Vacante: {nombre}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack>
                    <Flex gap="1rem" alignItems="center">
                      <LiaAddressCardSolid />
                      <Text>{area}</Text>
                    </Flex>
                    <Flex gap="1rem" alignItems="center">
                      <LiaMoneyBillWaveAltSolid />
                      <Text>{`$${salarioMin} - $${salarioMaximo}`}</Text>
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
                    <Heading mt="1rem" as="h3" size="md" p="0">
                      {nombreEmpresa}
                    </Heading>
                    <Flex gap="1rem" alignItems="center">
                      <LiaMailBulkSolid />
                      <Text>{emailEmpresa}</Text>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </GridItem>
      <GridItem alignSelf="start">
        {isOportunidadSelected ? (
          <DatosOportunidad oportunidad={oportunidadSelected} />
        ) : (
          <SinVacantes hasButton={false}>
            <Text p={4} textAlign="justify">
              Selecciona una oportunidad para visualizar su información
            </Text>
          </SinVacantes>
        )}
      </GridItem>
    </Grid>
  );
}
