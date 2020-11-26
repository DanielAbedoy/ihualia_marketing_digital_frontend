import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'
import '../../../../assets/css/alert-confirm.css';

import { useToasts } from 'react-toast-notifications';
import ModelEventos from '../../../../models/Eventos';

const Drop = ({ evento, gestionar, ir, continuar, reload }) => {

  const { addToast } = useToasts();

  const eliminar = (evento) => {
    confirmAlert({
      message: "Seguro que deseas eliminar el borrador",
      buttons: [
        {
          label: "Si", onClick: () => {
            new ModelEventos().eliminar_evento(evento)
              .then(status => {
                if (status === "No Content") {
                  addToast("Eliminado correctamente", { appearance: "success", autoDismiss: true });
                  reload();
                }
                else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
              })
         } },
        { label: "Cancelar", onClick: () => { } },
      ]
    })
    
  }

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center h5 text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>
      <DropdownMenu>

        {evento.fecha_estatus === "pasado" ?
          <>

            <DropdownItem onClick={() => { gestionar(evento) }} >Gestionar</DropdownItem>
            <DropdownItem onClick={() => { eliminar(evento.id) }} >Eliminar</DropdownItem>

          </>

          : <>
            {evento.estatus === "borrador" ?
              <>
                <DropdownItem onClick={() => { continuar(evento.id) }} >Continuar Borrador</DropdownItem>
                <DropdownItem onClick={() => { eliminar(evento.id) }} >Eliminar</DropdownItem>
              </>
              :
              <>
                <DropdownItem onClick={() => { gestionar(evento) }} >Gestionar</DropdownItem>
                <DropdownItem onClick={() => { ir(evento.url) }} >Ir al evento</DropdownItem>
              </>
            }
          </>}
      </DropdownMenu>
    </UncontrolledDropdown >
  );
}



export default Drop;