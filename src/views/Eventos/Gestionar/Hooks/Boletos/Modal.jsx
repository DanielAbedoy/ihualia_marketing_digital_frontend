import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalBody, Input, Collapse } from 'reactstrap';
import Tabla from './Tabla';

const ModalComp = ({ open, setOpen, boletos, asisitentes }) => {

  const [openTable, setOpenTable] = useState(false);
  const [datos, setDatos] = useState({});
  const [info, setInfo] = useState({ boletosAdq: "", boletosRest: "", ganancias: 0 });
  const [arrAsistentes, setAsistentes] = useState([]);

  const selectBoleto = boleto => {
    if (boleto === "Selecciona...") {
      setDatos({});
      return;
    }
    setDatos(boletos.find(b => b.id == boleto));
  }

  useEffect(() => {
    getInfo();
  },[datos])

  const getInfo = () => {
    if (!datos.adquiridos) return;
    let ganancia = 0;
    let boletosAdqu = 0;
    let asistenetes = [];
    datos.adquiridos.forEach(a => {
      let obj = JSON.parse(a);
      asistenetes.push(obj);
      boletosAdqu += obj.cantidad * 1;
      if (datos.tipo.toLowerCase() === "pago") ganancia += ((obj.cantidad * 1) * (datos.precio * 1));
    });

    let restante = (datos.cantida_total * 1) - (boletosAdqu * 1);
    setAsistentes(asistenetes);
    setInfo({ boletosAdq: boletosAdqu, boletosRest: restante, ganancias: ganancia });
  }

  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalBody>
        <Row>
          <Col md="9" xs="12" className="mx-auto py-3 d-flex flex-column justify-content-center" >

            <p className="m-0 h3"><b>Informacion de los boletos</b></p>
            <p className="m-0 text-muted"><b>Ve la información de tus boletos</b></p>

            <p className="border border-dark px-3 my-3 text-ceter"></p>
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
                <p className="text-center h6 m-0"><b>Cantidad de Boletos: </b> {datos.cantida_total} boletos</p>
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
                          <Tabla asistentes={asisitentes} arrAsistentes={arrAsistentes} precio={datos.precio || 0} />
                        </Collapse>
                      </Col>

                      <Col md="4" xs="12" className="px-4">
                        <Row className="shadow bg-h-warning text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                          <p className="h1 m-0"><b><i className="fa fa-handshake-o"></i></b></p>
                            <p className="text-center"><span className="h1">{info.boletosAdq}</span> <br /> <span><b>Boletos Adquiridos</b></span> </p>
                        </Row>
                      </Col>

                      <Col md="4" xs="12" className="px-4">
                        <Row className="shadow bg-h-warning text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                          <p className="h1 m-0"><b><i className="fa fa-percent"></i></b></p>
                            <p className="text-center"><span className="h1">{info.boletosRest}</span> <br /> <span><b>Boletos Restantes</b></span> </p>
                        </Row>
                      </Col>

                      <Col md="4" xs="12" className="px-4">
                        <Row className="shadow bg-h-warning text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                          <p className="h1 m-0"><b><i className="fa fa-line-chart"></i></b></p>
                            <p className="text-center"><span className="h1">${info.ganancias}</span> <br /> <span><b>Ganancias</b></span> </p>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                </Row>
              </Col>

            </Row>
              : <></>}
          </Col>
          <Col md="12">
            <Row>
              <Col md="3" xs="12" className="ml-auto my-4" >
                <div className="btn-h bg-h-danger text-white" onClick={() => { setOpen(!open); setDatos({})}}><b>Salir</b></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}


export default ModalComp;