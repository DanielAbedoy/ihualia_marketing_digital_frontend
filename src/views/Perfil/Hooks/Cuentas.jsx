import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { SessionContext } from '../../../sessionContext';

const Cuentas = ({ setContext, history, cuentas }) => {

  const authContext = useContext(SessionContext);
  const [_cuentas, setCuentas] = useState([]);


  const usarCuenta = (cuenta) => {
    authContext.setCuenta({ id: cuenta.id, nombre: cuenta.nombre });
    setContext();
    history.push("/inicio")
  }

  useEffect(() => {
    if (cuentas.length === 0) return;
    let aux = [];
    cuentas.forEach(cuenta => {
      let c = JSON.parse(cuenta);
      let obj = JSON.parse(c.cuenta);
      aux.push({ id: obj.id, nombre: obj.nombre, estatus: obj.estatus, cargo: c.tipo });
    });
    setCuentas([...aux])

  }, [cuentas])

  return (
    <Row className="mt-4">
      <Col md="12">
        <p className="h4 mb-4"><b>Mis cuentas</b></p>

        <Row>

          {_cuentas.map((c,i) => {
            return (
              <Col key={i} md="6" xs="12" className="px-2 mb-4">
                <Row className="rounded shadow-h-hov-sm m-0">
                  <Col md="12" className="rounded border-left border-primary py-2 d-flex flex-column" >
                    <p className=""><b>Nombre: </b> {c.nombre} </p>
                    <p className="m-0"><b>Estatus: </b> {c.estatus} </p>
                    <p className="m-0"><b>Empleo: </b> {c.cargo} </p>
                    <div onClick={()=>usarCuenta(c)} className="ml-auto btn-h bg-h-info text-white py-1 px-3">
                      <b>Usar</b>
                    </div>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>

      </Col>
    </Row>
  );
}

export default Cuentas;