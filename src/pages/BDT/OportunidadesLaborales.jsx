import NavegadorBDT from '../../components/BDT/inicioBdT/NavegadorBDT'
import { Oportunidades } from '../../components/Oportunidades/Oportunidades'
import BasicBreadcrumbs from '../../landing/Breadcrumbs'
import { Footer } from '../../landing/Footer'
import { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function OportunidadesLaborales() {
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
      navigate('/inicio-empresa');
    }
  }, [groupName]);
  return (
    <>
      <NavegadorBDT />
      <BasicBreadcrumbs/>
      <Oportunidades />
      <Footer />
    </>
  )
}
