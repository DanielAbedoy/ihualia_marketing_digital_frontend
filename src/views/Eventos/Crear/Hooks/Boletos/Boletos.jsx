import React, { useState } from 'react';
import { Row, Col, Input, Collapse, Button, Card, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import ModeloEventos from '../../../../../models/Eventos';

import Crear from './Crear';

const Boletos = props => {

  const { addToast } = useToasts();
  const [accion, setAccion] = useState('crear');
  const [boletos, setBoletos] = useState([]);
  const [open, setOpen] = useState(true);
  const [creado, setCreado] = useState(false)

  const generarBoleto = (boleto) => {
    setBoletos([...boletos.slice(), boleto]);
    setAccion("listado")
  }

  const quitarBoleto = (boleto) => {
    const new_arr = boletos.filter(b => b.descripcion != boleto.descripcion)
    setBoletos(new_arr)
  }

  const format_corrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });


  const crear = async () => {
    const resp = await new ModeloEventos().add_boletos(props.evento.id, boletos);
    if (resp.statusText === "OK") {
      const r = await new ModeloEventos().modificar_evento(props.evento.id, { id_cuenta: props.evento.id_cuenta });
      props.setEvento(r.data)
      addToast("Guardado correctamente y listo para publicar", { appearance: "success", autoDismiss: true })
      setCreado(true);
      setOpen(false);
    } else addToast("Algo salio mal", { appearance: "error", autoDismiss: true })

  }

  return (
    <Col md="9" xs="12" className="mx-auto">
      <p className="h3 mb-4"><b> <i className="fa fa-ticket"></i>Boletos</b>
        {creado ?
          <i
            className={`fa fa-${!open ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => setOpen(!open)}
          ></i> : <></>
        }
      </p>
      <Collapse isOpen={open}>
        <Row>
          <Col md="9" xs="12" className="mx-auto">
            {/* Listado */}
            {accion === "listado" ?
              <Row>
                <Col md="12">
                  {boletos.length === 0 ?
                    <><p className="text-center h5 mb4"><b>Debes crear un boleto como mínimo</b></p>
                      <Row><Col md="5" xs="12" className="mx-auto"> <Button color="primary" className="mx-auto" block onClick={() => setAccion("crear")} >Crear uno ahora</Button></Col></Row></>
                    :
                    <>
                      <Row>
                        <Col md="12">
                          <p className="text-right">
                            <span
                              style={{ cursor: "pointer" }} onClick={() => setAccion("crear")}
                            ><b><u> Crear boleto</u></b></span>
                          </p>
                        </Col>

                        {/* Lista aqui debajo */}
                        <Col md="12">
                          <Row>
                            {boletos.map((boleto, i) => {
                              return (
                                <Col key={i} md="6" xs="12" className="p-1 mx-auto" >
                                  <Card className="shadow">
                                    <CardHeader className={`text-white py-3 ${boleto.tipo === "gratis" ? "bg-success" : boleto.tipo === "donacion" ? "bg-danger" : "bg-primary"}`}>
                                      <p className="text-right m-0"><b>
                                        <span onClick={() => quitarBoleto(boleto)} style={{ cursor: "pointer" }} className="rounded-circle px-2 bg-danger">X</span></b></p>
                                      <p className="text-center h3"><b>{format_corrency.format(boleto.precio)}</b></p>
                                      <p className="text-center text-white m-0"><b>{boleto.nombre}</b></p>
                                    </CardHeader>

                                    <CardBody className="p-3">
                                      <p className="h5 text-center my-3">{boleto.descripcion}</p>
                                      <p>- Cantidad total: {boleto.cantidad_total}</p>
                                      <p>- Cantidad minima: {boleto.cantidad_minima}</p>
                                      <p>- Cantidad máxima: {boleto.cantidad_maxima}</p>
                                    </CardBody>
                                    <CardFooter className={`text-white ${boleto.tipo === "gratis" ? "bg-success" : boleto.tipo === "donacion" ? "bg-danger" : "bg-primary"}`}>
                                      <p className="m-0"><b>Boleto de tipo: {boleto.tipo}</b></p>
                                    </CardFooter>
                                  </Card>
                                </Col>
                              );
                            })}
                          </Row>
                        </Col>
                        <Col md="4" className="my-4">
                          <Button color={creado ? "info" : "success"} block onClick={crear} >{creado ? "Cambiar Boletos" : "Agregar Boletos"}</Button>
                        </Col>
                      </Row>
                    </>}
                </Col>
              </Row>
              :
              <Crear
                setBoleto={generarBoleto}
                setAccion={(dato) => setAccion(dato)}
              />
            }
          </Col>
        </Row>
      </Collapse>
      <Row><Col md="12" className="border border-light my-4"></Col></Row>
    </Col>
  );
}

export default Boletos;