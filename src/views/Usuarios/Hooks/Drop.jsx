import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Drop = ({usuario, history}) => {

  const administrar = () => {
    history.push({
      pathname: "/usuarios/administrar",
      state: { usuario: usuario }
    })
  }

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>
      
      <DropdownMenu>
        <DropdownItem onClick={administrar} >Administrar</DropdownItem>
      </DropdownMenu>

    </UncontrolledDropdown >
  );

}
export default Drop;