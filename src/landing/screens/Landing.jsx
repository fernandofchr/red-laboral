import { NavMedium } from "../../pages/NavMedium";
import { Header } from "../../components/Header";
import { Footer } from "../Footer";
import BasicBreadcrumbs from "../Breadcrumbs";
export function Landing() {
  return (
    <>
      <Header />
      <BasicBreadcrumbs/>
      <NavMedium />
      <Footer />
    </>
  );
}
