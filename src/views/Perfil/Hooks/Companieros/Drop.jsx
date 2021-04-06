import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ModalPerfil from './ModalPerfil';

const Drop = ({usuario}) => {

  const [openModal, setOpenModal] = useState(false);

  return (
    < UncontrolledDropdown >
      <DropdownToggle className="p-1 m-0" style={{ backgroundColor: "transparent", border: "none" }}>
        <p className="text-center text-muted p-0 m-0"><i className="fa fa-bars"></i></p>
      </DropdownToggle>
      
      <DropdownMenu>
        <DropdownItem onClick={() => setOpenModal(!openModal)} >Ver más</DropdownItem>
      </DropdownMenu>

      <ModalPerfil open={openModal} setOpen={setOpenModal} datos={usuario} />
    </UncontrolledDropdown >
  );

}
export default Drop;