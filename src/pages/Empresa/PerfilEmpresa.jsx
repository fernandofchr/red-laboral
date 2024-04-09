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

function PerfilEmpresa() {
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [session, setSession] = useState("");
  const [emprData, setEmprData] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

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
