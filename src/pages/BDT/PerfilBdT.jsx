import { useEffect, useState } from 'react'
import ComponentePerfilBdT from '../../components/BDT/PerfilBdT/ComponentePerfilBdT'
import { Auth } from 'aws-amplify'
import { NombreGrupo } from '../../hooks/NombreGrupo'
import { Navigate } from 'react-router-dom'
import { DataStore } from '@aws-amplify/datastore'
import { BDT } from '../../models'
import NavegadorBDT from '../../components/BDT/inicioBdT/NavegadorBDT'
import Loading2 from '../../components/Loading2'
import BasicBreadcrumbs from '../../landing/Breadcrumbs'
import { useSession } from '../../hooks/useSession'
import Swal from 'sweetalert2'
import { DATA_SESSION_STATE_INITIAL } from '../../constants/EstadosIniciales'
import { useNavigate } from 'react-router-dom'

function PerfilBdT() {
  const [nombreGrupo, setNombreGrupo] = useState('')
  const [session, setSession] = useState('')
  const [userData, setUserData] = useState('')
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const { getDataSessionBDT, setDataSession, dataSession } =
    useSession("trabajador");
  const navigate = useNavigate();

    
    useEffect(() => {
      let timer;
    const onActive = () => {
      clearTimeout(timer);
      timer = setTimeout(onIdle, 1800000); // 30 minutos para inactividad
    };
  
    const onIdle = () => {
      Swal.fire({
        title: '¿Sigues ahí?',
        text: 'Tu sesión está a punto de expirar.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero seguir',
        cancelButtonText: 'No, cerrar sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          renewToken(); // Función para renovar el token de autenticación
        } else {
          logOut(); // Función para cerrar la sesión
        }
      });
    };
    const logOut = async () => {
      // Implementación de la función logOut
      try {
        await Auth.signOut({ global: true });
        await DataStore.clear();
        setDataSession(DATA_SESSION_STATE_INITIAL);
        sessionStorage.clear();
        localStorage.clear();
        await navigate("/");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    };
  
    // Añadir eventos para detectar actividad
    window.addEventListener('mousemove', onActive);
    window.addEventListener('keydown', onActive);
  
    // Iniciar el timer
    timer = setTimeout(onIdle, 30000); // 30 segundos para la demostración
  
    // Limpieza al salir del componente
    return () => {
      window.removeEventListener('mousemove', onActive);
      window.removeEventListener('keydown', onActive);
      clearTimeout(timer);
    };
  }, [logOut]);
  
  async function logOut() {
    
  }


  const renewToken = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      console.log(currentSession);
      currentUser.refreshSession(currentSession.refreshToken, (err, session) => {
        if (err) {
          throw new Error('Error al renovar el token de sesión', err);
        }
        const newToken = session.getIdToken().getJwtToken();
        console.log('Token renovado:', newToken);
        // Aquí puedes configurar el nuevo token en el estado o donde lo necesites
        window.location.reload(); // Recargar la página para aplicar el nuevo token
      });
    } catch (error) {
      console.error('Error al renovar el token:', error);
    }
  };

  useEffect(() => {
    // Función para verificar y renovar el token automáticamente
    const checkAndRenewToken = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        const expiresIn = new Date(currentSession.getAccessToken().getExpiration() * 1000) - new Date();
        
        if (expiresIn < 300000) { // Si el token expira en menos de 5 minutos
          currentUser.refreshSession(currentSession.refreshToken, (err, session) => {
            if (err) {
              console.error('Error al renovar el token de sesión:', err);
              return;
            }
            console.log('Token renovado exitosamente');
            // Aquí podrías actualizar el estado o realizar otras acciones necesarias
          });
        }
      } catch (error) {
        console.error('Error al obtener el usuario actual:', error);
      }
    };

    // Configurar el intervalo para verificar el token cada 5 minutos
    const interval = setInterval(checkAndRenewToken, 300000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  //BDE
  useEffect(() => {
    async function saves() {
      try {
        await Auth.currentAuthenticatedUser().then(async user => {
          await setSession(true)
          await NombreGrupo(user.username, 'trabajador', setNombreGrupo)
          await setEmail(user.attributes.email)
          await setUser(user.username) // establecer user.username en el estado del usuario
          const sub = DataStore.observeQuery(BDT, c => c.correo.eq(user.attributes.email), { limit: 1 }).subscribe(({ items }) => {
            setUserData(items[0])
          })
          return () => {
            sub.unsubscribe()
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    saves()
  }, [])

  if (!nombreGrupo) {
    if (session) {
      return <Loading2 />
    }
  }

  return (
    <div>
      {session ? (
        <>
          {nombreGrupo === 'trabajador' ? (
            <>
              {userData !== '' && userData !== undefined ? (
                <>
                  <NavegadorBDT setSession={setSession} />
                  <BasicBreadcrumbs/>
                  <ComponentePerfilBdT
                    email={email}
                    userID={user}
                    usuario={userData}
                    setUsuario={setUserData}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          ) : nombreGrupo === 'Empresa' ? (
            <Navigate to='/login-empresa' />
          ) : (
            <></>
          )}
        </>
      ) : session === false ? (
        <Navigate to='/login-bdt' />
      ) : (
        <></>
      )}
    </div>
  )
}

export default PerfilBdT
