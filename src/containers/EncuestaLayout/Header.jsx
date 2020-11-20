import React from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => {
  
  return (
    <Row className="m-0 px-0 py-3 shadow" style={{backgroundColor:"white"}}>
      <Col md="3" xl="2" xs="6" className="ml-3">
        <img src={require('../../assets/img/brand/logo-no-fondo.png')} width="100%" alt="ihualia-logo"/>
      </Col>
    </Row>
  );
}

export default Header;