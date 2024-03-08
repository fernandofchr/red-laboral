import { Header } from "../components/Header";
import { Footer } from "../landing/Footer";
import { InicioEmpresa } from "../components/Empresa/InicioEmpresa";
import BasicBreadcrumbs from "../landing/Breadcrumbs";

export function LandingEmpresa() {
  return (
    <>
      <Header nombreDelGrupo={"Empresa"} />
      <BasicBreadcrumbs/>
      <InicioEmpresa />
      <Footer />
    </>
  );
}
