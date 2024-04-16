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
import {
  LiaAddressCardSolid,
  LiaCalendarCheckSolid,
  LiaClockSolid,
  LiaMailBulkSolid,
  LiaMoneyBillWaveAltSolid,
  LiaSchoolSolid,
} from "react-icons/lia";
import { SinVacantes } from "./SinVacantes";
import { useState } from "react";
import { DatosVacanteBDT } from "./DatosVacanteBDT";

export function VacanteBDT({ vacantes }) {
  const [isVacanteSelected, setIsVacanteSelected] = useState(false);
  const [vacanteSelected, setVacanteSelected] = useState();

  const handleClickOpenVacante = (vacante) => {
    if (isVacanteSelected && vacanteSelected === vacante) {
      setIsVacanteSelected(false);
      setVacanteSelected(null);
    } else {
      setVacanteSelected(vacante);
      setIsVacanteSelected(true);
    }
  };
  return (
    <Grid templateColumns={{ md: "1fr", xl: "repeat(2, 1fr)" }} gap="2rem">
      <GridItem>
        <Flex gap="2rem" p="2" flexDir="column">
          {vacantes?.map((vacante) => {
            const {
              nombre,
              nombreEmpresa,
              emailEmpresa,
              area,
              diasLaborales,
              escolaridad,
              salarioMin,
              salarioMax,
              modalidad,
              id,
            } = vacante;
            return (
              <Card
                onClick={() => handleClickOpenVacante(vacante)}
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
                  <Heading as="h3" size="md" p="0">
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
                    <Heading as="h3" size="md" p="0">
                      Empresa: {nombreEmpresa}
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
        {isVacanteSelected ? (
          <DatosVacanteBDT vacante={vacanteSelected} />
        ) : (
          <SinVacantes hasButton={false}>
            <Text p="3" textAlign="justify">
              Selecciona una vacante para visualizar su información
            </Text>
          </SinVacantes>
        )}
      </GridItem>
    </Grid>
  );
}
