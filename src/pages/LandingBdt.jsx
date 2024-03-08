import { Header } from '../components/Header'
import { Footer } from '../landing/Footer'
import { InicioBdt } from '../components/BDT/inicioBdT/InicioBdt'
import NavegadorBDT from '../components/BDT/inicioBdT/NavegadorBDT'
import BasicBreadcrumbs from '../landing/Breadcrumbs'

export default function LandingEmpresa() {
  return (
    <>
      <Header nombreDelGrupo={'trabajador'} />
      {/* <NavegadorBDT /> */}
      <BasicBreadcrumbs/>
      <InicioBdt />
      <Footer />
    </>
  )
}
