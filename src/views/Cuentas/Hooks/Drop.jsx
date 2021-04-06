import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


const Drop = ({cuenta, history }) => {

  const adminstrar = () => {
    history.push({
      pathname: "/cuentas/administrar",
      state: { cuenta: cuenta },
    })
  }

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>
      
      <DropdownMenu>
        <DropdownItem onClick={adminstrar} >Administrar</DropdownItem>
      </DropdownMenu>

    </UncontrolledDropdown >
  );

}
export default Drop;