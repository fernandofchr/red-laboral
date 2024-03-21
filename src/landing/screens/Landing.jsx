import { NavMedium } from "../../pages/NavMedium";
import { Header } from "../../components/Header";
import { Footer } from "../Footer";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Landing() {
   
  return (
    <>
      <Header />
      <NavMedium />
      <Footer />
    </>
  );
}
