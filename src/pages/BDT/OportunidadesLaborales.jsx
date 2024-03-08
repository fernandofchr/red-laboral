import NavegadorBDT from '../../components/BDT/inicioBdT/NavegadorBDT'
import { Oportunidades } from '../../components/Oportunidades/Oportunidades'
import BasicBreadcrumbs from '../../landing/Breadcrumbs'
import { Footer } from '../../landing/Footer'

export function OportunidadesLaborales() {
  return (
    <>
      <NavegadorBDT />
      <BasicBreadcrumbs/>
      <Oportunidades />
      <Footer />
    </>
  )
}
