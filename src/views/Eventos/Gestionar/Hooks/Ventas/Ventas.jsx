import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, ModalBody, Input, Collapse } from 'reactstrap';
import ModalComp from './Modal';
import Boletos from '../Boletos/Boletos';



const Ventas = ({ boletos, asistentes }) => {

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ boletos_total: 0, boletos_restante: 0, donacion: 0, monto_total: 0 });

  useEffect(() => {

    const bols_asistentes = asistentes.reduce((acc, el) => acc = [...acc, ...JSON.parse(el.boletos).data], []);
    const boletos_total = boletos.reduce((acc, b) => acc = (b.cantidad_total * 1) + acc , 0);
    const adquiridos = bols_asistentes.reduce((acc, b) => acc = (b.cantidad*1) + acc , 0);
    const money = asistentes.reduce((acc, el) => acc = {donacion: (el.donacion !== "" ? el.donacion *1 : 0) + acc.donacion, total:(el.monto_total !== "" ? el.monto_total *1 : 0) + acc.total }, {donacion:0, total:0});
    
    setInfo({ boletos_total: adquiridos, boletos_restante: (boletos_total - adquiridos), donacion: money.donacion, monto_total: money.total });
    
  },[Boletos, asistentes])

  return (
    <Row>
      <Col md="12">
        {/* TOTALBOLETOS ADQUIRIDOS, TOTAL BOLETOS RESTANTES, DINERO TOTAL, DONACIONES, ASISTENTES REGISTRADOS */}
        <Row>
          <Col md="4" xs="12" className="mx-auto py-2 px-4">
            <Row className="shadow rounded py-4 px-2  flex-column justify-content-center">
              <p className="text-right h4 m-0"><i className="fa fa-ticket"></i></p>
              <p className="text-center h1 m-0">{info.boletos_total}</p>
              <p className="text-center m-0" ><b>Total Boletos Adquiridos</b></p>
            </Row>
          </Col>

          <Col md="4" xs="12" className="mx-auto py-2 px-4">
            <Row className="shadow rounded py-4 px-2  flex-column justify-content-center">
              <p className="text-right h4 m-0"><i className="fa fa-minus"></i></p>
              <p className="text-center h1 m-0">{info.boletos_restante}</p>
              <p className="text-center m-0" ><b>Boletos Restantes</b></p>
            </Row>
          </Col>


          <Col md="4" xs="12" className="mx-auto py-2 px-4">
            <Row className="shadow rounded py-4 px-2  flex-column justify-content-center">
              <p className="text-right h4 m-0"><i className="fa fa-male"></i></p>
              <p className="text-center h1 m-0">{asistentes.length}</p>
              <p className="text-center m-0" ><b>Personas Registradas</b></p>
            </Row>
          </Col>

          <Col md="5" xs="12" className="mx-auto p-2">
            <Row className="shadow rounded py-4 px-2  flex-column justify-content-center">
              <p className="text-right h4 m-0"><i className="fa fa-bank"></i></p>
              <p className="text-center h1 m-0">{info.donacion}</p>
              <p className="text-center m-0" ><b>Donaciones</b></p>
            </Row>
          </Col>

          <Col md="5" xs="12" className="mx-auto p-2">
            <Row className="shadow rounded py-4 px-2  flex-column justify-content-center">
              <p className="text-right h4 m-0"><i className="fa fa-money"></i></p>
              <p className="text-center h1 m-0">{info.monto_total}</p>
              <p className="text-center m-0" ><b>Monto Total Recaudado</b></p>
            </Row>
          </Col>

        </Row>
      </Col>

      {/* <Col md="12" className="bg-events-light rounded d-flex flex-column justify-content-center align-items-center text-white text-center py-3 shadow-h-hov"
        style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}
      >
        <p className="display-4"><b><i className="cui-info"></i></b></p>
        <p className="h5"><b>Info. General</b></p>
      </Col>

      <ModalComp open={open} setOpen={setOpen} boletos={boletos} /> */}
    </Row>
  );
}

export default Ventas;