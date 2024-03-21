import { Postulados } from "../../components/Empresa/Postulados";
import { Header } from "../../components/Header";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";
import { Footer } from "../../landing/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export function VacantesPostulados() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupName = async () => {
      const session = await Auth.currentSession();
      const userData = session.getIdToken().payload;
      console.log(userData); 
      const groupName = userData['cognito:groups'][0];
      console.log(groupName);
      if (groupName === 'trabajador') {
        navigate('/inicio-bdt');
      }
    };
    fetchGroupName();
  }, [])

  return (
    <>
      <Header nombreDelGrupo="Empresa" />
      <BasicBreadcrumbs/>
      <Postulados />
      <Footer />
    </>
  );
}
