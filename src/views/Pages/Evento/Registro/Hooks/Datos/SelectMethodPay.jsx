import React from 'react';
import { Col, Row, CustomInput } from 'reactstrap';

const SelectMethodPay = ({ setPayMethod }) => {

  return (<>
    <Col xl="8" lg="10" md="12" className="border-bottom mt-2 ml-auto mr-auto">
      <p className="h4 m-0"><span className="h3"></span> Selecciona el metodo de Pago</p>
    </Col>
    <Col md="12" >
      <Row className="text-center mt-3">
        <Col md="6" xs="6">
          <CustomInput id="CustomRadio" type="radio" name="customRadio"
            onClick={e => setPayMethod("card")} />
        </Col>
        <Col md="6" xs="6">
          <CustomInput id="CustomRadio2" type="radio" name="customRadio"
            onClick={e => setPayMethod("oxxo")} />
        </Col>

        <Col md="6" xs="6">
          <img width="50%" src={require('../../../../../../assets/img/fondos/credit-cards.png')} alt="credit-cards" />
        </Col>
        <Col md="6" xs="6">
          <img width="50%" src={require('../../../../../../assets/img/fondos/oxxo-pay.png')} alt="oxxo-pay" />
        </Col>
      </Row>
    </Col></>
  );
}

export default SelectMethodPay;