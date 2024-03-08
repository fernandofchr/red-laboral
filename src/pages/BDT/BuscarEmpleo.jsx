import NavegadorBDT from "../../components/BDT/inicioBdT/NavegadorBDT";
import { Footer } from "../../landing/Footer";
import { VacantesBDT } from "../../components/Vacantes/VacantesBDT";
import BasicBreadcrumbs from "../../landing/Breadcrumbs";

export function BuscarEmpleo() {
  return (
    <>
      <NavegadorBDT />
      <BasicBreadcrumbs/>
      <VacantesBDT />
      <Footer />
    </>
  );
}
