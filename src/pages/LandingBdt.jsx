import { Header } from '../components/Header'
import { Footer } from '../landing/Footer'
import { InicioBdt } from '../components/BDT/inicioBdT/InicioBdt'
import NavegadorBDT from '../components/BDT/inicioBdT/NavegadorBDT'
import BasicBreadcrumbs from '../landing/Breadcrumbs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'


export default function LandingEmpresa() {
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
      <Header nombreDelGrupo={'trabajador'} />
      {/* <NavegadorBDT /> */}
      <BasicBreadcrumbs/>
      <InicioBdt />
      <Footer />
    </>
  )
}
