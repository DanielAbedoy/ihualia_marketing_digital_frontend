import React from 'react';
import { Row, Col, Input } from 'reactstrap';

const Personales = ({areDonaciones, add_donacion, setDatosPerson, datosPerson}) => {
  
  return (
    <Col xl="8" lg="10" md="12"  className=" mt-3 mx-auto">
        <Row>
          <Col md="12" xs="10" className="mx-auto">
            <p className="h6 m-0">Correo electronio</p>
          <Input className="mt-2 text-center h6" type="text"
            onChange={e => setDatosPerson({ ...datosPerson, correo: e.target.value })}
          />
          </Col>
          <Col xs="8" md="8" xs="10" className="mx-auto">
            <p className="h6 m-0">Nombre</p>
            <Input className="mt-2  text-center h6" type="text"
              onChange={e => setDatosPerson({ ...datosPerson, nombre: e.target.value })}
            />
          </Col>
          <Col md="4" xs="6" className="mx-auto">
            <p className="h6 m-0 ">Numero Telefonico</p>
            <Input className="mt-2 text-center h6" type="number"
              onChange={e => setDatosPerson({ ...datosPerson, telefono: e.target.value })}
            />
          </Col>

          {areDonaciones ?
            <Col xs="6" md="4" className="">
              <p className="h6 m-0 ">Cantidad a donar</p>
              <Input className="mt-2 text-center h6" type="number"
              onChange={add_donacion}
              />
            </Col>
            : <></>
          }

        </Row>
      </Col>
  );
}

export default Personales;