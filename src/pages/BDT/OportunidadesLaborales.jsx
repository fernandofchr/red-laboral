import NavegadorBDT from '../../components/BDT/inicioBdT/NavegadorBDT'
import { Oportunidades } from '../../components/Oportunidades/Oportunidades'
import BasicBreadcrumbs from '../../landing/Breadcrumbs'
import { Footer } from '../../landing/Footer'
import { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function OportunidadesLaborales() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupName = async () => {
      const session = await Auth.currentSession();
      const userData = session.getIdToken().payload;
      console.log(userData); 
      const groupName = userData['cognito:groups'][0];
      console.log(groupName);
      if (groupName === 'Empresa') {
        navigate('/inicio-empresa');
      }
    };
    fetchGroupName();
  }, [])
  return (
    <>
      <NavegadorBDT />
      <BasicBreadcrumbs/>
      <Oportunidades />
      <Footer />
    </>
  )
}
