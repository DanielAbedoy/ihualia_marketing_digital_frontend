import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, Input, Collapse } from 'reactstrap';
import Tabla from './Tabla';

const ModalComp = ({ open, setOpen, boletos, asistentes }) => {

  const [openTable, setOpenTable] = useState(false);
  const [datos, setDatos] = useState({});
  const [info, setInfo] = useState({ boletosAdq: "", boletosRest: "", ganancias: 0 });
  const [arrAsistentes, setAsistentes] = useState([]);
  const [boletosAdq, setBoletosAdq] = useState([]);

  const selectBoleto = boleto => {
    if (boleto === "Selecciona...") {
      setDatos({});
      return;
    }
    setDatos(boletos.find(b => b.id == boleto));
  }

  useEffect(() => {
    if (!asistentes) return;
    let arr = [];
    asistentes.forEach(a => {
      arr = [...arr, ...JSON.parse(a.boletos).data];
    });
    setBoletosAdq(arr);
  },[asistentes])

  useEffect(() => {
    if (!datos.id) return;
    getInfo();
  }, [datos])

  const getInfo = () => {
    const bolets = boletosAdq.filter(b => b.id == datos.id);
    let adqs = 0;
    let ganancia = 0;
    bolets.forEach(b => adqs += (b.cantidad * 1));
    if (datos.tipo === "pago") ganancia = adqs * (datos.precio * 1)
    else ganancia = "-"


    let asistentesA = [];
    asistentes.forEach(a => {
      const bs = JSON.parse(a.boletos).data;
      bs.forEach(b => { if (b.id == datos.id) asistentesA.push({ ...a, boletos_cantidad: b.cantidad }) })
    });
    setAsistentes(asistentesA)

    setInfo({ boletosAdq: adqs, boletosRest: ((datos.cantidad_total * 1) - adqs)+"", ganancias:ganancia });
  }

  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader toggle={() => setOpen(!open)}>
        <p className="m-0 h5"><b>Informacion de los boletos</b></p>
        <p className="m-0 text-muted h6"><b>Ve la información de tus boletos</b></p>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="9" xs="12" className="mx-auto py-3 d-flex flex-column justify-content-center" >

            <Row>
              <Col xs="12" md="7" className="mx-auto" >
                <p className="m-0 text-center">Seleciona el boleto</p>
                <Input width="50%" className="mx-auto" type="select"
                  onChange={e => selectBoleto(e.target.value)}
                >
                  <option >Selecciona...</option>
                  {boletos.map((boleto, i) => {
                    return <option key={i} value={boleto.id} >{boleto.nombre}</option>
                  })}
                </Input>
              </Col>
            </Row>
            <br />
          </Col>
          {/* 
                Nombre, Tiop, precio, cantidad descripcioncanal de ventas
              */}

          <Col md="12">
            {datos.id ?
              <Row>
                <Col md="9" xs="12" className="mx-auto mt-1 d-flex flex-column justify-content-center" >
                  <p className="text-center h6 m-0"><b>Nombre: </b>{datos.nombre}</p>
                  <p className="text-center h6 m-0"><b>Tipo de Boleto: </b>{datos.tipo.toUpperCase()}</p>
                  <p className="text-center h6 m-0"><b>Precio: </b>{datos.precio}</p>
                  <p className="text-center h6 m-0"><b>Cantidad de Boletos: </b> {datos.cantidad_total} boletos</p>
                  <p className="text-center h6 my-1"><b>Descripcion: </b><br /> {datos.descripcion}</p>
                  <p className="text-center h6 m-0"><b>Canal de Ventas: </b> {datos.canal_ventas}</p>

                  <p className="text-right h6 my-2 text-primary"><b><u onClick={() => setOpenTable(!openTable)} style={{ cursor: "pointer" }} >Ver tabla</u></b></p>
                </Col>

                <Col md="9" xs="12" className="mx-auto d-flex flex-column justify-content-center" >
                  <Row>
                    <Col md="12" className="mx-auto" >
                      <Row>
                        <Col md="12" className="mx-auto my-3" >
                          <Collapse isOpen={openTable} >
                            <Tabla
                              asistentes={asistentes}
                              arrAsistentes={arrAsistentes} precio={datos.precio || 0} />
                          </Collapse>
                        </Col>

                        <Col md="4" xs="12" className="px-4">
                          <Row className="shadow bg-events-light text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                            <p className="h1 m-0"><b><i className="fa fa-handshake-o"></i></b></p>
                            <p className="text-center"><span className="h1">{info.boletosAdq}</span> <br /> <span><b>Boletos Adquiridos</b></span> </p>
                          </Row>
                        </Col>

                        <Col md="4" xs="12" className="px-4">
                          <Row className="shadow bg-events-light text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                            <p className="h1 m-0"><b><i className="fa fa-percent"></i></b></p>
                            <p className="text-center"><span className="h1">{info.boletosRest}</span> <br /> <span><b>Boletos Restantes</b></span> </p>
                          </Row>
                        </Col>

                        <Col md="4" xs="12" className="px-4">
                          <Row className="shadow bg-events-light text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                            <p className="h1 m-0"><b><i className="fa fa-line-chart"></i></b></p>
                            <p className="text-center"><span className="h1">{typeof info.ganancias === "number" ? `$ ${info.ganancias}`:info.ganancias}</span> <br /> <span><b>Ganancias</b></span> </p>
                          </Row>
                        </Col>
                      </Row>
                    </Col>

                  </Row>
                </Col>

              </Row>
              : <></>}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}


export default ModalComp;