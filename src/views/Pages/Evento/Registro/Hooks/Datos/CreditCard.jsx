import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const CreditCard = ({ datosCard, handleInputFocus, setDatosCard, focus }) => {

  return (
    <Col xl="8" md="10" xs="12" className="mx-auto border-top mt-3" >
      <Row className="mt-3">

        <Col md="12"><p className="h4 "> Datos de la Trageta</p>
          <p className="description">No se almacenará ni se hará publica su información</p>
        </Col>

        <Col lg="5" xl="6" xs="12" className="p-2">
          <Cards
            placeholders={{ name: "TU NOMBRE AQUI" }}
            locale={{ valid: 'expicación' }}
            focused={focus}
            cvc={datosCard.cvc}
            expiry={datosCard.expiry}
            name={datosCard.name}
            number={datosCard.number}
          />
        </Col>
        <Col md="6" xs="12" className="ml-auto pt-2">
          <Row>
            <Col md="12" xs="12" className="m-2">
              <Input
                type="number"
                name="number"
                placeholder="Numero de la Targeta"
                onChange={e => setDatosCard({ ...datosCard, number: e.target.value })}
                onFocus={handleInputFocus}
              />
            </Col>
            <Col md="12" xs="12" className="m-2 ">
              <Input
                type="text"
                name="name"
                placeholder="Nombre del Propietario"
                onChange={e => setDatosCard({ ...datosCard, name: e.target.value })}
                onFocus={handleInputFocus}
              />
            </Col>
            <Col md="6" xs="6" className="mt-2">
              <Input
                className="ml-2"
                type="number"
                name="expiry"
                placeholder="Expiración"
                onChange={e => setDatosCard({ ...datosCard, expiry: e.target.value })}
                onFocus={handleInputFocus}
              />
            </Col>
            <Col md="6" xs="6" className="mt-2">
              <Input
                className="ml-2"
                type="number"
                name="cvc"
                placeholder="CVC"
                onChange={e => setDatosCard({ ...datosCard, cvc: e.target.value })}
                onFocus={handleInputFocus}
              />
            </Col>
          </Row>

        </Col>
      </Row>
    </Col>
  );
}

export default CreditCard;