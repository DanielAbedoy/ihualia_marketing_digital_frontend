import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Drop = ({ evento, gestionar, eliminar, ir, continuar }) => {

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
                <DropdownItem onClick={() => { ir(evento.id) }} >Ir al evento</DropdownItem>
              </>
            }
          </>}
      </DropdownMenu>
    </UncontrolledDropdown >
  );
}



export default Drop;