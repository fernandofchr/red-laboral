import { DataStore } from '@aws-amplify/datastore';
import { Empresa } from '../models';

export const updateEmpresa = async (usuario) => {
    try {
      // Se consulta el usuario original desde el DataStore
      const original = await DataStore.query(Empresa, usuario.id);
      console.log(usuario.nombreComercial);
 
      // Se guarda La empresa actualizado en el DataStore
      await DataStore.save(
        Empresa.copyOf(original, (updated) => {
          updated.nombreComercial = usuario.nombreComercial;
          updated.razonSocial = usuario.razonSocial;
          updated.rfc =  usuario.rfc;
          updated.telefono = String(usuario.telefono);
          updated.municipio = usuario.municipio;
          updated.codigoPostal = parseInt(usuario.codigoPostal,10);
          updated.colonia = usuario.colonia;
          updated.calle = usuario.calle;


          updated.actividad = usuario.actividad
          updated.sector = usuario.sector
          updated.tipoSucursal = usuario.tipoSucursal;
          updated.numero = parseInt(usuario.numero);
      
        })
      );
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  }