import { NavMedium } from "../../pages/NavMedium";
import { Header } from "../../components/Header";
import { Footer } from "../Footer";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate =  useNavigate()

  useEffect(() => {
    const checkFacebookSignIn = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const signInProvider = currentUser.getSignInUserSession().getIdToken().payload.identities[0].providerName;

        const session = await Auth.currentSession();
        const userData = session.getIdToken().payload;
        const groupName = userData['cognito:groups'];
        
        console.log(groupName);
        console.log(signInProvider);
        if (signInProvider === "Facebook" && groupName === "us-east-1_dnztuNPko_Facebook") {
          // El usuario ha iniciado sesión con Facebook
          navigate('/registro-bdt');
        } else if(signInProvider === "Facebook" && groupName === "Empresa" ) {
          navigate('/registro-empresa');
        }else{
          console.log("El usuario no ha iniciado sesión con Facebook");
        }
      } catch (error) {
        // Manejar el error, que podría indicar que el usuario ha cerrado sesión
        console.log("Error al obtener el usuario autenticado:", error.message);
      }
    };

    checkFacebookSignIn();
  }, [navigate]);
  
  return (
    <>
      <Header />
      <NavMedium />
      <Footer />
    </>
  );
}
