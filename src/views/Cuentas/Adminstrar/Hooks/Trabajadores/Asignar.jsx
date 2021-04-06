import React, { useState } from 'react';
import AsigUsuarios from '../../../Hooks/AsigUsuarios';
import { Row } from 'reactstrap';

import { useToasts } from 'react-toast-notifications';
import ModeloMarketing from '../../../../../models/Marketing';

const Asignar = ({cuenta ,usuarios, cancel, restart }) => {

  const [usersNew, setUsersNew] = useState([]);
  const { addToast } = useToasts();


  const validar = () => {
    if (usersNew.length === 0) {
      addToast("Debes agregar algun trabajador nuevo", { appearance: "info", autoDismiss: true });
      return false;
    }
    for (let i = 0; i < usersNew.length; i++) {
      if (usersNew[i].cargo === "") {
        addToast("Debes agregar elcargo a todos los usuarios asignados", { appearance: "info", autoDismiss: true });
        return false;
      }
    }

    return true;
  }

  const agregar = async () => {
    if (!validar()) return;

    const resp = await new ModeloMarketing().add_users_a_cuenta(usersNew,cuenta);
    if (resp.statusText === "Created") {
      addToast("Asignados correctamente", { appearance: "success", autoDismiss: true });
      restart();
    } else {
      addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
    }
  }

  return (
    <>
      {/* Intrucciones */}
      <br />
      <p className="h6">Selecciona los usuarios nuevos y asigna el cargo</p>
      <AsigUsuarios setUsuarios={(u) => setUsersNew([...u])} filter={usuarios} />
      {/* Boton para asignar */}
      <Row className="mt-2 p-0 mx-0">
        <div onClick={agregar} className="btn-h bg-h-success text-white ml-auto px-3 py-1"> <i className="fa fa-floppy-o"></i> Agregar</div>
        <div onClick={() => cancel()} className="btn-h bg-h-danger text-white ml-2 px-3 py-1"> <i className="fa fa-ban"></i> Cancelar</div>
      </Row>
    </>
  );
}

export default Asignar;