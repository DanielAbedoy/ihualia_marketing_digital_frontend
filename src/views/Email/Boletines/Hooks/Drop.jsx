import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ModelEmail from '../../../../models/EmailMarketing';

const Drop = ({ boletin, event_gestionarBoletin, history }) => {

  const onGestionarBoletin = (e,boletin) => {
    e.preventDefault();
    event_gestionarBoletin(boletin);
  }

  const continuarBorrador = (e, boletin) => {
    e.preventDefault();
    history.push({
      pathname: "/emailmarketing/crear",
      state:{boletin:boletin}
    })
  }

  const eliminarBorrador =  (e, boletin) => {
    e.preventDefault();
    if (window.confirm("Seguro que lo eliminaras")) {
      new ModelEmail().delete_boletin(boletin.id).then(r => {
        if (r === "No Content") alert("Eliminado");
        else console.log(r)
      })
    }

  }

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center h5 text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>
      <DropdownMenu>
      {
        boletin.estatus !== "borrador" ?
          <DropdownItem onClick={e => { onGestionarBoletin(e, boletin) }}>Gestionar</DropdownItem>
          :
          <>
            <DropdownItem onClick={e => { continuarBorrador(e, boletin) }} >Continuar Borrador</DropdownItem>
            <DropdownItem  onClick={e => { eliminarBorrador(e, boletin) }}>Eliminar</DropdownItem>
          </>
      }
      </DropdownMenu>
    </UncontrolledDropdown >
  );
}



export default Drop;