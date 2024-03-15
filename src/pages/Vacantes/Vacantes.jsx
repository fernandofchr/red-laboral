import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SinVacantes } from "../../components/Vacantes/SinVacantes";
import { Vacante } from "../../components/Vacantes/Vacante";
import { ButtonVacante } from "../../components/ButtonVacante";
import { useManageVacantes } from "../../hooks/useManageVacantes";
import { Footer } from "../../landing/Footer";
import { useSession } from "../../hooks/useSession";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export function Vacantes() {
  const [groupName, setGroupName] = useState('');
  const navigate= useNavigate()
  const {
    listVacantes,
    vacantesVisibles,
    vacantesNoVisibles,
    listVacantesNoVisibles,
    isVacanteVisible,
    handleChangeVacanteStatus,
  } = useManageVacantes();
  const { dataSession } = useSession("Empresa");

  useEffect(() => {
    if (isVacanteVisible) listVacantes({ emailEmpresa: dataSession.email });
    else listVacantesNoVisibles({ emailEmpresa: dataSession.email });
  }, []);
  
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await Auth.currentSession();
        const userData = session.getIdToken().payload;
        const groupName = userData['cognito:groups'][0];
        setGroupName(groupName);
        if (groupName !== 'Empresa') {
          navigate('/error-sesion');
        }
      } catch (error) {
        console.log(error);
        navigate('/error-sesion');
      }
    };
    checkAuth();
  }, [groupName, navigate]);
  
  useEffect(() => {
    if (dataSession == 'trabajador') {
      navigate('/inicio-bdt');
    }
  }, [dataSession]);

  return (
    <>
      <Header nombreDelGrupo={"Empresa"} />
      <BasicBreadcrumbs/>
      <Stack mt="2rem" p={5}>
        <Heading as="h2" size="2xl">
          Vacantes
        </Heading>
        <Text fontSize="xl" textAlign={"justify"}>
          En esta sección podrás administrar tus vacantes
        </Text>
        <Grid>
          <GridItem>
            <Text fontSize="md" as="i" opacity="0.8">
              {isVacanteVisible
                ? `${vacantesVisibles.length} resultados`
                : `${vacantesNoVisibles.length} resultados`}
            </Text>
          </GridItem>
          <GridItem>
            <Flex flexDir="column" alignItems="end" gap="1rem" mr="2rem">
              <ButtonVacante to="/registro-vacante">
                Crear una vacante
              </ButtonVacante>
              <Select w="12rem" onChange={handleChangeVacanteStatus}>
                <option value="activas">Vacantes activas</option>
                <option value="inactivas">Vacantes inactivas</option>
              </Select>
            </Flex>
          </GridItem>
        </Grid>
      </Stack>
      {isVacanteVisible ? (
        vacantesVisibles.length ? (
          <Vacante vacantes={vacantesVisibles} />
        ) : (
          <SinVacantes>Aún no has registrado ninguna vacante</SinVacantes>
        )
      ) : vacantesNoVisibles.length ? (
        <Vacante vacantes={vacantesNoVisibles} />
      ) : (
        <SinVacantes>Aún no has registrado ninguna vacante</SinVacantes>
      )}
      <Footer />
    </>
  );
}
