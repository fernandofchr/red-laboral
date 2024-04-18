
import '@aws-amplify/ui-react/styles.css'
import { Navigate } from 'react-router-dom'
import { useSession } from '../../hooks/useSession'
import Loading2 from '../../components/Loading2'
import { useLayoutEffect } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import {  Authenticator, Heading, Image, View, Text, useTheme, } from "@aws-amplify/ui-react";
import Logo from '../../img/logo-sinfondo.png'

// import CustomSignUp from './CustomLogin/CustomSignUp'
// import CustomSignIn from './CustomLogin/CustomSignIn'
// import CustomForgotPass from './CustomLogin/CustomForgotPass'
// import { Box} from '@chakra-ui/react'

import { I18n } from 'aws-amplify'
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('es');

I18n.putVocabularies({
  es: {
    'Sign In': 'Iniciar Sesión',
    'Sign Up': 'Regístrate',
    'Please confirm your Password': 'Confirme su Contraseña',
    'Reset Password': 'Recuperar Contraseña',
    'Enter your email': 'Correo',
    'Send code': 'Recuperar',
    'Back to Sign In': 'Regresar a Inicio de Sesión',
  },
});

function LoginBdt() {
  const { dataSession, nombreGrupo, saveDataIntoGroupsBDT } = useSession('trabajador')

  useLayoutEffect(() => {
    saveDataIntoGroupsBDT()
  }, [])

  return (
    <div>
      <Loading2 />
      {dataSession.session && nombreGrupo === 'trabajador' ? <Navigate to='/registro-bdt' /> :  <Navigate to='/login-bdt'/>}
    </div>
  )
}

export default function Authstart() {
  const renderAuthenticator = () => {
    const authenticatorConfig = {
      formFields: {},
      services: {},
      initialState: "signUp",
      components: {...components},
    };

    return (
      <div className="no-email">
        <Authenticator {...authenticatorConfig}>
          <LoginBdt />
        </Authenticator>
      </div>
    );

  }

  return <div>{renderAuthenticator()}</div>;
}

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <>
        <View textAlign="center" padding={tokens.space.large}>
          <a href="/" >
            <Image alt="Coneecta logo"  className="home-page-link" src={Logo}  />
          </a>
        </View>
        <>
        </>
      </>
    );
  },
  Footer() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>&copy; Red Laboral</Text>
      </View>
    );
  },

};

