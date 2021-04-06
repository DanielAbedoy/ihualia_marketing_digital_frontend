
import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import '../../../../../assets/css/alert-confirm.css';
import ModeloMarketing from '../../../../../models/Marketing';
import { useToasts } from 'react-toast-notifications';



const Options = ({ usuario, cuenta, restart }) => {

  const { addToast } = useToasts();

  const desvincular = () => {
    
    confirmAlert({
      message: "Seguro que deseas desvincular la cuenta ?",
      buttons: [
        {
          label: "Continuar", onClick: () => {
          new ModeloMarketing().delete_vinculacion(cuenta.id,usuario.id)
            .then(r => {
              if (r.statusText === "OK") {
                addToast("Desvinculado correctamente", { appearance: "success", autoDismiss: true });
                restart();
              }
              else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
          })
        } },
        {label:"Cancelar"}
      ]
    })

  }

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem onClick={desvincular}  >Desvincular</DropdownItem>
        <DropdownItem >Cambiar cargo</DropdownItem>
      </DropdownMenu>

    </UncontrolledDropdown >
  );

}
export default Options;