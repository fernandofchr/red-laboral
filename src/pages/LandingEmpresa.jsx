import { Header } from "../components/Header";
import { Footer } from "../landing/Footer";
import { InicioEmpresa } from "../components/Empresa/InicioEmpresa";
import BasicBreadcrumbs from "../landing/Breadcrumbs";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";

export function LandingEmpresa() {
  const nombreDelGrupoNew = "Empresa";
  const { dataSession } = useSession(nombreDelGrupoNew);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      if (dataSession.session === true) {
        console.log("Data session está lista");
        const session = await Auth.currentSession();
        const userData = session.getIdToken().payload;
        const groupName = userData['cognito:groups'][0];
        console.log(groupName);
        if (groupName === 'trabajador') {
          navigate('/inicio-bdt');
        }
      }
    };

    checkSession();
  }, [dataSession.session, navigate]);
  
  return (
    <>
      <Header nombreDelGrupo={"Empresa"} />
      <BasicBreadcrumbs/>
      <InicioEmpresa />
      <Footer />
    </>
  );
}
