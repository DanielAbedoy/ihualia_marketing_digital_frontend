import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => {

  return (
    <Row className="m-0 px-0 py-3 shadow" style={{ backgroundColor: "white" }}>
      <Col md="12" className="text-center">
        <footer>
          <span><a href="https://ihualia.com.mx">Ihualia</a> &copy; 2020 Ihualia Software, S.A. de C.V.</span><br />
          <span className="powered">Powered by <a href="https://ihualia.com.mx">Equipo Dual TESE Sistemas</a></span>
        </footer>
      </Col>
    </Row>
  );
}

export default Footer;