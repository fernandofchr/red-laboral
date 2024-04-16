import '@aws-amplify/ui-react/styles.css'
import { Navigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { Loading } from '../components/Loading'
import { useEffect, useLayoutEffect } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Box } from '@chakra-ui/react'
import CustomSignUp from '../pages/Empresa/CustomLogin/CustomSignUp'
import CustomSignIn from '../pages/Empresa/CustomLogin/CustomSignIn'

import CustomForgotPass from '../pages/Empresa/CustomLogin/CustomForgotPass'
import {  Authenticator, Heading, Image, View, Text, useTheme, } from "@aws-amplify/ui-react";
import Logo from '../img/logo-sinfondo.png'

function LoginEmpresa() {
  const { dataSession, nombreGrupo, saveDataIntoGroups } = useSession('Empresa')

  useLayoutEffect(() => {
    saveDataIntoGroups()
  }, [])

  return (
    <div>
      <Loading />
      {dataSession.session && nombreGrupo === 'Empresa' ? <Navigate to='/registro-empresa' /> : <Navigate to='/login-empresa' />}
    </div>
  )
}

export default withAuthenticator(LoginEmpresa);

// export default function Authstart() {
//   const renderAuthenticator = () => {
//     const authenticatorConfig = {
//       formFields: {},
//       services: {},
//       initialState: "signUp",
//       components: {
//         ...components,
//         SignIn: {
//           Header() {
//             return (
//               <><div className="text-center">
//                 <CustomSignIn />
//               </div>
//               </>
//             );
//           },
//         },
//         SignUp: {
//           Header() {
//             return (
//               <>
//               <Box p={5} alignItems={"center"}>
//                 <CustomSignUp />
//                 </Box>
//               </>
//             );
//           },
//         },
//       },
//     };

//     return (
//       <div className="no-email">
//         <Authenticator {...authenticatorConfig}>
//           <LoginEmpresa />
//         </Authenticator>
//       </div>
//     );

//   }

//   return <div>{renderAuthenticator()}</div>;
// }

// const components = {
//   Header() {
//     const { tokens } = useTheme();
//     return (
//       <>
//         <View textAlign="center" padding={tokens.space.large}>
//           <a href="/" >
//             <Image alt="Coneecta logo"  className="home-page-link" src={Logo}  />
//           </a>
//         </View>
//         <>
//         </>
//       </>
//     );
//   },

//   Footer() {
//     const { tokens } = useTheme();
//     return (
//       <View textAlign="center" padding={tokens.space.large}>
//         <Text color={tokens.colors.neutral[80]}>&copy; Derechos reservados</Text>
//       </View>
//     );
//   },


//   ConfirmSignUp: {
//     Header() {
//       const { tokens } = useTheme();
//       return (
//         <>
//           <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
//             Ingrese la información:
//           </Heading>
//         </>
//       );
//     },
//     Footer() {
//       return <Text></Text>;
//     },
//   },

//   ResetPassword: {
//     Header() {
//       const { tokens } = useTheme();
//       return (
//         <>
//         <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
//         Recuperar Contraseña
//         </Heading>
//         <CustomForgotPass />
//         </>
//       );
//     },
//     Footer() {
//       return <Text></Text>;
//     },
//   },

//   ConfirmResetPassword: {
//     Header() {
//       const { tokens } = useTheme();
//       return (
//         <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
//           Ingrese la información:
//         </Heading>
//       );
//     },
//     Footer() {
//       return <Text></Text>;
//     },
//   },
// };
