import React from 'react';
import { Row, Col } from 'reactstrap';

const CardInfo = ({nombre, instrucciones}) => {
  
  return (
    <Row>
      <Col md="12" className="m-0 p-0 bg-primary rounded-top "><p></p></Col>
      <Col md="12" className="rounded shadow bg-white p-3">
        <p className="h3"><b>{nombre}</b></p>
        <p className="h6 text-muted"><b>{instrucciones}</b></p>
      </Col>
    </Row>
  );
}

export default CardInfo;