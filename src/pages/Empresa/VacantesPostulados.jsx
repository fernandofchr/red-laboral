import { Postulados } from "../../components/Empresa/Postulados";
import { Header } from "../../components/Header";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";
import { Footer } from "../../landing/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export function VacantesPostulados() {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

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
    if (groupName == 'trabajador') {
      navigate('/inicio-bdt');
    }
  }, [groupName]);
  return (
    <>
      <Header nombreDelGrupo="Empresa" />
      <BasicBreadcrumbs/>
      <Postulados />
      <Footer />
    </>
  );
}
