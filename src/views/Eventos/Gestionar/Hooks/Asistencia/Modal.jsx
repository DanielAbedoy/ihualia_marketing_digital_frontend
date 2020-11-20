import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Input, Collapse } from 'reactstrap';
import Tabla from './Tabla';

const ModalComp = ({ open, setOpen, boletos }) => {

  const [openTable, setOpenTable] = useState(true);

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
                <Input width="50%" className="mx-auto" type="select" >
                  <option > Un boleto</option>
                  <option > Un boleto</option>
                  <option > Un boleto</option>
                </Input>
              </Col>
            </Row>
            <br />
            {/* 
                Nombre, Tiop, precio, cantidad descripcioncanal de ventas
              */}

            <p className="text-center h6 m-0"><b>Nombre: </b>Algun nombre</p>
            <p className="text-center h6 m-0"><b>Tipo de Boleto: </b>PAGO</p>
            <p className="text-center h6 m-0"><b>Precio: </b></p>
            <p className="text-center h6 m-0"><b>Cantidad de Boletos: </b></p>
            <p className="text-center h6 m-0"><b>Descripcion: </b></p>
            <p className="text-center h6 m-0"><b>Canal de Ventas: </b></p>

            <p className="text-right h6 my-2 text-primary"><b><u onClick={() => setOpenTable(!openTable)} style={{ cursor: "pointer" }} >Ver tabla</u></b></p>

            {/* Card con
                Cantodad de adquiridos, cantidad restantes
              */}

          </Col>
          <Col md="9" xs="12" className="mx-auto d-flex flex-column justify-content-center" >
            <Row>
              <Col md="12" className="mx-auto" >
                <Row>
                  <Col md="12" className="mx-auto my-3" >
                    <Collapse isOpen={openTable} >
                      <Tabla />
                    </Collapse>
                  </Col>

                  <Col md="4" xs="12" className="px-4">
                    <Row className="shadow bg-h-warning text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                      <p className="h1 m-0"><b><i className="fa fa-handshake-o"></i></b></p>
                      <p className="text-center"><span className="h1">144</span> <br /> <span><b>Boletos Adquiridos</b></span> </p>
                    </Row>
                  </Col>

                  <Col md="4" xs="12" className="px-4">
                    <Row className="shadow bg-h-warning text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                      <p className="h1 m-0"><b><i className="fa fa-percent"></i></b></p>
                      <p className="text-center"><span className="h1">144</span> <br /> <span><b>Boletos Restantes</b></span> </p>
                    </Row>
                  </Col>

                  <Col md="4" xs="12" className="px-4">
                    <Row className="shadow bg-h-warning text-white d-flex flex-column rounded pt-1 pb-3 px-3">
                      <p className="h1 m-0"><b><i className="fa fa-line-chart"></i></b></p>
                      <p className="text-center"><span className="h1">144</span> <br /> <span><b>Ganancias</b></span> </p>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col md="3" xs="12" className="ml-auto my-4" >
                <div className="btn-h bg-h-danger text-white" onClick={()=>setOpen(!open)}><b>Salir</b></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}


export default ModalComp;