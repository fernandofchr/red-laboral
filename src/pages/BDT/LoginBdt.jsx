
import '@aws-amplify/ui-react/styles.css'
import { Navigate } from 'react-router-dom'
import { useSession } from '../../hooks/useSession'
import Loading2 from '../../components/Loading2'
import { useEffect } from 'react'
import {  Authenticator, Heading, Image, View, Text, useTheme, } from "@aws-amplify/ui-react";
import Logo from '../../img/logo-sinfondo.png'

import CustomSignUp from './CustomLogin/CustomSignUp'
import CustomSignIn from './CustomLogin/CustomSignIn'
import CustomForgotPass from './CustomLogin/CustomForgotPass'
import { Box} from '@chakra-ui/react'

import { I18n } from 'aws-amplify'
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('es');

I18n.putVocabularies({
  es: {
    'Sign In': 'Iniciar Sesión',
    'Sign Up': 'Regístrate',
  },
});

function LoginBdt() {
  const { dataSession, nombreGrupo, saveDataIntoGroupsBDT } = useSession('trabajador')

  useEffect(() => {
    saveDataIntoGroupsBDT()
    console.log(dataSession);
    console.log(nombreGrupo);
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
      components: {
        ...components,
        SignIn: {
          Header() {
            return (
              <><div className="text-center">
                <CustomSignIn />
              </div>
              </>
            );
          },
        },
        SignUp: {
          Header() {
            return (
              <>
              <Box p={5} alignItems={"center"}>
                <CustomSignUp />
                </Box>
              </>
            );
          },
        },
      },
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
        <Text color={tokens.colors.neutral[80]}>&copy; Derechos reservados</Text>
      </View>
    );
  },


  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <>
          <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
            Ingrese la información:
          </Heading>
        </>
      );
    },
    Footer() {
      return <Text></Text>;
    },
  },

  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <>
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
        Recuperar Contraseña
        </Heading>
        <CustomForgotPass />
        </>
      );
    },
    Footer() {
      return <Text></Text>;
    },
  },

  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Ingrese la información:
        </Heading>
      );
    },
    Footer() {
      return <Text></Text>;
    },
  },
};

