import { Postulados } from "../../components/Empresa/Postulados";
import { Header } from "../../components/Header";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";
import { Footer } from "../../landing/Footer";

export function VacantesPostulados() {
  return (
    <>
      <Header nombreDelGrupo="Empresa" />
      <BasicBreadcrumbs/>
      <Postulados />
      <Footer />
    </>
  );
}
