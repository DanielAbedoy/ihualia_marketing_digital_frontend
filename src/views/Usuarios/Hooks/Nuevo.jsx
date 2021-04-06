import React, { useState } from 'react';
import { Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import user_images from '../../../components/UserImages';
import ModelMarketing from '../../../models/Marketing'

import Asignacion from './AsigCuentas';

const Nuevo = ({ close, cliente }) => {

  const [datos, setDatos] = useState({nombre:"", usuario:"", correo:"", password:"", imagen:""});
  const [cuentas, setCuentas] = useState([]);
  const { addToast } = useToasts();

  const validar = () => {
    if (datos.nombre === "" || datos.usuario === "" || datos.correo === "" || datos.password === "" || datos.imagen === "") {
      addToast("Debes agrear toda la información", { appearance: "info", autoDismiss: true });
      return false;
    }

    if (cuentas.length !== 0) {
      for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].cargo === "") {
          addToast("Debes agrear el cargo a todas las cuentas asignadas", { appearance: "info", autoDismiss: true });
          return false;
        }
      }
    }
    return true;
  }

  const crear = async () => {
    if (!validar()) return;

    const resp = await new ModelMarketing().add_new_user({...datos, cliente: cliente}, cuentas);
    if (resp.data.message) {
      addToast("Creado correctamente", { appearance: "success", autoDismiss: true });
      close();
    } else {
      addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
    }
  }

  return (
    <Row>
      <Col md="12">
        <Row className="mb-3">
          <div onClick={crear} className="ml-auto btn-h bg-h-success px-3 py-1 text-white">
            <i className="fa fa-floppy-o"></i> <b>Crear</b>
          </div>
          <div onClick={() => close()} className="ml-2 btn-h bg-h-primary px-3 py-1 text-white">
            <i className="fa fa-ban"></i> <b>Cancelar</b>
          </div>
        </Row>

        <Row>
          <Col md="9" xs="12" className="mb-3 mx-auto">

            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}>
                  <i className="fa fa-id-card-o"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Nombre personal" autoComplete="nombre"
                value={datos.nombre}
                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
              <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Nombre de usuario" autoComplete="username"
                value={datos.usuario}
                onChange={(e) => setDatos({ ...datos, usuario: e.target.value })}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
              <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}>
                  @</InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Correo electrónico" autoComplete="email"
                value={datos.correo}
                onChange={(e) => setDatos({ ...datos, correo: e.target.value })}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
              <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" placeholder="Contraseña" autoComplete="new-password"
                value={datos.password}
                onChange={(e) => setDatos({ ...datos, password: e.target.value })}
              />
            </InputGroup>
           
            <hr />
            <p className="text-muted">Imagen de usuario</p>
            <Row>
              {user_images.map((imagen, indx) => {
                return (
                  <Col key={indx} lg="3" md="3" sm="4" xs="4" >
                    <img id={imagen.nombre} alt={imagen.nombre} src={imagen.direccion}
                      className={`m-1 cursor-p ${datos.imagen === imagen.nombre ? "border border-success": ""}`}
                      onClick={() => setDatos({ ...datos, imagen: imagen.nombre })}
                    />
                  </Col>
                );
              })}
            </Row>

          </Col>

          <Col md="12" className="mt-3">
            <p className="h6"><b>Asigna las cuentas y su cargo (Opcional)</b></p>

            <Asignacion setCuentas={(cs) => setCuentas([...cs])}/>
          </Col>

        </Row>

      </Col>

    </Row>
  );
}

export default Nuevo;