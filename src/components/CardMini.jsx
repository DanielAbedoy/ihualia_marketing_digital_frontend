import React from 'react';
import { Row, Col } from 'reactstrap';

const CardMini = ({ color, icon, title, subTitle }) => {

  return (
    <Col md="5" xs="10" className="m-2 mx-auto p-3"
      style={{ boxShadow: "0px 0px 25px -7px rgba(0,0,0,0.75)", backgroundColor:color || "#21c6f0c2" , borderRadius: "10px" }}>
      <Row className="text-white">
        <Col md="7" className="align-self-end"> <p className="h3">{title}</p><p className="text-center">{subTitle}</p> </Col>
        <Col md="5" className="align-self-end"><span className="display-4"><i className={`fa fa-${icon}`}></i></span></Col>
      </Row>
    </Col>

  );
}

export default CardMini;