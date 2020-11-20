import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

class SidePrincipal extends Component {



  render() {
    return (
      <Row id="side-prin" style={{ minHeight: "100%", backgroundColor: "rgba(237, 235, 230, 0.356)" }} className="shadow rounded" >
        <Col md="12" className="" >
          <Row>
            <Col md="12" className="text-center">
              <span className="h2">{this.props.titulo}</span>
            </Col>
            <Col md="12" className="mt-4" className="text-left">
              <hr />
              <p className="h6"><b>Organizador:</b> {this.props.organizador}</p><br />
              <p className="">{this.props.resumen}</p><br />
            </Col>           
          </Row>
        </Col>
      </Row>
    );
  }

}

export default SidePrincipal;