import { Box } from "@chakra-ui/react";
import { Nav } from "./Nav";
import NavegadorBDT from "./BDT/inicioBdT/NavegadorBDT";
import { CustomNav } from "./Empresa/CustomNav";

export function Header({ nombreDelGrupo , setSession }) {
  
  return (
    <Box>
      <Box bg="#181c24" p="1rem">
        {nombreDelGrupo === "trabajador" ? (
          <NavegadorBDT setSession={setSession} />
        ) : nombreDelGrupo === "Empresa" ? (
          <CustomNav nombreDelGrupo={nombreDelGrupo} />
        ) : (
          <Nav nombreDelGrupo={nombreDelGrupo} />
        )}
      </Box>
    </Box>
  );
}
