import React, { useState } from 'react';
import { Row } from 'reactstrap';

import { useToasts } from 'react-toast-notifications';
import ModeloMarketing from '../../../../../models/Marketing';
import AsigCuentas from '../../../Hooks/AsigCuentas';

const Asignar = ({cuentas ,usuario, cancel, restart }) => {

  const [cuentasNew, setCuentasNew] = useState([]);
  const { addToast } = useToasts();


  const validar = () => {
    if (cuentasNew.length === 0) {
      addToast("Debes agregar algun trabajador nuevo", { appearance: "info", autoDismiss: true });
      return false;
    }
    for (let i = 0; i < cuentasNew.length; i++) {
      if (cuentasNew[i].cargo === "") {
        addToast("Debes agregar elcargo a todos los usuarios asignados", { appearance: "info", autoDismiss: true });
        return false;
      }
    }

    return true;
  }

  const agregar = async () => {
    if (!validar()) return;

    const resp = await new ModeloMarketing().add_cuentas_a_user(usuario.id,cuentasNew);
    if (resp.statusText ==="Created") {
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
      <p className="h6">Selecciona las cuentas nuevas y asigna el cargo</p>
      <AsigCuentas setCuentas={(c) => setCuentasNew([...c])} filter={cuentas} />
      {/* Boton para asignar */}
      <Row className="mt-2 p-0 mx-0">
        <div onClick={agregar} className="btn-h bg-h-success text-white ml-auto px-3 py-1"> <i className="fa fa-floppy-o"></i> Agregar</div>
        <div onClick={() => cancel()} className="btn-h bg-h-danger text-white ml-2 px-3 py-1"> <i className="fa fa-ban"></i> Cancelar</div>
      </Row>
    </>
  );
}

export default Asignar;