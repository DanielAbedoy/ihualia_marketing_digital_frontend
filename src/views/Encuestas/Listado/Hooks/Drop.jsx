import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ModelEcuesta from '../../../../models/Encuestas';
import {confirmAlert } from 'react-confirm-alert';
import { useToasts } from 'react-toast-notifications';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Drop = ({ encuesta, history, reload }) => {

  const { addToast } = useToasts();

  const eliminar = (encuesta) => {

    const ev = async () => {
      const r = await new ModelEcuesta().eliminar_encuesta(encuesta);
      console.log(r)
      if (r === "No Content") {
        addToast("Eliminado correctamente", { appearance: "success", autoDismiss: true });
        reload();
      }else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
    }

    confirmAlert({
      message: "Seguro que deseas eliminar el borrador",
      buttons: [
        {label:"Seguro", onClick:()=> ev()},
        {label:"Cancelar", onClick:()=> {}}
      ]
    })
  }

  const continuar = (encuesta) => {
    history.push({
      pathname: "/encuestas/crear",
      state: { encuesta: encuesta }
    })
  }

  const gestionar = encuesta => {
    history.push({
      pathname: "/encuestas/gestionar",
      state: { encuesta: encuesta }
    })
  }

  const ir = url => history.push(`/encuesta/${url}`);

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center h5 text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>
      <DropdownMenu>
        {encuesta.estatus === "borrador" ?
          <>
            <DropdownItem onClick={() => { eliminar(encuesta.id) }} >Eliminar</DropdownItem>
            <DropdownItem onClick={() => { continuar(encuesta.id) }} >Continuar</DropdownItem>
          </>
          :
          encuesta.estatus === "publicado" ?
            <>
              <DropdownItem onClick={() => { ir(encuesta.url) }} >Ir a la encuesta</DropdownItem>
              <DropdownItem onClick={() => { gestionar(encuesta.id) }} >Gestionar</DropdownItem>
            </>
            :
            <>
              <DropdownItem onClick={() => { eliminar(encuesta.id) }} >Eliminar</DropdownItem>
              <DropdownItem onClick={() => { gestionar(encuesta.id) }} >Gestionar</DropdownItem>
            </>
        }

      </DropdownMenu>
    </UncontrolledDropdown >
  );
}



export default Drop;