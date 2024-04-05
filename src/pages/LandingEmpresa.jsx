import { Header } from "../components/Header";
import { Footer } from "../landing/Footer";
import { InicioEmpresa } from "../components/Empresa/InicioEmpresa";
import BasicBreadcrumbs from "../landing/Breadcrumbs";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LandingEmpresa() {

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupName = async () => {
      const session = await Auth.currentSession();
      const userData = session.getIdToken().payload;
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
      <Header nombreDelGrupo={"Empresa"} />
      <BasicBreadcrumbs/>
      <InicioEmpresa />
      <Footer />
    </>
  );
}
