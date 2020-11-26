import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Collapse, Button, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import Autocomplete from './Autocomplete';
import Mapa from './Mapa';

import ModeloEvento from '../../../../../models/Eventos';

const Ubucacion = props => {

  const { addToast } = useToasts();
  const [creado, setCreado] = useState(false);
  const [open, setOpen] = useState(true);
  const [accion, darAccion] = useState('');
  const [datos, setDatos] = useState(
    { direccion1: "", direccion2: "", ciudad: "", estado: "", codigo_postal: "", pais: "", latitud: 0, longitud: 0 }
  );
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (props.evento.ubicacion === "" || props.evento.ubicacion === undefined) return;
    const ub = JSON.parse(props.evento.ubicacion);

    darAccion(ub.tipo);

    if(ub.tipo === "lugar"){
      setDatos({ ...datos, ...ub.data });
      setCreado(true);
    } else {
      setUrl(ub.data);
      setCreado(true);
    }
    
  },[props.evento])

  const setPlace = (campos) => {
    setDatos({ ...datos, ...campos });
  }

  const cambiarAccion = (accion) => {
    darAccion(accion);
  }

  const crear = async () => {
    
    if (accion === "lugar") {
      if (!validarLugar()) return;
      const resp = await new ModeloEvento().modificar_evento(props.evento.id, {ubicacion:JSON.stringify({tipo:accion, data:datos})})
      sendResponse(resp)
    }
    else if (accion === "online") {
      if (!validarOnline()) return;
      const resp = await new ModeloEvento().modificar_evento(props.evento.id, {ubicacion:JSON.stringify({tipo:accion, data:url})})
      sendResponse(resp)
    }
  }

  const validarLugar = () => {
    if (datos.direccion1 === "" || datos.ciudad === "" || datos.estado === "" || datos.codigo_postal === "" || datos.pais === "") {
      addToast("Debes agregar todos los campos requeridos", { appearance: "info", autoDismiss: true })
      return false;
    }
    return true

  }

  const validarOnline = () => {
    if (url === '') {
      addToast("Debes agregar el url", { appearance: "info", autoDismiss: true })
      return false;
    }
    return true;
  }

  const modificar = async () => {
    if (accion === "lugar") {
      if (!validarLugar()) return;

      const resp = await new ModeloEvento().modificar_evento(props.evento.id, {ubicacion:JSON.stringify({tipo:accion, data:datos})})
      sendResponse(resp)

    }
    else if (accion === "online") {
      if (!validarOnline()) return;

      const resp = await new ModeloEvento().modificar_evento(props.evento.id, {ubicacion:JSON.stringify({tipo:accion, data:url})})
      sendResponse(resp)
    }

  }

  const sendResponse = async (resp) => {
    if (resp.statusText === "OK") {
      addToast("Guardado con exito", { appearance: "success", autoDismiss: true });
      setCreado(true);
      setOpen(false)
      props.setEvento(resp.data);
    } else {
      addToast(`Error: ${resp}`, { appearance: "error", autoDismiss: true });
    }

  }

  return (
    <Col md="9" xs="12" className="mx-auto"><p className="h3 mb-4">
      <b><i className="fa fa-map"></i> Ubicaión</b>
      {creado ?
        <i
          className={`fa fa-${!open ? "chevron-down" : "chevron-up"} float-right p-1`}
          style={{ cursor: "pointer" }}
          onClick={e => setOpen(!open)}
        ></i> : <></>
      }
    </p>
      <Collapse isOpen={open} >
        <Row>
          <Col className="mx-auto" md="9" xs="12">
            <Row>
              <Col md="12">
                <Row className="mb-4">
                  <Col md="6" xs="12" className="mx-auto">
                    <CustomInput
                      checked={accion === "lugar" ? true : false}
                      onChange={() => cambiarAccion("lugar")} className="mx-auto"
                      id="place" type="radio" name="rb_accion" label="Lugar" />
                  </Col>
                  <Col md="6" xs="12" className="mx-auto">
                    <CustomInput checked={accion === "online" ? true : false}
                      onChange={() => cambiarAccion("online")} className="mx-auto"
                      id="online" type="radio" name="rb_accion" label="Evento en linea" />
                  </Col>
                </Row>

                {accion === "lugar" ?
                  <>
                    <Autocomplete setPalce={setPlace} />
                    <p className="text-center text-muted"><i>
                      Puedes buscar la ubicaión con ayuda del autocompletador de lugares de Google, o tambien puedes llenar los campos
                      manualmente. Si utilizas esta opcion se agregara el mapa geográfico de la zona al evento
                  </i></p>
                    <br />

                    <Row>
                      <Col md="12" xs="12" className="mx-auto">
                        <span className="h5">Direccion 1*</span>
                        <Input
                          value={datos.direccion1}
                          onChange={e => setDatos({ ...datos, direccion1: e.target.value })}
                          id="direccion-1" className="mt-2" type="text"
                        /><br />
                      </Col>
                      <Col md="12" xs="12" className="mx-auto">
                        <span className="h5">Direccion 2 (Op)</span>
                        <Input
                          value={datos.direccion2}
                          onChange={e => setDatos({ ...datos, direccion2: e.target.value })}
                          id="direccion-2" className="mt-2" type="text" placeholder="(campo opcional)"
                        /><br />
                      </Col>
                      <Col md="6" xs="12" className="mx-auto">
                        <span className="h5">Ciudad*</span>
                        <Input
                          value={datos.ciudad}
                          onChange={e => setDatos({ ...datos, ciudad: e.target.value })}
                          id="ciudad" className="mt-2" type="text"
                        /><br />
                      </Col>
                      <Col md="6" xs="12" className="mx-auto">
                        <span className="h5">Estado/Provincia*</span>
                        <Input
                          value={datos.estado}
                          onChange={e => setDatos({ ...datos, estado: e.target.value })}
                          id="estado" className="mt-2" type="text"
                        /><br />
                      </Col>
                      <Col md="6" xs="12" className="mx-auto">
                        <span className="h5">Código Postal*</span>
                        <Input
                          value={datos.codigo_postal}
                          onChange={e => setDatos({ ...datos, codigo_postal: e.target.value })}
                          id="codigo-postal" className="mt-2" type="text"
                        /><br />
                      </Col>
                      <Col md="6" xs="12" className="mx-auto">
                        <span className="h5">Pais*</span>
                        <Input
                          value={datos.pais}
                          onChange={e => setDatos({ ...datos, pais: e.target.value })}
                          id="pais" className="mt-2" type="text"
                        /><br />
                      </Col>
                    </Row>

                    {datos.longitud !== 0 && datos.latitud !== 0 ?
                      <Row>
                        <Col md="12">
                          <Mapa
                            lat={datos.latitud}
                            lng={datos.longitud}
                          />
                        </Col>
                      </Row>
                      : <></>
                    }

                  </>
                  :
                  accion === "online" ?
                    <Input type="url" id="link"
                      value={url}
                      onChange={e => { setUrl(e.target.value) }}
                      placeholder="Ingresa el URL del evento"
                    /> : <></>
                }
                {accion !== "" ?
                  <Row className="mt-4">
                    <Col md="4" xs="7">
                      <Button onClick={creado ? modificar : crear} color={creado ? "info" : "success"} block >{creado ? "Modificar" : "Continuar"}</Button>
                    </Col>
                  </Row>
                  : <></>

                }

              </Col>
            </Row>
          </Col>

        </Row>
      </Collapse>
      <Row><Col md="12" className="border border-light my-4"></Col></Row>
    </Col>
  );
}

export default Ubucacion;