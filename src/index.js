import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginEmpresa from './services/LoginEmpresa'
import { FormEmpresa } from './components/Empresa/FormEmpresa'
import { RegistroEmpresa } from './pages/RegistroEmpresa'
import { FormVacante } from './pages/FormVacante'
import LoginBdt from './pages/BDT/LoginBdt'
import PrincipalBdT, { PrincipalBdt } from './pages/BDT/PrincipalBdt'
import LandingBdt from '../src/pages/LandingBdt'
import RegistroBdT from './pages/BDT/RegistroBdT'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import PerfilBdT from './pages/BDT/PerfilBdT'
import { LandingEmpresa } from './pages/LandingEmpresa'
import { SessionProvider } from './context/SessionContext'
import { Vacantes } from './pages/Vacantes/Vacantes'
import { VacanteDatos } from './pages/Vacantes/VacanteDatos'
import { DataVacanteProvider } from './context/DataVacanteContext'
import { FormVacanteEdit } from './pages/FormVacanteEdit'
import Error from './components/Error'
import ErrorIniciarSesion from './components/ErrorIniciarSesion'
import { BuscarEmpleo } from './pages/BDT/BuscarEmpleo'
import { OportunidadesLaborales } from './pages/BDT/OportunidadesLaborales'
import { VacantesPostulados } from './pages/Empresa/VacantesPostulados'
import { AvisoBdt } from './components/AvisosTerminos/AvisoBdt'
import { AvisoEmpresa } from './components/AvisosTerminos/AvisoEmpresa'
import { TerminosBdt } from './components/AvisosTerminos/TerminosBdt'
import { TerminosEmpresa } from './components/AvisosTerminos/TerminosEmpresa'
import { MapaSitio } from './components/MapaSitio'
import { PrincipalEmpresa } from './pages/Empresa/PrincipalEmpresa'

Amplify.configure(awsExports)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  //Empresa
  {
    path: '/login-empresa',
    element: <LoginEmpresa />
  },
  {
    path: '/registro-empresa',
    element: <RegistroEmpresa />
  },
  {
    path: '/perfil-bdt',
    element: <PerfilBdT />
  },
  {
    path: '/form-empresa',
    element: <FormEmpresa />
  },
  {
    path: '/inicio-empresa',
    element: <LandingEmpresa />
  },
  {
    path: '/inicio-empresa/postulados',
    element: <VacantesPostulados />
  },
  //BDT
  {
    path: '/login-bdt',
    element: <LoginBdt />
  },
  {
    path: '/inicioempresa',
    element: <PrincipalEmpresa />
  },
  {
    path: '/iniciop-bdt',
    element: <PrincipalBdt />
  },
  {
    path: '/registro-bdt',
    element: <RegistroBdT />
  },
  {
    path: '/inicio-bdt',
    element: <LandingBdt />
  },
  {
    path: '/inicio-bdt/oportunidades-laborales',
    element: <OportunidadesLaborales />
  },
  {
    path: '/inicio-bdt/buscar-empleo',
    element: <BuscarEmpleo />
  },
  //Terminos y condiciones empresa y bdt
  {
    path: 'aviso-bdt',
    element: <AvisoBdt />
  },
  {
    path: 'aviso-empresa',
    element: <AvisoEmpresa />
  },
  {
    path: 'terminos-bdt',
    element: <TerminosBdt />
  },
  {
    path: 'terminos-empresa',
    element: <TerminosEmpresa />
  },
  //Vacante
  {
    path: '/registro-vacante',
    element: (
      <DataVacanteProvider>
        <FormVacante />
      </DataVacanteProvider>
    )
  },
  {
    path: '/inicio-empresa/vacantes',
    element: <Vacantes />
  },
  {
    path: '/inicio-empresa/vacantes/:id',
    element: <VacanteDatos />
  },
  {
    path: '/inicio-empresa/vacantes/editar-vacante/:id',
    element: (
      <DataVacanteProvider>
        <FormVacanteEdit />
      </DataVacanteProvider>
    )
  },
  {
    path: '/mapa-sitio',
    element: <MapaSitio />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '/error-sesion',
    element: <ErrorIniciarSesion />
  },
  {
    path: '/*',
    element: <Error />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChakraProvider>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
