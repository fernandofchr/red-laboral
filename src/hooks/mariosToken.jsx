import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Usuarios } from '../../models';
import { DataStore } from '@aws-amplify/datastore';
import { NombreGrupo } from '../../hook/NombreGrupo';
import CarouselInicio from '../../components/Inicio/inicio-bienvenida/Carrusel';
import ListaProductosVender from '../../components/Usuarios/ListaProductosVender';
import Footer from '../../components/Footer';
import Loader from "../../components/componentesRecicables/Loader";
import Features from '../../components/Usuarios/Feature';
import DynamicBreadcrumbs from '../../components/componentesRecicables/MigasDePan';
import QuienesSomos from './QuienesSomos';
import NavegacionUsuariosQuienes from '../../components/Usuarios/NavegacionUsuariosQuienes';
import ListaProductosVenderCategoria from '../../components/Usuarios/ListaProductosVenderCategoria';
import Swal from 'sweetalert2';

function RegistroUsuario() {
  const [session, setSession] = useState('');
  const [, setIdOwner] = useState('');
  const [, setEmail] = useState('');
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [existeBde, setExisteBde] = useState('');
  const [registroCompleto, setregistroCompleto] = useState(false);
  const [, setbdeData] = useState({});
  const [sessionActive, setSessionActive] = useState(true);


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
          signOut(); // Función para cerrar la sesión
        }
      });
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
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const data = await Auth.currentAuthenticatedUser();
        setSession(true);
        setIdOwner(data.username);
        setEmail(data.attributes.email);
        console.log(data.signInUserSession.accessToken.jwtToken); // Imprimir el token
        const currentUser = await Auth.currentAuthenticatedUser();
        const currentSession = await Auth.currentSession();
        const expiresIn = new Date(currentSession.getAccessToken().getExpiration() * 1000) - new Date();
        console.log(expiresIn);
        await NombreGrupo(data.username, 'usuario', setNombreGrupo);
        const sub = DataStore.observeQuery(Usuarios, (c) => c.correo.eq(data.attributes.email), { limit: 1 }).subscribe(({ items }) => {
          setExisteBde(items.length);
          setregistroCompleto(items[0]?.registroCompleto === true ? items[0]?.registroCompleto : false);
          if (items.length > 0) {
            setbdeData(items[0]);
          }
        });
        return () => {
          sub.unsubscribe();
        };
      } catch (error) {
        if (error.name === 'NotAuthorizedException' && error.message === 'Token expired') {
          // Aquí puedes redireccionar al usuario a la página de inicio de sesión o renovar el token.
          setSession(false);
        } else {
          console.error(error);
        }
      }
    }
    getData();
  }, []);
  
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

  if (!nombreGrupo) {
    if (session) {
      return <Loader />
    }
  }

  const renewToken = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
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
  
  // Función para cerrar la sesión
  const signOut = async () => {
    try {
      await Auth.signOut();
      setSession(false); // Actualiza el estado de la sesión
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  };


  return (
    <div>
      {session ? (
        <>
          {nombreGrupo === 'usuarios' ? (
            (existeBde === 1 && registroCompleto) ? (<Navigate to='/inicio-usuarios' />) : (existeBde === 0 || registroCompleto === false) && (
              <>
                <NavegacionUsuariosQuienes setSession={setSession} />
                <CarouselInicio/>
                <div alignItems="center" justifyContent="center" className=" p-3 col-10 pb-4 w-100 mx-0" >
                <DynamicBreadcrumbs/>
                </div>
                <div className='mb-3'>
                <Features />
                </div>
                <h2 className="p-2 row d-flex align-items-center justify-content-center" >Te podria interesar</h2>
                <ListaProductosVender/>
                <QuienesSomos/>
                <ListaProductosVenderCategoria/>
                <Footer/>
              </>
            )
          ) : nombreGrupo === 'empresa' && (
            <Navigate to='/login-empresa' />
          )}
        </>
      ) : session === false && (
        <Navigate to='/login-users' />
      )}
    </div>
  );
}

export default RegistroUsuario;