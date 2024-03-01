import React, { useState } from 'react';
import { Box, Center, Button, ButtonGroup } from '@chakra-ui/react';
import { registarBdE } from '../../../hooks/RegistroBdt';
import RegistroHabilidades from './RegistroHabilidades';
import RegistroSituacionActual from './RegistroSituacionActual';
import RegistroInfoPersonal from './RegistroInfoPersonal';
import FilesBDT from './FilesBDT';
import { Storage } from 'aws-amplify';
import Swal from 'sweetalert2';
import { registroCompleto } from '../../../hooks/useSendEmail';
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente de reCAPTCHA

export default function RegistrarBdt({ email }) {
  const [datosInforPersonal, setEDatosInforPersonal] = useState({ nombre: '', apellidos: '', curp: '', fechaNacimiento: '', telefono: '', escolaridad: '', genero: '', correo: email, municipio: '', colonia: '', calle: '', codigoPostal: '' });
  const [habilidades, setHabilidades] = useState({
    idioma: [], // Asegúrate de que idioma sea un array vacío por defecto
    habilidadesBlandas: [],
    habilidadesTecnicas: []
  });

  const [datosSituacion, setDatosSituacion] = useState({ buscasEmpleo: '', trabajando: '', dispViaja: '', dispRadicar: '' });
  const [files, setFiles] = useState({ imagenBDTUrl: null, pdfImagenUrl: null });
  const [captchaValue, setCaptchaValue] = useState(null); // Estado para almacenar el valor del reCAPTCHA

  const handleSubmit = async () => {
    if (!captchaValue) {
      // Si no se ha verificado el reCAPTCHA, muestra un mensaje de advertencia
      Swal.fire({
        title: 'Captcha no verificado',
        text: 'Por favor, verifica que no eres un robot.',
        icon: 'warning'
      });
      return; // Evita enviar el formulario si el reCAPTCHA no está verificado
    }

    registroCompleto(datosInforPersonal, email);

    // Verifica si algún campo en datosInforPersonal está vacío
    const datosInforPersonalIsEmpty = Object.values(datosInforPersonal).some(value => value === '');

    // Verifica si algún campo en habilidades está vacío
    const habilidadesIsEmpty = Object.values(habilidades).some(value => Array.isArray(value) && value.length === 0);

    // Verifica si algún campo en datosSituacion está vacío
    const datosSituacionIsEmpty = Object.values(datosSituacion).some(value => value === '');

    if (datosInforPersonalIsEmpty || habilidadesIsEmpty || datosSituacionIsEmpty || !files) {
      // Muestra una alerta o swal si alguno de los campos está vacío
      // Por ejemplo, puedes usar la librería SweetAlert2 para mostrar una alerta
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de guardar.',
        icon: 'warning'
      });
    } else {
      // Todos los campos están completos, procede con el registro en la base de datos
      console.log('Situación', datosSituacion);
      console.log('files', files.imagenBDTUrl);
      await registarBdE(datosInforPersonal, habilidades, datosSituacion, files);
    }
  };

  const handleCaptchaChange = (value) => {
    // Este manejador se activará cuando el reCAPTCHA se verifique correctamente
    setCaptchaValue(value);
  };

  return (
    <div>
      <div>
        <RegistroInfoPersonal
          datosInforPersonal={datosInforPersonal}
          setEDatosInforPersonal={setEDatosInforPersonal}
        />
      </div>
      <div>
        <RegistroHabilidades
          habilidades={habilidades}
          setHabilidades={setHabilidades}
        />
      </div>
      <div>
        <RegistroSituacionActual
          datosSituacion={datosSituacion}
          setDatosSituacion={setDatosSituacion}
        />
      </div>
      <div>
        <FilesBDT
          files={files}
          setFiles={setFiles}
        />
      </div>
      <Center>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_API_RECAPTCHA}
          onChange={handleCaptchaChange}
        />
      </Center>
      <Center>
        <ButtonGroup>
          <Button
            colorScheme='blue'
            onClick={handleSubmit}>
            Guardar
          </Button>
        </ButtonGroup>
      </Center>
      <br />
    </div>
  );
}
