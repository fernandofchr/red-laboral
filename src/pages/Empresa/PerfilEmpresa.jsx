import { useEffect, useState } from "react";
import EmpresaPerfil from "../../components/Empresa/PerfilEmpresa/EmpresaPerfil";
import { Auth } from "aws-amplify";
import { NombreGrupo } from "../../hooks/NombreGrupo";
import { Navigate } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Empresa } from "../../models";
import Loading2 from "../../components/Loading2";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";
import { CustomNav } from "../../components/Empresa/CustomNav";
import { useSession } from "../../hooks/useSession";
import Swal from "sweetalert2";
import { DATA_SESSION_STATE_INITIAL } from "../../constants/EstadosIniciales";
import { useNavigate } from "react-router-dom";

function PerfilEmpresa() {
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [session, setSession] = useState("");
  const [emprData, setEmprData] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const { getDataSessionBDT, setDataSession, dataSession } =
  useSession("Empresa");
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

useEffect(() => {
  const delay = 700; // 5 segundos en milisegundos

  const fetchGroupName = async () => {
    try {
      const session = await Auth.currentSession();
      const userData = session.getIdToken().payload;
      console.log(userData); 
      const groupName = userData['cognito:groups'][0];
      console.log(groupName);
      if (groupName === 'trabajador') {
        navigate('/inicio-bdt');
      }
    } catch (error) {
      console.log("No hay Grupo" + error);
    }
  };

  const timeoutId = setTimeout(fetchGroupName, delay);

  return () => clearTimeout(timeoutId); // Limpiar el timeout en caso de que el componente se desmonte antes de que se ejecute
}, []);

  //BDE
  useEffect(() => {
    async function saves() {
      try {
        await Auth.currentAuthenticatedUser().then(async (user) => {
          await setSession(true);
          await NombreGrupo(user.username, "Empresa", setNombreGrupo);
          await setEmail(user.attributes.email);
          await setUser(user.username); // establecer user.username en el estado del usuario
          const sub = DataStore.observeQuery(
            Empresa,
            (c) => c.email.eq(user.attributes.email),
            { limit: 1 }
          ).subscribe(({ items }) => {
            setEmprData(items[0]);
          });
          return () => {
            sub.unsubscribe();
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    saves();
  }, []);

  useEffect(() => {
    console.log(emprData);
  }, [emprData]);

  if (!nombreGrupo) {
    if (session) {
      return <Loading2 />;
    }
  }

  return (
    <div>
      {session ? (
        <>
          {nombreGrupo === "Empresa" ? (
            <>
              {emprData !== "" && emprData !== undefined ? (
                <>
                  <CustomNav nombreDelGrupo={nombreGrupo} />
                  <BasicBreadcrumbs />
                  <EmpresaPerfil
                    email={email}
                    userID={user}
                    empresa={emprData}
                    setEmpresa={emprData}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          ) : nombreGrupo === "trabajador" ? (
            <Navigate to="/login-bdt" />
          ) : (
            <></>
          )}
        </>
      ) : session === false ? (
        <Navigate to="/login-empresa" />
      ) : (
        <></>
      )}
    </div>
  );
}

export default PerfilEmpresa;
