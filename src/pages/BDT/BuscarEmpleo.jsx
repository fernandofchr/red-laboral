import NavegadorBDT from "../../components/BDT/inicioBdT/NavegadorBDT";
import { Footer } from "../../landing/Footer";
import { VacantesBDT } from "../../components/Vacantes/VacantesBDT";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export function BuscarEmpleo() {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupName = async () => {
      const session = await Auth.currentSession();
      const userData = session.getIdToken().payload;
      const groupName = userData['cognito:groups'][0];
       setGroupName(groupName);
    };
    fetchGroupName();
  }, [])

  useEffect(() => {
    if (groupName == 'Empresa') {
      navigate('/inicio-Empresa');
    }
  }, [groupName]);
  return (
    <>
      <NavegadorBDT />
      <BasicBreadcrumbs/>
      <VacantesBDT />
      <Footer />
    </>
  );
}
